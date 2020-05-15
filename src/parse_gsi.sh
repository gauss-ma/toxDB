#!/bin/bash

file=CAS/10-CAS-260946.html

cat $file | tr -d "\t\r\n^M" > simple

sed -i 's/.*<table[^>]*>\(.*\)<\/table>.*$/\n\1\n/g' simple
sed -i 's/<\/\{0,1\}strong>//g; s/<\/\{0,1\}em>//g;s/<\/\{0,1\}span>//g;' simple
sed -i "s/<[/]\{0,1\}tr>/\n/g; s/<td[^>]*>/ /g; s/<\/\{0,1\}td[^>]*>/\t;/g" simple
sed -i '/^$/d;/span/d;s/^[^.]//;' simple
sed -i '/^&nbsp/d; s/\&\#.\{2,3\}\;//g' simple

