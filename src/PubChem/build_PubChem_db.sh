#!/bin/bash

#CAS to CID:
#CAS=$(awk -F ";" '{print $3}' milista2.csv)
#for cas in ${CAS[@]}
#do
#	echo -en "\e[34m $cas : \e[0m"
#	cid=$(curl -s "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/xref/rn/$cas/cids/JSON" | jq -r '.IdentifierList.CID[0]')
#	echo $cid | tee -a cid.lst
#done

cids=($(cat cid.lst | sort | uniq))

mkdir -p img
mkdir -p img3D
outDB=PC_ChemSafety_db.js
printf "{\n GHS_DB=[\n" > $outDB

for cid in ${cids[@]}
do
	echo -e "\e[33m $cid \e[0m";

	#Get 2D y 3D Molecule Fingerprint Image:
	#	wget -O "img/${cid}.png""https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${cid}&t=s"  
	#	wget -O "img3D/${cid}.png" "https://pubchem.ncbi.nlm.nih.gov/image/img3d.cgi?&cid=${cid}&t=s"


	#Get Chemical-Safety data:
		curl "https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=Chemical+Safety">temporal
		nombre=$(jq '.Record.RecordTitle' temporal)
		CID_ID=$(jq '.Record.RecordNumber' temporal)
		GHSs=$(cat temporal | sed -n '/\"Extra/p' | sed 's/^.*\"Extra\":\(.*\)/\1/g')
 		URLs=$(cat temporal | sed -n '/\"URL.*\.svg/p' | sed 's/.*images\/ghs\/\(.*\)\"\,/\"\1\"/g')
		printf "   {\n   nombre: ${nombre},\n   CID: ${CID_ID},\n">> "${outDB}";
        	printf "   GHS:["  >> "${outDB}"; printf "%s," ${GHSs[@]} >> "${outDB}"; printf "],\n">> "${outDB}";
        	printf "   img:["  >> "${outDB}"; printf "%s," ${URLs[@]} >> "${outDB}"; printf "]\n},\n">> "${outDB}";
done;

        	printf "]\n},\n">> "${outDB}";


#Descargar datos de la base de datos: PubChem
# Propiedades:
#props="MolecularFormula,MolecularWeight,IUPACName,XLogP,CanonicalSMILES,Charge"
#MolecularFormula  #MolecularWeight  #CanonicalSMILES  #IsomericSMILES  #InChI    #InChIKey   #IUPACName   #XLogP    #ExactMass   #MonoisotopicMass  #TPSA    #Complexity   #Charge    #HBondDonorCount  #HBondAcceptorCount  #RotatableBondCount  #HeavyAtomCount   #IsotopeAtomCount  #AtomStereoCount  #DefinedAtomStereoCount  #UndefinedAtomStereoCount #BondStereoCount  #DefinedBondStereoCount  #UndefinedBondStereoCount #CovalentUnitCount  #Volume3D   #XStericQuadrupole3D  #YStericQuadrupole3D  #ZStericQuadrupole3D  #FeatureCount3D   #FeatureAcceptorCount3D  #FeatureDonorCount3D  #FeatureAnionCount3D  #FeatureCationCount3D  #FeatureRingCount3D  #FeatureHydrophobeCount3D #ConformerModelRMSD3D  #EffectiveRotorCount3D 	#ConformerCount3D #Fingerprint2D			
#cids_str=$(printf "%s," ${cids[@]})
#cids_str="10900,10943,11,11243,1140,13,139073,13930,14488,14917,15531,2086,2087,222,2256,2314,23925,23930,23931,23954,23967,23969,23973,23978,23994,24524,2566,25670,27582,28486,29131,3017,3024,3030,3061,30773,312,3120,313,31373,3224,335,39985,4004,402,4130,4169,5216,533,5352426,5355457,5392,5543,5984,6331,6413,6573,6579,67634,6837,7040,7237,727,7771,7847,7904,7944,7964,8078,8115,8370,8449,8461,8758,887,9131,9153,9154,9158,9161,934,996"
#curl https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/$cids_str/property/$props/JSON > pubchem_db.json

