var textArea = document.getElementById("area");
function busquedas(){
  vertices.sort(function (a, b) {
        return a.destino-b.destino;
  });

  var edo_inicial = document.getElementById("EdoIn").value;
  var edo_final   = document.getElementById("EdoFin").value;
  var opcion=document.getElementById("seleccion");
  var limite = document.getElementById("limite").value;

  switch(parseInt(opcion.value)) {
    case 1:
        reiniciar_nodo();
        textArea.innerHTML= "";
        busqueda_por_amplitud(edo_inicial,edo_final);
        break;
    case 2:
        reiniciar_nodo();
        textArea.innerHTML = "";
        busqueda_por_profundidad(edo_inicial,edo_final);
        break;
    case 3:
        reiniciar_nodo();
        textArea.innerHTML = "";
        busqueda_por_costouniforme(edo_inicial,edo_final);
        break;
    case 4:
        reiniciar_nodo();
        textArea.innerHTML = "";
        busqueda_por_profundidad_limitada(parseInt(limite),edo_inicial,edo_final);
        break;
    case 5:
        reiniciar_nodo();
        textArea.innerHTML = "";
        busqueda_por_profundidad_limitada_iterativa(parseInt(limite),edo_inicial,edo_final);
        break;
    default:
        console.log("Caso Incorrecto!!");
  }
}

function reiniciar_nodo(){
  for (var i = 0; i < nodos.length; i++) {
    nodos[i].visitado=0;
    nodos[i].costo=0;
    nodos[i].padre=0;
    nodos[i].altura=0;
  }
}


function busqueda_por_amplitud(edo_inicial,edo_final){
	var cola = new Array();
  cola.push(nodos[edo_inicial-1]);
  nodos[edo_inicial-1].visitado=1;

    while(cola[0].valor != nodos[edo_final-1].valor){
         var nodo_a_expandir= new Object(cola[0]);
         console.log("cola actual: ");
         imprimircola(cola);
         cola.shift();

         for (var i = 0; i<vertices.length; i++) {
           	if(nodo_a_expandir.valor==vertices[i].origen){
                 var pos = indice_del_nodo(vertices[i].destino,nodos);
                 if(nodos[pos].visitado==0){
                 		cola.push(nodos[pos]);
                 		nodos[pos].visitado=1;
                    nodos[pos].costo+=parseInt(vertices[i].peso)+nodo_a_expandir.costo;
                    nodos[pos].padre=nodo_a_expandir.valor;
             	   }
           	}
         }1
         if(cola.length==0){
         	return false;
         }
    }
    console.log("cola actual: ");
    imprimircola(cola);
    imprime_ruta_y_costo(edo_final);
    var real = "Costo real: "+nodos[edo_final-1].costo;
    textArea.innerHTML+=real;
    console.log("Costo real: "+nodos[edo_final-1].costo);
}
function imprime_ruta_y_costo(estadofinal){
   var ruta ="Ruta: [";
   var estadoactual=nodos[estadofinal-1];
   var costo=0;
   while(estadoactual.padre!=0){
       ruta=ruta+" "+estadoactual.valor+"->";
       estadoactual=nodos[estadoactual.padre-1];
       costo++;
   }
   ruta=ruta+estadoactual.valor+" ]"+ " Costo: "+costo;
   textArea.innerHTML+=ruta;
   textArea.innerHTML+="\n";
   console.log(ruta);
}
function imprimircola(array){
	var salida ="[ ";
	for (var i = 0; i < array.length; i++) {
		salida+=array[i].valor+" ";
	}
	salida+="]";
  textArea.innerHTML+=salida;
  textArea.innerHTML+="\n";
	console.log(salida);
}
function indice_del_nodo(valor,nodos){
	for (var i = 0; i < nodos.length; i++) {
		if(nodos[i].valor==valor)
			return i;
	}
	return -1;
}

