#!/bin/bash
var=("OX" "SA" "W")
for i in $(seq 0 4)
do
	for j in $(seq 0 4)
	do
		for k in $(seq 0 4)
		do 

	
			wget -O "imgNFPA/${i}-${j}-${k}.svg" "https://pubchem.ncbi.nlm.nih.gov/image/nfpa.cgi?code=$i$j$k"

done
done
done
