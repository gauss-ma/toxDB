#!/bin/bash

#CAS=($(cat cas.lst))
#echo ${CAS[@]}
#mkdir -p src_data
#
#
#for cas in ${CAS[@]}
#do
#	echo -e "\e[31m $cas \e[0m"
#	curl https://chem.nlm.nih.gov/api/data/rn/sw/${cas}/?data=details > temporal
#	cp temporal src_data/${cas}.json
#done;


CAS=$(ls -d src_data/*)
outDB=chemIDplus_bd.js

printf '{\n  data= [\n' > "${outDB}";
for casfile in ${CAS}
do
	cp $casfile temporal

	nombre=$(jq '.results[0].summary.na' temporal)
	CAS_ID=$(jq '.results[0].summary.rn' temporal)
	FM=$(jq '.results[0].summary.f' temporal)

	printf "   {\n   nombre: ${nombre},\n   CAS: ${CAS_ID},\n   FM:${FM},\n">> "${outDB}";
	printf "   fisicoquimica:" >> "${outDB}";
	jq '.results[0].physicalProps' temporal >> "${outDB}";printf ",\n">> "${outDB}";
	printf "   toxicidad:"  >> "${outDB}";
	jq '.results[0].toxicityList' temporal >> "${outDB}";
	printf "\n},\n">> "${outDB}";
done;


#TODO:
# - Armar dicciionario/traducir palabras en inglés comunes

