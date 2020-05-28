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
	                        <div class='card-content'>
					<img src="src/PubChem/img2D/`+TOXDB[i].CID+`.png"></img>
				</div>
	                        <div  class='card-footer'> 
					<h2>`+SUMMARY_DB[j].MolecularFormula+`</h2>
	                        	<span> `+SUMMARY_DB[j].CanonicalSMILES+`</span>
				</div>
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
        


	toolbar_y=$(".toolbar").position().top;
        
                                                                                        
        $(window).on("scroll", function() {
            var position = $(window).scrollTop()
            console.log(position);
                 if (position > toolbar_y  ) { $(".fixed-button.scroll-up").show();$(".specimen_page_nav").show(); }
            else if (position < toolbar_y  ){ $(".fixed-button.scroll-up").hide();$(".specimen_page_nav").hide()}
            else{setBlack();}
        });
})

function scrollUp(position){
	$('body,html').animate({
	                scrollTop: position
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

//Restart

function restart(){
	$(".specimen_page").empty();
	$(".grid-container").show();
	$(".toolbar").show();
	
}



//IR A UN COMPUESTO EN PARTICULAR:
function verCompuesto(index){
        tox=TOXDB[index];
        console.log(tox.CAS);
        console.log(tox.name);
        console.log(tox.CID);
	
	$("body").scrollTop(0);
        $(".toolbar").hide();
        $(".grid-container").hide();

		//Header
               header=`<div class="specimen_header">
                         <h3 class="specimen-header_titulo">`+tox.name+`</h3>
                         <h4 class="specimen-header_subtitulo">CAS: `+tox.CAS+`</h4>
                       </div>`
		
		$(".specimen_page").append(header);
                //PubChem Summary:
                        try{
                        summary=SUMMARY_DB.find(x => x.CID === tox.CID);
                        Summary= `
                        <section class='specimen_data'><h1> Resumen </h1>
                               <div class='resumen'>
				<table>
                                <tbody>
                                <tr><th> Nombre IUPAC:          </th><td><i>`+ summary.IUPACName        +`</i></td></tr>
                                <tr><th> Fórmula Molecular:     </th><td><a href="#">`+ summary.MolecularFormula        +`</a></td></tr>
                                <tr><th> SMILE canónico:        </th><td><a href="#">`+ summary.CanonicalSMILES +`</a></td></tr>
                                <tr><th> Estructura:            </th><td><img src='src/PubChem/img2D/`+tox.CID+`.png'></img>
                                                                         <img src='src/PubChem/img3D/`+tox.CID+`.png'></img></td></tr>
                                <tr><th> Peso Molecular:        </th><td>`+ summary.MolecularWeight             +`</td></tr>
                                <tr><th> XLogP:                 </th><td>`+ summary.XLogP               +`</td></tr>
                                <tr><th> CID:                   </th><td>`+ tox.CID                     +`</td></tr>
                                <tr><th> CAS:                   </th><td>`+ tox.CAS                     +`</td></tr>
                                </tbody>
                                </table> 
                        	</div>    
			</section>`;
                        $(".specimen_page").append(Summary);
                        }catch(error){console.error(error);}



                     //TOXICO Y FISQUIM.
                        try{
                                FisQui=`<section class='specimen_data'><h1>Físico-Química</h1>
                                <ul>`;                                                                                                       
                                for (j=0;j< tox.PhysProps.length;j++){
                                        FisQui+='<li><b>'+tox.PhysProps[j].p +'</b> <i>('+tox.PhysProps[j].u+'):</i>';
                                        FisQui+='<span>'+tox.PhysProps[j].d +'</span></li>';                                                                   
                                }
				FisQui+=`</ul></section>`
			$(".specimen_page").append(FisQui);
                        }catch(error){console.error(error);}

                        try{
                                Toxico=`<section class='specimen_data'><h1>Toxicología</h1>
                                <table>`;
                                for (j=0;j< tox.ToxProps.length;j++){
                                        Toxico+='<tr><th><b>'+tox.ToxProps[j].t +'</b></th>';	//parametro
                                        Toxico+='<th>('+tox.ToxProps[j].o +')</th>';  		//organismo 
                                        Toxico+='<th>'+tox.ToxProps[j].r +'</th>';	  	//vía
                                        Toxico+='    <td>'+tox.ToxProps[j].d.r +'<i>('+tox.ToxProps[j].d.u+')</i><td>';
                                        Toxico+='<td><i>'+tox.ToxProps[j].j.t +'</i></td></tr>';
                                }                                                                       
                        Toxico+=`</table>
                                </section>`;
                                                                                                                  
                        $(".specimen_page").append(Toxico);
                        }catch(error){console.error(error);}
 
               //SEGURIDAD QUIMICA:
                        try{
                        ChemSafety=`<section class='specimen_data'> <h1>Seguridad Química</h1>
					<table><tr><th> Seguridad Química</th><td>`;
                                for (j=0;j< tox.GHS.length;j++){
                                        ChemSafety+=`<figure><img src='src/PubChem/imgGHS/`+tox.GHS[j]+`.svg' />`;      
                                        ChemSafety+=`<figcaption>`+tox.GHS[j]+`</figcaption></figure>`; 
                                }                                                                       
                        ChemSafety+='</td></tr></table></section>';                                                 
                
                
                        $(".specimen_page").append(ChemSafety);
                        }catch(error){console.error(error);}
                //NFPA
                        NFPA=`<section class='specimen_data'> <h1>NFPA 704</h1><table><tr><th> NFPA 704</th><td>
                                <figure><img src='src/PubChem/imgNFPA/`+tox.NFPA+`.svg' />      
                                <figcaption>`+tox.NFPA+`</figcaption></figure>; 
                                </td></tr></table></section>`;                                              

                        $(".specimen_page").append(NFPA);


	
		//navbar
		navbar=`<nav class="specimen_page_nav">
		        <div class="specimen_page_nav_header"><h3>`+tox.name+`</h3></div>
		        <ul>`
			secciones=$(".specimen_page h1")
		        for (j=0;j< secciones.length;j++){
		        	navbar+='<li onclick="scrollUp('+secciones.position().top+')"><button>'+secciones[j].innerHTML+'</button> </li>'
			}
		        navbar+=`</ul>
			</nav>`
		                                                                               
		$(".specimen_page").append(navbar);



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



//COSAS QUE PASAN CUANDO SCROLEAS

	
	
	

        
        
        
        
        
        
        

