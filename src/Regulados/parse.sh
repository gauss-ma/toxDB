#!/bin/bash

csplit --prefix="tabla" DTO-831-93.txt '/TABLA [0-9]\{1,2\} -/' '{*}'
	#==> tabla01 <==
	#TABLA 1 -        NIVELES GUIA DE CALIDAD DE AGUA PARA FUENTES DE AGUA DE BEBIDA HUMANA CON TRATAMIENTO CONVENCIONAL
	#==> tabla02 <==
	#TABLA 2 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PROTECCION DE VIDA ACUATICA. AGUA DULCE    
	#==> tabla03 <==
	#TABLA 3 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PROTECCION DE VIDA ACUATICA. AGUAS       
	#==> tabla04 <==
	#TABLA 4 -        NIVELES GUIA DE CALIDAD DE AGUA PARA PROTECCION DE VIDA ACUATICA. AGUAS       
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

sed -i '/^$/d;/CONSTITUY/{N;d}' tabla*


