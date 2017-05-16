var diagram;
var $;
var cont=0;
var puntos=new Array();
var nodos =new Array();
var vertices=new Array();
function goIntro(){
   $ = go.GraphObject.make;
   diagram =
    $(go.Diagram, "myDiagramDiv",
      {
        initialContentAlignment: go.Spot.Center, // center Diagram contents
        "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
      });
}

function addGraph(){
  //diagram.layout = $(go.GridLayout);
  var nodo = new Object();
  nodo.valor=cont+1;
  nodo.visitado=0;
  nodo.altura=0;
  nodo.costo=0;
  nodo.padre=0;
  nodos[cont]=nodo;

  cont++;
  puntos[cont] =
     $(go.Node, "Auto",
       $(go.Shape,
           { figure: "Circle",
           fill: "lightblue" }),
       $(go.TextBlock,
         { text: cont,
           margin: 10 })
     );
   diagram.add(puntos[cont]);
}

function addVertice(){
  var primero = document.getElementById("primero").value;
  var segundo = document.getElementById("segundo").value;
  var tercero = document.getElementById("tercero").value;
  var num = tercero.toString();

  var vertice = new Object();
  vertice.origen=parseInt(primero);
  vertice.destino=parseInt(segundo);
  vertice.peso=tercero;
  vertices.push(vertice);

  var vertice2 = new Object();
  vertice2.origen=parseInt(segundo);
  vertice2.destino=parseInt(primero);
  vertice2.peso=tercero;
  vertices.push(vertice2); 

  diagram.add(
    $(go.Link,
      $(go.Shape),
      { fromNode: puntos[primero], toNode: puntos[segundo] },
      $(go.TextBlock,num,{ segmentOffset: new go.Point(0, -10) })
    ));
}
