#!/bin/bash
Linker_out="Linker.json"
Linker_in="Rechazados_CID.lst" #"lista.lst"

IFS=$'\n' CASs=($(awk -F ";" '{print $1}' ${Linker_in}))
IFS=$'\n' nombres=($(awk -F ";" '{print $2}' ${Linker_in}))

for i in $(seq 0 ${#CASs[@]})
do
	cas=${CASs[i]}
	nombre=${nombres[i]}

        echo -en "${nombre} \e[34m ${cas} : \e[0m"

	#=>Buscar CIDs:
        tmp_json=$(curl -s "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/xref/rn/${cas}/cids/JSON")
	if [ $? -eq 0 ]
        then
        	cid=$(echo $tmp_json | jq -r '.IdentifierList.CID[0]')

		if [[ $cid == null ]]
		then
			echo -e "\e[31m CID no encontrado.\e[0m"; echo "${cas};${nombre}">> Rechazados_CID.lst
			continue
		fi
		echo $cid >> cid.lst
		echo -e "\e[32m $cid \e[0m"
		
        else
        	echo -e "\e[31m CID no encontrado.\e[0m"; echo "${cas};${nombre}">> Rechazados_CID.lst
		continue
        fi;

		printf " {\n"						    >> $Linker_out
			printf "   \"CID\" : ${cid},\n" 		    >> $Linker_out
			printf "   \"CAS\" : \"${cas}\",\n" 		    >> $Linker_out
			printf "   \"nombre\" : \"${nombre}\"\n" 	    >> $Linker_out
		printf " },\n" 						    >> $Linker_out
done;
