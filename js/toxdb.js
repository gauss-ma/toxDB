$(document).ready(function(){
	const $menu=$('#barraMenu');
	const $btn_menu=$('#botonMenu');
	const $logo=$(".LogoGauss");


        cerrarMenu();

        //ABRIR / CERRAR MENU:
        function abrirMenu(){
                console.log("Abriendo Menu..");

                $menu.removeClass("inactivo");
                $menu.addClass("activo");
                //$btn_menu.addClass('activo');
                //$btn_menu.removeClass('inactivo');
                $menu.show();
                //$("body").addClass("touch-off no-scroll");
                //setBlack();
        };

        function cerrarMenu(){
                console.log("Cerrando Menu..");

                $menu.removeClass("activo");
                $menu.addClass("inactivo");
                //$btn_menu.addClass('inactivo');
                //$btn_menu.removeClass('activo');
                $menu.hide();
                //$("body").removeClass("touch-off no-scroll");
                //setWhite();
        };

        $btn_menu.on('click',function () {
                if ( $menu.attr('class') == "activo") {cerrarMenu()}
                else if ( $menu.attr('class') == "inactivo") {abrirMenu()}
                else {console.log("tamo todos locos")};
        });


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