function busqueda_por_profundidad(edo_inicial,edo_final){
    var pila=new Array();
    pila.unshift(nodos[edo_inicial-1]);
    nodos[edo_inicial-1].visitado=1;

    while(pila[0].valor != nodos[edo_final-1].valor){
         var nodo_a_expandir= new Object(pila[0]);
         console.log("Cola actual: ");
         imprimircola(pila);
         pila.shift();

         for (var i = vertices.length-1; i >= 0; i--) {
         	if(nodo_a_expandir.valor==vertices[i].origen){
               var pos = indice_del_nodo(vertices[i].destino,nodos);
               if(nodos[pos].visitado==0){
               		pila.unshift(nodos[pos]);
               		nodos[pos].visitado=1;
                  nodos[pos].costo+=parseInt(vertices[i].peso)+nodo_a_expandir.costo;
                  nodos[pos].padre=nodo_a_expandir.valor;
           	   }
         	}
         }
         if(pila.length==0){
         	return false;
         }
    }
    console.log("cola actual: ");
    imprimircola(pila);
    imprime_ruta_y_costo(edo_final);
    var real = "Costo real: "+nodos[edo_final-1].costo;
    textArea.innerHTML+=real;
    console.log("Costo real: "+nodos[edo_final-1].costo);
}

function busqueda_por_costouniforme(edo_inicial,edo_final){
  var cola = new Array();
  cola.push(nodos[edo_inicial-1]);
  nodos[edo_inicial-1].visitado=1;

  while(cola[0].valor != nodos[edo_final-1].valor){
         var nodo_a_expandir= new Object(cola[0]);
         console.log("cola actual: ");
         imprimircola(cola);
         cola.shift();

         for (var i = 0; i<vertices.length; i++) {
          if(nodo_a_expandir.valor==vertices[i].origen){

               var pos = indice_del_nodo(vertices[i].destino,nodos);
               if(nodos[pos].visitado==0){
                  cola.push(nodos[pos]);
                  nodos[pos].visitado=1;
                  nodos[pos].costo+=parseInt(vertices[i].peso)+nodo_a_expandir.costo;
                  nodos[pos].padre=nodo_a_expandir.valor;
                  cola.sort(function (a, b) {
                      return a.costo-b.costo;
                  });
               }
          }
         }
         if(cola.length==0){
          return false;
         }
    }
    console.log("cola actual: ");
    imprimircola(cola);
    imprime_ruta_y_costo(edo_final);
    var real = "Costo real: "+nodos[edo_final-1].costo;
    textArea.innerHTML+=real;
    console.log("Costo real: "+nodos[edo_final-1].costo);
}

function busqueda_por_profundidad_limitada(limite,edo_inicial,edo_final){
    var pila=new Array();
    pila.unshift(nodos[edo_inicial-1]);
    nodos[edo_inicial-1].visitado=1;


    while(pila[0].valor != nodos[edo_final-1].valor){
         var nodo_a_expandir= new Object(pila[0]);
         var altura=nodo_a_expandir.altura;
         console.log("Cola actual: ");
         imprimircola(pila);
         pila.shift();

         for (var i = vertices.length-1; i >=0; i--) {
         	if(nodo_a_expandir.valor==vertices[i].origen){
               var pos = indice_del_nodo(vertices[i].destino,nodos);

               if(nodos[pos].visitado==0){
               		nodos[pos].altura=altura+1;
	               if(nodos[pos].altura<=limite){
	               		pila.unshift(nodos[pos]);
	               		nodos[pos].visitado=1;
                    nodos[pos].costo+=parseInt(vertices[i].peso)+nodo_a_expandir.costo;
                    nodos[pos].padre=nodo_a_expandir.valor;
	           	   }
           	   }

         	}
         }
         if(pila.length==0){
         	return false;
         }
    }
    console.log("cola actual: ");
    imprimircola(pila);
    imprime_ruta_y_costo(edo_final);
    var real = "Costo real: "+nodos[edo_final-1].costo;
    textArea.innerHTML+=real;
    console.log("Costo real: "+nodos[edo_final-1].costo);
    return true;
}

function busqueda_por_profundidad_limitada_iterativa(limite,edo_inicial,edo_final){
	for (var i = 0; i <= limite; i++) {
    textArea.innerHTML+="\n";
    var lim = "limite: "+i;
    textArea.innerHTML+=lim;
		console.log("limite: "+i);
		  reiniciar_nodo();
	    if( busqueda_por_profundidad_limitada(i,edo_inicial,edo_final)==true){
	    	return;
	    }
	}
	console.log("No se encontró la meta");
}
