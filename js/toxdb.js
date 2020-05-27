$(document).ready(function(){
	const $btn_menu=$('#botonMenu');
	const $logo=$(".LogoGauss");
	const $menu=$('.sidebar');
	

	
	
	
        


	    $('.botonMenu').click(function() {
			console.log("yo pase por acá");
	            //$('.sidebar').slideToggle("fast");
	    $(".sidebar").animate({width:'toggle'},400);
		});


	//Buscador/Filtro:
  	$(".search_input").on("keyup", function() {
  	  var value = $(this).val().toLowerCase();
  	  $(".grid-cards li").filter(function() {
  	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  	  });

	
		//mostrar compuestos
		n=TOXDB.length-$(".grid-card").filter(":hidden").length;
		
		$(".counter-total").empty();	$(".counter-total").append(TOXDB.length)
		$(".counter-show").empty(); 	$(".counter-show").append(n)
	});


	//ARMADO DE CARTAS DE COMPUESTOS:
	var item_content=" ";
	for (i=0;i< TOXDB.length;i++){
	        try{
		j=SUMMARY_DB.findIndex(x => x.CID === TOXDB[i].CID);
	        item_content+=`
	        <li class='grid-card'><a onclick="verCompuesto('`+i+`')">
	                <section>
	                <div class='card-header'>
	                        <h1 class='card-titulo'>`+TOXDB[i].name+`</h1>
	                        <h2 class='card-subtitulo'> CAS:`+TOXDB[i].CAS+`</h2>
	                        <img src="src/PubChem/img2D/`+TOXDB[i].CID+`.png"></img>
	                        <h2  class='card-footer'> `+SUMMARY_DB[j].MolecularFormula+`</h2>
	                        <span class='card-subtitulo'> `+SUMMARY_DB[j].CanonicalSMILES+`</span>
	                </div
	                <div class='card-content'>
	
	                </div>
	                </section>
	         </a></li>`;
	        }catch(error){console.error(error);}
	};
	$(".grid-cards").append(item_content);

	//Contador de tarjetitas en grilla
	$(".counter-total").append(TOXDB.length)
	$(".counter-show").append(TOXDB.length)
        
})

function scrollUp(){
	$('body,html').animate({
	                scrollTop: 0
	                }, 500);
}





//Vista de tarjetitas en grilla o lista:
function vista(view){
	if (view=='lista'){
		$(".grid-cards").removeClass("grid_view");
		$(".grid-cards").addClass("list_view");
	}
	else{
		$(".grid-cards").removeClass("list_view");
		$(".grid-cards").addClass("grid_view");
	};
}

//IR A UN COMPUESTO EN PARTICULAR:
function verCompuesto(index){
        tox=TOXDB[index];
        console.log(tox.CAS);
        console.log(tox.name);
        console.log(tox.CID);

        //
        $(".grid-container").hide();

	$(".specimen-header_titulo").append(tox.name)
	$(".specimen-header_subtitulo").append("CAS: "+tox.CAS)
        //try{
        //item_content+=`
        //<li class='grid-item'><a onclick="verCompuesto('`+TOXDB[i].CAS+`')">
        //      <section>
        //      <div class='card-header'>
        //              <h1 class='card-titulo'>`+TOXDB[i].name+`</h1>
        //              <h2 class='card-subtitulo'> CAS:`+TOXDB[i].CAS+`</h2>
        //      </div>
        //      <div class='card-content'>
        //
        //      </div>
        //      </section>
        // </a></li>`;
        //}catch(error){console.error(error);}

//$(".specimen-page").append(item_content);

};
