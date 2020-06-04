$(document).ready(function(){

	const $btn_menu=$('#botonMenu');
	const $logo=$(".LogoGauss");
	const $menu=$('.sidebar');
	
	//MENU DESPLEGABLE:
	//$('.botonMenu').click(function() {
	//            //$('.sidebar').slideToggle("fast");
	//    	$(".sidebar").animate({width:'toggle'},400);
	//});
	//BUSCADOR / FILTRO
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


	//FUNCIONES DE SCROLL:
	toolbar_y=$(".search_toolbar").position().top;
                                                                                        
        $(window).on("scroll", function() {
            var position = $(window).scrollTop();

            console.log(position);


                 if (position > toolbar_y  ) { $(".fixed-button.scroll-up").show();$(".specimen_page_nav").show(); $(".search_toolbar").addClass("top_fixed-search_toolbar");}
            else if (position < toolbar_y  ){ $(".fixed-button.scroll-up").hide();$(".specimen_page_nav").hide();$(".search_toolbar").removeClass("top_fixed-search_toolbar");}
            else{setBlack();}
       
		//scroll a secciones de specimen_page
		$(".specimen_data").each(function(i) {
			sec_pos=$(this).position().top
			id=$(this)[0].id
                    	if ( sec_pos < position ) {
			$(".specimen_page_nav_li").removeClass("activo")
			$("li[name="+id+"]").addClass("activo");}
                });

	 });

	//ARMADO DE CARTAS DE COMPUESTOS:
	var item_content=" ";
	for (i=0;i < TOXDB.length;i++){
	        try{
		j=SUMMARY_DB.findIndex(x => x.CID === TOXDB[i].CID);
	        item_content+=`
	        <li class='grid-card'><a onclick="verCompuesto('`+i+`')">
	                <section>
	                	<div class='card-header'>
	                	        <h1 class='card-titulo'>`+TOXDB[i].nombre+`</h1>
	                	        <h2 class='card-subtitulo'> CAS:`+TOXDB[i].CAS+`</h2>
				</div>
	                        <div class='card-content'>
					<img src="src/PubChem/img2DHD/`+TOXDB[i].CID+`.png"></img>
				</div>
	                        <div  class='card-footer'> 
					<h2>`+SUMMARY_DB[j].MolecularFormula+`</h2>
	                        	<!--span> `+SUMMARY_DB[j].CanonicalSMILES+`</span -->
				</div>
	                </section>
	         </a></li>`;
	        }catch(error){console.error(error);continue;}
	};
	$(".grid-cards").append(item_content);
	                                                                                         
	//Contador de tarjetitas en grilla
	$(".counter-total").append($(".grid-card").length)
	$(".counter-show").append($(".grid-card").length)


	
	

});


function scrollUp(position){$('body').animate({ scrollTop: position }, 500);}


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



//Mostrar Referencia:
function mostrarReferencia(Ref){
 	cita=Ref.closest('tr').next('tr');
	if ( cita.hasClass("active")) { Ref.removeClass("active");cita.removeClass("active");}
	else {Ref.addClass("active");cita.addClass("active");}

};



//Restart

function restart(){
	$(".specimen_page").empty();
	$(".grid-container").show();
	$(".search_toolbar").show();
	$(".vista_toolbar").show();
	
}



