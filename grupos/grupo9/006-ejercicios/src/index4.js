//obtenemos un número aleatorio entre 10 y 30
let contGlobos = Math.floor(Math.random() * (30 - 10) + 10);
console.log(contGlobos);
const generarListaGlobos = () => {
  let listaGlobos='';
  let colores = ['Azul', 'Rojo', 'Amarillo'];
  for (let i = 0; i < contGlobos; i++) {
    let pos = i % colores.length; // obtenemos el resto de dividir por 3
    if (i%10===0)
      listaGlobos+='<br>';
    
    listaGlobos += `<div class="globo${colores[pos]}" id="globo${i}"></div>`;
  }
  return listaGlobos;
};

document.getElementById('app').innerHTML = generarListaGlobos();
let pos;
for (let i = 0; i < contGlobos; i++) {
pos=i*100;
  document.getElementById('globo' + i).onclick = borrarGlobo;
 // document.getElementById('globo' + i).setAttribute("style", "margin-left:"+pos+"px;margin-top:"+10+"px;");

  //document.getElementById('globo' + i).style.margin="("+pos+",15)";
}


function borrarGlobo(event) {
  console.log(event,event.target.attributes.id.nodeValue);
  if (eliminarElemento(event.target.attributes.id.nodeValue)){
    contGlobos--;
    if (contGlobos===0)
    alert("Ganaste");
  }
}

 
function eliminarElemento(id){
	let element = document.getElementById(id);	
	if (!element){
		return false;
	} else {
		padre = element.parentNode;
    padre.removeChild(element);
    return true;
	}
} 

// top es moverme dede arriba hacia abajo
// left moverme desde izquierda a derecha

/* console.log(document.getElementById("globo1").offsetTop);
console.log(document.getElementById("globo2").offsetTop);
console.log(document.getElementById("globo3").offsetTop);


console.log(document.getElementById("globo1").offsetLeft);
console.log(document.getElementById("globo2").offsetLeft);
document.getElementById("globo3").setAttribute("style", "margin-left: 100px;");
 */