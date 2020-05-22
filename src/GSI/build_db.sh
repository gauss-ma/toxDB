#!/bin/bash

## ------
#
##DESCARGAR ARCHIVOS:
#
##descargo el indice de contaminantes
#if [ ! -f htmls/ ] 
#then
#	mkdir htmls
#fi
#if [ ! -f gsi_chemical_db ]
#then
#	wget -np https://www.gsi-net.com/en/publications/gsi-chemical-database -O gsi_chemical_db
#fi
##extraigo links de interés
##grep -Eo "href='[^']+" gsi_chem_db.html > links
#grep -Eo "href='[^']+" gsi_chemical_db | grep "CAS" > links
##cambio href por wget..
#sed -i "s/href='\(.*\)/wget -np -P 'htmls' https:\/\/www.gsi-net.com\1 /g" links
##preparo script de descargas:
#printf "#!/bin/bash \n$(cat links)$" > links
#chmod 755 links
#./links
#
## ------
csv_cols="name CAS type m_mol S p_vap H Koc Kow D_air D_w BA NA LoD_w LoD_s NA lambda_s lambda_u NA theta_ag theta_bg EPA_w is_carc SF_o UR_inhal Ref_oral Ref_inh ads_derm ads_gast derm_per derm_lag derm_exp derm_contr MCL_1  MCL_2 NA PEL_TWA NA AqLP_w AqLP_bio HH_w_drink HH_fish HH_fish_sa"

#PARSEAR HTMLS
	#inicio DB:
	printf '{\n  data= [\n' > gsi.json;  
	printf "%s;" ${csv_cols[@]} > gsi.csv;  

for file in $(ls htmls)
do
	name=$(echo "$file" | sed "s/[[:digit:]]*-\(.*\).html/\1/")
	CAS=$(cat htmls/$file | tr -d "^M\t\n\r" | sed "s/^.*CAS No. <\/strong>\([^<]*\)<\/.*/\1\n/")
	tipo=$(cat htmls/$file | tr -d "^M\t\n\r" | sed "s/^.*Type:<\/strong>\([^<]*\)<\/.*/\1\n/")

	echo -e "$CAS: \e[34m $name \e[31m $tipo \e[0m"
	#file=CAS/10-CAS-260946.html
	cat htmls/${file} | tr -d "\t\r\n^M" > temporal
	
	sed -i 's/.*<table[^>]*>\(.*\)<\/table>.*$/\n\1\n/g' temporal
	sed -i 's/<\/\{0,1\}strong>//g; s/<\/\{0,1\}em>//g;s/<\/\{0,1\}span>//g;' temporal
	sed -i "s/<[/]\{0,1\}tr>/\n/g; s/<td[^>]*>/ /g; s/<\/\{0,1\}td[^>]*>/\t;/g" temporal
	sed -i '/^$/d;/span/d;s/^[^.]//;' temporal
	sed -i '/^&nbsp/d; s/\&\#.\{2,3\}\;//g' temporal

	#.json
	awk -v name="$name" -v CAS="$CAS" -v tipo="$tipo" -F ";" 'BEGIN{printf"   {\n   name:\x27"name"\x27,\n   CAS:\x27"CAS"\x27,\n   type:\x27" tipo"\x27,\n   "}{printf("   "$1": \x27"$2"\x27,\n")}END{printf "   },\n"}' temporal >> gsi.json
	#.csv
	awk -v name=$name -v CAS=$CAS -v tipo=$tipo -F ";" 'BEGIN{printf"\n"name"; "CAS"; "tipo"; "}{printf($2"; ")}END{}' temporal >> gsi.csv
done;

	printf '\n] \n}' >> gsi.json;  



csv_cols=(name CAS type m_mol S p_vap H Koc Kow D_air D_w BA NA LoD_w LoD_s NA lambda_s lambda_u NA theta_ag theta_bg EPA_w is_carc SF_o UR_inhal Ref_oral Ref_inh ads_derm ads_gast derm_per derm_lag derm_exp derm_contr MCL_1  MCL_2 NA PEL_TWA NA AqLP_w AqLP_bio HH_w_drink HH_fish HH_fish_sa)
orig_fields=("name" "CAS" "type" "olecular Weight (g\/mol)" "Solubility . 20-25 degC (mg\/L)" "Vapor pressure @ 20-25 degC (mmHG)" "Henrys Law constant @ 20 degC" "Sorption coefficient (log L\/kg) Koc" "Octanol-water partition coefficient (log L\/kg)" "Diffusion coefficient in air (cm2\/s)" "Diffusion coefficient in water (cm2\/s)" "Relative bioavailability factor (-)" "Analytical Detection Limits" "Water (mg\/L)" "Soil (mg\/kg)" "First-order decay half lives (days)" "Saturated zone" "Unsaturated zone" "Soil-to-plant biotransfer factor (0)" "Above ground veg." "Below ground veg." "EPA weight of evidence" "Carcinogen" "Oral slope factor (1\/\[mg\/kg\/day\])" "Inhalation unit risk factor (1\/\[ug\/m3\])" "Oral reference dose (mg\/kg\/day)" "Inhalation reference conc. (mg\/m3)" "Dermal adsorption fraction (-)" "Gastrointestinal adsorption fraction (-)" "Dermal permeability coefficient (cm\/hr)" "Lag time for dermal exposure (hr)" "Critical dermal exposure time (hr)" "Relative contribution of perm. coeff. (-)" "Primary CL" "Secondary CL" "Drinking Water CLs (mg\/L)" "Occupational Air PEL\/TWA (mg\/m3)" "Surface water quality criteria (mg\/L)" "Aquatic life protection: Fresh water biota" "Aquatic life protection: arine biota" "Human health: Drinking \/ freshwater fish" "Human health: Fresh water fishing only" "Human health: Salt water fishing only")

cat gsi.json > gsi.js

for i in $(seq 0 ${#csv_cols[@]})
do
	a=${orig_fields[$i]}
	b=${csv_cols[$i]}
 	echo "$a --> $b"
	sed -i "s/$a/$b/g" "gsi.js"

done;
#sed -i '/^.*NA[[:space:]]*:/d ;s/:[[:space:]]*-.*$/:NaN,/;s/:[[:space:]]*,/:NaN,/;s/[M ]isc./NaN/' gsi.js
sed -i "/^.*NA[[:space:]]*:/d; s/: ' -[[:space:]]',/:NaN,/;s/: 'NA'/NaN/; s/:[[:space:]]*,/:NaN,/;s/[M ]isc./NaN/" gsi.js
