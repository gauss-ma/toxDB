#!/bin/sh
wget -r -A ttl.gz -nH --cut-dirs=3 -P compound ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/compound/general
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/substance
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/descriptor
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/synonym
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/inchikey
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/bioassay
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/measuregroup
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/endpoint
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/protein
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/biosystem
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/conserveddomain
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/gene
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/source
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/concept
wget -r -A ttl.gz -nH --cut-dirs=2 ftp://ftp.ncbi.nlm.nih.gov/pubchem/RDF/reference
