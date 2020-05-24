#!/bin/bash


cids=($(cat cid))

for cid in ${cids[@]}
do

	echo -e "\e[33m $cid \e[0m"

	wget -np -O ${cid}.png https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=$cid&t=l
done
