#!/bin/bash
PubChem_out="PubChem.json"
PubChem_in="../Linker.json"

for cid in $( jq -r ".[] | .CID" ${PubChem_in} )
do
        echo -en "\e[32m ${cid} \e[0m\n"

	#------------------------------------------------------------------------------------------------------------------------------
	#=>PubChem:
		#Sinonimos:
	        tmp_json=$(curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=Synonyms")
		sinonimos=$(echo $tmp_json | jq "[.. | ."String"? | strings][0:9]")

		#Descripcion:
	        tmp_json=$(curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=Hazards+Summary")
		descripcion=$(./trans --brief en:es <<< $(echo $tmp_json | jq '..|."String" ? | strings' | sed -e ':a;N;$!ba;s/\"//g;s/\n/<br>/'))
	
		#Seguridad Química:
                tmp_json=$(curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=Chemical+Safety")
		GHSs="$(echo $tmp_json | jq '.. | ."Extra"? |strings' | awk -F '\n' 'BEGIN{printf "["};{printf("%s,", $1)};END{printf "],\n"}')"
	
		#NFPA 704 diamond
		tmp_json=$(curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=NFPA+Hazard+Classification")
		NFPA="$(echo $tmp_json | jq '[.. | ."Extra"? |strings][0]')"

		#Print en ToxDB:
		printf " {\n"						    >> $PubChem_out
			printf "   \"CID\" : ${cid},\n" 		    >> $PubChem_out
			printf "   \"GHS\" : ${GHSs}\n"			    >> $PubChem_out 
			printf "   \"NFPA\" : ${NFPA},\n"		    >> $PubChem_out 
			printf "   \"descripcion\" : \"${descripcion}\",\n"     >> $PubChem_out 
			printf "   \"sinonimos\" : ${sinonimos} \n"         >> $PubChem_out 
		printf " },\n" 						    >> $PubChem_out
done;
	#=>PubChem: Summary
		props="MolecularFormula,MolecularWeight,IUPACName,InChI,InChIKey,XLogP,CanonicalSMILES,Charge,Fingerprint2D"
		cids=$(jq -r ".[] | .CID" ${PubChem_in} | awk '{printf $1","}END{print "\n"}' | sed -e 's/null//g;s/\,*$//g;s/\,\,*/\,/g;')
		#cids=$(cat cid.lst | awk '{printf $1","}END{print "\n"}' | sed -e 's/null//g;s/\,*$//g;s/\,\,*/\,/g;')
		curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cids}/property/${props}/JSON" > summary_db.json

	#Merge jsons:
		#jq -s '.[0] * .[1]' file1 file2

	# ----
	#POST-Procesamiento:
	#Bug en ChemIDPlus, doble "" en cita a bibliografía.
	printf "PubChem=[\n" >${PubChem_out}.js
	sed "s/\(\"t\": \)\"\"\([^\"]*\)\"/\1\"'\2'/g" $PubChem_out >> ${PubChem_out}.js
	printf "\n]" >>${PubChem_out}.js

	 sed -i "s/Acute Toxic/Toxicidad Aguda/g;s/Compressed Gas/Gas Comprimido/g;s/Corrosive/Corrosivo/g;s/Environmental Hazard/Daño Ambiental/g;s/Explosives/Explosivo/g;s/Flammable/Inflamable/g;s/Health Hazard/Daño a la Salud/g;s/Irritant/Irritante/g;s/Oxidizer/Oxidante/g" ${PubChem_out}.js

