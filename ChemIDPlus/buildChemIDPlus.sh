#!/bin/bash
ChemIDPlus_out="ChemIDPlus.json"
ChemIDPlus_in="Rechazados_ChemIDPlus.json" #"../Linker.json" 

for cas in $( jq -r ".[] | .CAS" ${ChemIDPlus_in} )
do
        echo -en "\e[32m ${cas} \e[0m\n"

	#------------------------------------------------------------------------------------------------------------------------------
	#=>ChemIDPlus: 
	#FísicoQuímica y Toxicología
        	tmp_json=$(curl "https://chem.nlm.nih.gov/api/data/rn/sw/${cas}/?data=details")
		if [ $? -eq 0 ]
                then
                	fisicoquimica=$(echo $tmp_json | jq -r '.results[0].physicalProps')
                	toxicologia=$(  echo $tmp_json | jq -r '.results[0].toxicityList')
                else
                	echo -e "\e[31m ChemIDPlus data no encontrado.\e[0m"; printf '{"CAS":${cas},"nombre":${nombre}},' >> Rechazados_ChemIDPlus.json
			continue
                fi;

		printf " {\n"						    >> $ChemIDPlus_out
			printf "   \"CAS\" : \"${cas}\",\n" 		    >> $ChemIDPlus_out
			printf "   \"FisProps\": ${fisicoquimica},\n"       >> $ChemIDPlus_out
			printf "   \"ToxProps\": ${toxicologia} \n" 	    >> $ChemIDPlus_out
		printf " },\n" 						    >> $ChemIDPlus_out
	#------------------------------------------------------------------------------------------------------------------------------
done;

	# ----
	#POST-Procesamiento:
	#Bug en ChemIDPlus, doble "" en cita a bibliografía.
	printf "ChemIDPlus=[\n" >${ChemIDPlus_out}.js
	sed "s/\(\"t\": \)\"\"\([^\"]*\)\"/\1\"'\2'/g" $ChemIDPlus_out >> ${ChemIDPlus_out}.js
	printf "\n]" >>${ChemIDPlus_out}.js


	#Traduccion de variables:
    #sed 's/pKa Dissociation Constant/pKa/g'
    #sed 's/Melting Point/Punto de Fusión/g'
    #sed 's/log P (octanol-water)/log Kow/g'
    #sed 's/Water Solubility/Solubilidad/g'
    #sed 's/Vapor Pressure/Presión de vapor/g'
    #sed "s/Henry\'s Law Constant/Constante de Henry/g"
    #sed 's/Atmospheric OH Rate Constant/Tasa de OH Atmosférica/g'
    #sed 's/atm-m3/mole/atm.m3/mol/g'
    #sed 's/cm3/molecule-sec/cm3/molecula.seg/g'
    #sed 's/deg C/ºC/g'

