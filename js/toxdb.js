$(document).ready(function(){
	const $menu=$('#Sidebar');
	const $btn_menu=$('#botonMenu');
	const $logo=$(".LogoGauss");


	//Buscador/Filtro:
  	$(".search_input").on("keyup", function() {
  	  var value = $(this).val().toLowerCase();
  	  $(".grid-cards li").filter(function() {
  	    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  	  });
  	});


	//ARMADO DE CARTAS DE COMPUESTOS:
	var item_content=" ";
	for (i=0;i< TOXDB.length;i++){
	        try{
	        item_content+=`
	        <li class='grid-card'><a onclick="verCompuesto('`+i+`')">
	                <section>
	                <div class='card-header'>
	                        <h1 class='card-titulo'>`+TOXDB[i].name+`</h1>
	                        <h2 class='card-subtitulo'> CAS:`+TOXDB[i].CAS+`</h2>
	                </div>
	                <div class='card-content'>
	
	                </div>
	                </section>
	         </a></li>`;
	        }catch(error){console.error(error);}
	};
	$(".grid-cards").append(item_content);
})


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
