#!/bin/bash
name=("Cloro benceno" "Orto - diclorobenceno" "Pentaclorofenol")
CID=(7964 7239 992)
CAS=	

#https://pubchem.ncbi.nlm.nih.gov/compound/7964

for cid in ${CID[@]}
do

wget https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/$cid/JSON/?response_type=display -O ${cid}.json
done
