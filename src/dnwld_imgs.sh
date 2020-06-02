#!/bin/sh

for cid in $(cat cid.lst)
do

                img2D_file="PubChem/img2DHD/${cid}.png";img3D_file="PubChem/img3DHD/${cid}.png"
                wget --quiet -O "${img2D_file}" "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=l"
                wget --quiet -O "${img3D_file}" "https://pubchem.ncbi.nlm.nih.gov/image/img3d.cgi?&cid=${cid}&t=l"
                #Cambio fondo blanco por transparente y pos-procesamiento:
                convert ${img2D_file} -transparent "#F5F5F5" ${img2D_file}
                convert ${img3D_file} -transparent white ${img3D_file}
done
