#!/bin/bash

cids=($(cat ../Regulados/cid.lst))

mkdir -p img2D
mkdir -p img3D

outDB=PC_ChemSafety_db.js
#printf "     GHS_DB=[\n" > $outDB

for cid in ${cids[@]}
do
	echo -e "\e[33m $cid \e[0m";

	#Get 2D y 3D Molecule Fingerprint Image:
		wget -O "img2D/${cid}.png" "https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=s" 
	#	wget -O "img3D/${cid}.png" "https://pubchem.ncbi.nlm.nih.gov/image/img3d.cgi?&cid=${cid}&t=s"
		#Cambio fondo blanco por transparente
		convert img2D/${cid}.png -transparent "#F5F5F5" img2D/${cid}.png
	#	convert img3D/${cid}.png -transparent white img3D/${cid}.png
	#Get Chemical-Safety data:
	#	curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=Chemical+Safety">temporal
	#	if [ $? -eq 0 ] 
	#	then
	#		nombre=$(jq '.Record.RecordTitle' temporal)                                                            	
        #		CID_ID=$(jq '.Record.RecordNumber' temporal)
        #		GHSs=$(cat temporal | sed -n '/\"Extra/p' | sed 's/^.*\"Extra\":\(.*\)/\1/g')
        #		URLs=$(cat temporal | sed -n '/\"URL.*\.svg/p' | sed 's/.*images\/ghs\/\(.*\)\"\,/\"\1\"/g')
        #		printf "   {\n   nombre: ${nombre},\n   CID: ${CID_ID},\n">> "${outDB}";
        #		printf "   GHS:["  >> "${outDB}"; printf "%s," ${GHSs[@]} >> "${outDB}"; printf "],\n">> "${outDB}";
        #		printf "   img:["  >> "${outDB}"; printf "%s," ${URLs[@]} >> "${outDB}"; printf "]\n},\n">> "${outDB}";
	#	else
	#		continue;
	#	fi
done;
#printf "]\n">> "${outDB}";


#Descargar datos de la base de datos: PubChem
# Propiedades:

#props="MolecularFormula,MolecularWeight,IUPACName,XLogP,CanonicalSMILES,Charge"
#cids_str="8758,7847,2086,2087,14488,222,23969,2256,5355457,2314,139073,727,727,10967,8343,6331,15531,23973,2566,30773,23994,7964,23978,23976,29131,3017,3030,39985,4685,11,10900,10900,8449,11243,7771,8461,3120,6837,996,9154,24524,4790,3496,13930,8370,23925,4004,4130,4169,30479,934,15938,36231,23448,17097,36188,38018,23954,3061,533,5216,67634,5392,31373,1140,6413,5543,27582,7237,9161,6579,23967,727,10943,6573,8461,3224,3224,727,13,7239,3224,14917,9153,9158,5352426,7904,8078,313,312,335,7040,1118,402"
#curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cids_str}/property/${props}/JSON" > PC_Summary_db.js

