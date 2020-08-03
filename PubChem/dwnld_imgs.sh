#!/bin/sh
PubChem_in="../linker.json"

for cid in $( jq -r ".[] | .CID" ${PubChem_in} )
do
		echo $cid
		#Imagen de estructura 2D y 3D:
                img2D_file="img2D/${cid}.png";
		img3D_file="img3D/${cid}.png";

                imgNotAvail_file="img3D/null.png";
		imgNoDispon_file="NANvGauss.png";

		if [ ! -f ${img2D_file} ]
		then
                	wget --quiet -O "${img2D_file}" "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=s"
		fi
		
		if [ ! -f ${img3D_file} ]
                then
 	               wget --quiet -O "${img3D_file}" "https://pubchem.ncbi.nlm.nih.gov/image/img3d.cgi?&cid=${cid}&t=s"
                fi
		#Cambio fondo blanco por transparente y pos-procesamiento:
                #convert ${img2D_file} -transparent "#F5F5F5" ${img2D_file}
                compare -metric AE ${imgNotAvail_file} ${img3D_file} null
                if [ $? -eq 0 ]
                then
                        cp ${imgNoDispon_file} ${img3D_file}
                else
                        convert ${img3D_file} -transparent white ${img3D_file}
                fi;
done
