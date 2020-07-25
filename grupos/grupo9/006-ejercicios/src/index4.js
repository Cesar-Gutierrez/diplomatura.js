`<div id="globoVerde"></div>
    <div id="globoRojo"></div>
<div id="globoAzul"></div>`;

//obtenemos un número aleatorio entre 10 y 30
let contGlobos = Math.floor(Math.random() * (30 - 10) + 10);
console.log(contGlobos);
const generarListaGlobos = () => {
  let listaGlobos;
  let colores = ['Azul', 'Rojo', 'Amarillo'];
  for (let i = 0; i < contGlobos; i++) {
    let pos = i % colores.length; // obtenemos el resto de dividir por 3
    listaGlobos += `<div class="globo${colores[pos]}" id="globo${i}"></div>`;
  }
  console.log(listaGlobos);
  //  lista = lista + `</ul>`;
  return listaGlobos;
};

document.getElementById('app').innerHTML = generarListaGlobos();
for (let i = 0; i < contGlobos; i++) {
  document.getElementById('botonDelete' + element).onclick = borrarItem;
}

TODO.forEach((element) => {
  document.getElementById('globo' + i).onclick = borrarGlobo;
});

function borrarGlobo(event) {
  console.log(event);
}
