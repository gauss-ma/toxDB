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
		$("body").scrollTop(0);
		
		//filtrar:
  	  	var value = $(this).val().toLowerCase();
  	  	$(".grid-cards li").filter(function() {
  	  	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  	  	});

		//mostrar numero de compuestos
		n=$("li.grid-card").length-$("li.grid-card").filter(":hidden").length;
		$(".counter-show").empty();  $(".counter-show").append(n)
		$(".counter-total").empty(); $(".counter-total").append(TOXDB.length)
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
	$(".counter-total").append($(".grid-card").length)
	$(".counter-show").append($(".grid-card").length)
        



	//FUNCIONES DE SCROLL:
	toolbar_y=$(".toolbar").position().top;
        
                                                                                        
        $(window).on("scroll", function() {
            var position = $(window).scrollTop()
            console.log(position);
                 if (position > toolbar_y  ) { $(".fixed-button.scroll-up").show();$(".specimen_page_nav").show(); $(".toolbar").addClass("top-fixed");}
            else if (position < toolbar_y  ){ $(".fixed-button.scroll-up").hide();$(".specimen_page_nav").hide();$(".toolbar").removeClass("top-fixed");}
            else{setBlack();}
       

		secciones.each(function(i) {
			sec_pos=$(this).position().top
			id=$(this)[0].id
                    if ( sec_pos < position ) {
			$(".specimen_page_nav_li").removeClass("activo")
			$("li[name="+id+"]").addClass("activo");}
                });

	 });


})










function scrollUp(position){
	$('body').animate({
	                scrollTop: position
	                }, 500);
}


//Vista de tarjetitas en grilla o lista:
function vista(view){
	if (view=='lista'){
		$(".grid-cards").removeClass("grid_view");
		$(".grid-cards").addClass("list_view");
		$(".card-content").slideUp();
		$(".card-footer").slideUp();
	}
	else{
		$(".grid-cards").removeClass("list_view");
		$(".grid-cards").addClass("grid_view");
		$(".card-content").slideDown(300);
		$(".card-footer").slideDown(500);
		
		
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
                        <section class='specimen_data' id='resumen'><h1> Resumen </h1>
                               <div class='resumen'>
				<table>
                                <tbody>
                                <tr><td> Nombre IUPAC:          </td><td><i>`+ summary.IUPACName        +`</i></td></tr>
                                <tr><td> Fórmula Molecular:     </td><td><a href="#">`+ summary.MolecularFormula        +`</a></td></tr>
                                <tr><td> SMILE canónico:        </td><td><a href="#">`+ summary.CanonicalSMILES +`</a></td></tr>
                                <tr><td> Estructura:            </td><td><img src='src/PubChem/img2D/`+tox.CID+`.png'></img>
                                                                         <img src='src/PubChem/img3D/`+tox.CID+`.png'></img></td></tr>
                                <tr><td> Peso Molecular:        </td><td>`+ summary.MolecularWeight             +`</td></tr>
                                <tr><td> XLogP:                 </td><td>`+ summary.XLogP               +`</td></tr>
                                <tr><td> CID:                   </td><td>`+ tox.CID                     +`</td></tr>
                                <tr><td> CAS:                   </td><td>`+ tox.CAS                     +`</td></tr>
                                </tbody>
                                </table> 
                        	</div>    
			</section>`;
                        $(".specimen_page").append(Summary);
                        }catch(error){console.error(error);}



                     //TOXICO Y FISQUIM.
                        try{
                                FisQui=`<section class='specimen_data' id='fisicoquimica'><h1>Físico-Química</h1>
                                <ul>`;                                                                                                       
                                for (j=0;j< tox.PhysProps.length;j++){
                                        FisQui+='<li><span><h3>'+tox.PhysProps[j].p +'</h3><i>('+tox.PhysProps[j].u+'):</i></span>';
                                        FisQui+='<p>'+tox.PhysProps[j].d +'</p><a class="referencia"> + Referencia <span>ChemIDPlus y tu vieja con todo lo que seme ocurra escribir aca. Gracias.</span></a></li>';                                                                   
                                }
				FisQui+=`</ul></section>`
			$(".specimen_page").append(FisQui);
                        }catch(error){console.error(error);}

                        try{
                                Toxico=`<section class='specimen_data' id='toxicologia'><h1>Toxicología</h1>
                                <table>`;
                                for (j=0;j< tox.ToxProps.length;j++){
                                        Toxico+='<tr><th><h4>'+tox.ToxProps[j].t +'</h4></th>';	//parametro
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
                        ChemSafety=`<section class='specimen_data' id='seguridad'> <h1>Seguridad Química</h1>
					<table><tr><th> Seguridad Química</th><td>`;
                                for (j=0;j< tox.GHS.length;j++){
                                        ChemSafety+=`<figure><img src='src/PubChem/imgGHS/`+tox.GHS[j]+`.svg' />`;      
                                        ChemSafety+=`<figcaption>`+tox.GHS[j]+`</figcaption></figure>`; 
                                }                                                                       
                        ChemSafety+='</td></tr></table></section>';                                                 
                
                
                        $(".specimen_page").append(ChemSafety);
                        }catch(error){console.error(error);}
                //NFPA
                        NFPA=`<section class='specimen_data' id='NFPA'> <h1>NFPA 704</h1><table><tr><th> NFPA 704</th><td>
                                <figure><img src='src/PubChem/imgNFPA/`+tox.NFPA+`.svg' />      
                                <figcaption>`+tox.NFPA+`</figcaption></figure>; 
                                </td></tr></table></section>`;                                              

                        $(".specimen_page").append(NFPA);


	
		//navbar
		navbar=`<nav class="specimen_page_nav">
		        <div class="specimen_page_nav_header"><h3>`+tox.name+`</h3></div>
		        <ul>`
			secciones=$(".specimen_data")
			//secciones_h1=$(".specimen_page h1")
			secciones.each(function(i) {
                        	sec_pos=$(this).position().top-80;
                        	id=$(this)[0].id;
				text=$(this).children("h1")[0].innerHTML;
		        //for (j=0;j< secciones.length;j++){
		        	navbar+='<li class="specimen_page_nav_li" "onclick="scrollUp('+sec_pos+')" name="'+id+'"><button>'+text+'</button> </li>'
			});
		        navbar+=`</ul>
			</nav>`
		                                                                               
		$(".specimen_page").append(navbar);

};




	
	
	

        
        
        
        
        
        
 //Ripple























