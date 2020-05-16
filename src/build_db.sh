#!/bin/bash

## ------
#
##DESCARGAR ARCHIVOS:
#
##descargo el indice de contaminantes
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

#PARSEAR HTMLS

for file in $(ls htmls)
do
	name=$(echo "$file" | sed "s/[[:digit:]]*-\(.*\).html/\1/")
	CAS=$(cat htmls/$file | tr -d "^M\t\n\r" | sed "s/^.*CAS No. <\/strong>\([^<]*\)<\/.*/\1\n/")

	echo -e "$CAS: \e[34m $name \e[0m"
	#file=CAS/10-CAS-260946.html
	cat htmls/${file} | tr -d "\t\r\n^M" > temporal
	
	sed -i 's/.*<table[^>]*>\(.*\)<\/table>.*$/\n\1\n/g' temporal
	sed -i 's/<\/\{0,1\}strong>//g; s/<\/\{0,1\}em>//g;s/<\/\{0,1\}span>//g;' temporal
	sed -i "s/<[/]\{0,1\}tr>/\n/g; s/<td[^>]*>/ /g; s/<\/\{0,1\}td[^>]*>/\t;/g" temporal
	sed -i '/^$/d;/span/d;s/^[^.]//;' temporal
	sed -i '/^&nbsp/d; s/\&\#.\{2,3\}\;//g' temporal

	#awk -v name=$name -v CAS=$CAS -F ";" 'BEGIN{printf"{\n   name:"name",\n   CAS:"CAS",\n"}{printf("   "$1": "$2",\n")}END{printf "};\n"}' temporal >> toxicoDB.json
	awk -v name=$name -v CAS=$CAS -F ";" 'BEGIN{printf"\n"name"; "CAS"; "}{printf($2"; ")}END{}' temporal >> toxicoDB.csv

	#cat temporal >> out/${name}_${CAS}.db

done;