//ARMAR ARTICULO DE UN COMPUESTO EN PARTICULAR:
function verCompuesto(index){
        tox=TOXDB[index];
        console.log(tox.CAS);
        console.log(tox.nombre);
        console.log(tox.CID);
	
	$("body").scrollTop(0);
        $(".search_toolbar").hide();
        $(".vista_toolbar").hide();
        $(".grid-container").hide();

		//Header
               header=`<div class="specimen_header">
                         <h3 class="specimen-header_titulo">`+tox.nombre+`</h3>
                         <h4 class="specimen-header_subtitulo">CAS: `+tox.CAS+`</h4>
                       </div>`
		
		$(".specimen_page").append(header);
                //PubChem Summary:
                        try{
                        summary=SUMMARY_DB.find(x => x.CID === tox.CID);
                        Summary= `
                        <section class='specimen_data' id='resumen'><h1> Resumen </h1>
				<div class="about-half"> `+tox.descripcion+`</div>
                               <div class='resumen'>
				<table>
                                <tbody>
                                <tr><td> Nombre IUPAC:          </td><td><i>`+ summary.IUPACName    +`</i></td></tr>
                                <tr><td> Fórmula Molecular:     </td><td>`+ summary.MolecularFormula+`</td></tr>
                                <tr><td> SMILE canónico:        </td><td>`+ summary.CanonicalSMILES +`</td></tr>
                                <tr><td> Estructura:            </td><td><img src='src/PubChem/img2D/`+tox.CID+`.png'></img>
                                                                         <img src='src/PubChem/img3D/`+tox.CID+`.png'></img></td></tr>
                                <tr><td> Peso Molecular:        </td><td>`+ summary.MolecularWeight             +`</td></tr>
                                <tr><td> XLogP:                 </td><td>`+ summary.XLogP               +`</td></tr>
                                <tr><td> Carga Neta             </td><td>`+ summary.Charge               +`</td></tr>
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
                                <table>`;                                                                                                       
                                for (j=0;j< tox.PhysProps.length;j++){
                                        FisQui+='<tr><td class="specimen_data_name"><h3>'+tox.PhysProps[j].p +':</h3><i>('+tox.PhysProps[j].u+')</i></td>';
                                        FisQui+=`<td class="specimen_data_value">`+tox.PhysProps[j].d +`</td>`
					FisQui+=`<td class="specimen_data_referencia"  onclick="mostrarReferencia( $( this ) )"><span></span> <i class="fas fa-book"></i></td></tr><tr class="cita"><td> ChemIDPlus.</td></tr>`; 
                                }
				FisQui+=`</table></section>`
			$(".specimen_page").append(FisQui);
                        }catch(error){console.error(error);}

                        try{
                                Toxico=`<section class='specimen_data' id='toxicologia'><h1>Toxicología</h1>
                                <table><tbody>`;
                                for (j=0;j< tox.ToxProps.length;j++){
                                        Toxico+='<tr><td class="specimen_data_name"><h3>'+tox.ToxProps[j].t +'</h3><i>('+tox.ToxProps[j].d.u+')</i><br> en '+tox.ToxProps[j].o  +' vía '+tox.ToxProps[j].r+'.</td>';	//parametro
                                        Toxico+='<td class="specimen_data_value">'+tox.ToxProps[j].d.r +'<td>';
                                        //Toxico+='<th>('+tox.ToxProps[j].o +')</th>';  		//organismo 
                                        //Toxico+='<th>'+tox.ToxProps[j].r +'</th>';		  	//vía
                                        //Toxico+='<td><i>'+tox.ToxProps[j].j.t +'</i></td></tr>';
					Toxico+=`<td class="specimen_data_referencia" onclick="mostrarReferencia( $( this ) )"><span></span> <i class="fas fa-book"></i><td></tr><tr class="cita"><td>`+tox.ToxProps[j].j.t+`</td></tr>`;                                                                   
                                }                                                                       
                        Toxico+=`</table>
                                </section>`;
                                                                                                                  
                        $(".specimen_page").append(Toxico);
                        }catch(error){console.error(error);}
 
               //SEGURIDAD QUIMICA:
                        try{
                        ChemSafety=`<section class='specimen_data' id='seguridad'> <h1>Seguridad Química</h1>
					<table><tr><th>`;
                                for (j=0;j< tox.GHS.length;j++){
                                        ChemSafety+=`<figure><img src='src/PubChem/imgGHS/`+tox.GHS[j]+`.svg' />`;      
                                        ChemSafety+=`<figcaption>`+tox.GHS[j]+`</figcaption></figure>`; 
                                }                                                                       
                        ChemSafety+='</th></tr></table></section>';                                                 
                
                
                        $(".specimen_page").append(ChemSafety);
                        }catch(error){console.error(error);}
                //NFPA
                        NFPA=`<section class='specimen_data' id='NFPA'> <h1>NFPA 704</h1>
                                <table><tr><td>
				<figure>
					<img src='src/PubChem/imgNFPA/`+tox.NFPA+`.svg'/>      
                                	<figcaption>`+tox.NFPA+`</figcaption>
				</figure> 
                                </td></tr></table>
			      </section>`;                                              

                        $(".specimen_page").append(NFPA);


	
		//navbar
		navbar=`<nav class="specimen_page_nav">
		        <div class="specimen_page_nav_header"><h3>`+tox.nombre+`</h3></div>
		        <ul>`
			secciones=$(".specimen_data")
			//secciones_h1=$(".specimen_page h1")
			secciones.each(function(i) {
                        	sec_pos=$(this).position().top-80;
                        	id=$(this)[0].id;
				text=$(this).children("h1")[0].innerHTML;
		        //for (j=0;j< secciones.length;j++){
		        	navbar+='<li class="specimen_page_nav_li" onclick="scrollUp('+sec_pos+')" name="'+id+'"><button>'+text+'</button> </li>'
			});
		        navbar+=`</ul>
			</nav>`
			$(".specimen_page").append(navbar);

};

 //Ripple























