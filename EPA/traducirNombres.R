epa=read.csv("epa_lista.csv")

nombres=read.csv("../DICCIONARIO.csv")[c("CAS","NOMBRE.QUIMICO")]

A=merge(epa,nombres,by="CAS",all.x=TRUE)

write.csv(A,"epa_lista_castellano.csv")
