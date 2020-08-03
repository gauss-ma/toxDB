#!/bin/bash

rm cid.lst

#CAS&NAME
grep -io ".*[0-9]\{3,5\}-[0-9][0-9]-[0-9]" DTO-831-93.txt  | sed "s/  [^0-9]*/;/g" | awk -F ";" '!_[$2]++ {print $2";"$1}' > lista.lst

CASs=$(awk -F ";" '{print $1}' lista.lst)
#CID
for cas in ${CASs[@]}
do
        echo -en "\e[34m ${cas} : \e[0m"
        cid=$(curl -s "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/xref/rn/${cas}/cids/JSON" | jq -r '.IdentifierList.CID[0]') 	
	if [ $? -eq 0 ]
	then
		echo $cid  | tee -a cid.lst 
	else
		echo "NaN"  | tee -a cid.lst
	fi;
done;
sed -i 's/^$/NaN/;s/null/NaN/' cid.lst
paste -d ';' lista.lst cid.lst | awk -F ";"  'BEGIN{print "data=["}{print "{\n   CAS:\""$1"\",\n   Nombre: \""$2"\",\n   CID:"$3"\n},\n"}END{print "]"}' > GENERAL_DB.js



#csplit --prefix="tabla" DTO-831-93.txt '/TABLA [0-9]\{1,2\} -/' '{*}'
	#==> tabla01 <==
	#TABLA 1 -        NIVELES GUIA DE CALIDAD DE AGUA PARA FUENTES DE AGUA DE BEBIDA HUMANA CON TRATAMIENTO CONVENCIONAL
	#==> tabla02 <==
	#TABLA 2 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PROTECCION DE VIDA ACUATICA. AGUA DULCE    
	#==> tabla03 <==
	#TABLA 3 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PROTECCION DE VIDA ACUATICA. AGUAS SALADAS SUPERFICIALES
	#==> tabla04 <==
	#TABLA 4 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PROTECCION DE VIDA ACUATICA. AGUAS SALOBRES SUPERFICIALES
	#==> tabla05 <==
	#TABLA 5 -        NIVELES GUIA DE CALIDAD DE AGUA PARA IRRIGACION.                                 
	#==> tabla06 <==
	#TABLA 6 -        NIVELES GUIA DE CALIDAD DE AGUA PARA BEBIDA DE GANADO                                    
	#==> tabla07 <==
	#TABLA 7 -        NIVELES GUIA DE CALIDAD DE AGUA PARA RECREACION.          
	#==> tabla08 <==
	#TABLA 8 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PESCA INDUSTRIAL.                                        
	#==> tabla09 <==
	#TABLA 9 -        NIVELES GUIA DE CALIDAD DE SUELOS          
	#==> tabla10 <==
	#TABLA 10 -       NIVELES GUIA DE CALIDAD DEL AIRE AMBIENTAL.         
	#==> tabla11 <==
	#TABLA 11 -       ESTANDARES DE EMISIONES GASEOSAS.

#sed -i '/^$/d;/CONSTITUY/{N;d}' tabla*
#awk -F "," 'BEGIN{print "data=["}{print "{\n   CID:"$4",\n   Nombre: \"" $2"\",\n   CAS:\""$3"\"\n},\n"}END{print "]"}' name_cas_cid.csv > GENERAL_DB.js


