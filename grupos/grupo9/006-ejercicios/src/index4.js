const inicio = () => {
  document.getElementById('app').innerHTML = generarListaGlobos();
  for (let i = 0; i < contGlobos; i++) {
    document.getElementById('globo' + i).onclick = borrarGlobo;
  }
};
const generarListaGlobos = () => {
  let listaGlobos = '';
  let colores = ['Azul', 'Rojo', 'Amarillo'];
  for (let i = 0; i < contGlobos; i++) {
    let pos = i % colores.length; // obtenemos el resto de dividir por 3
    if (i % 10 === 0) listaGlobos += '<br>';

    listaGlobos += `<div class=" col-sm-1 globo${colores[pos]}
    " id="globo${i}"><h4 class="font-weight-bold text-muted">${
      i + 1
    }</h4></div>`;
  }
  return listaGlobos;
};

/**
 * Evento click que borra el globo clickeado
 * @param {Object} event
 */
function borrarGlobo(event) {
  let id = event.target.attributes.id?.nodeValue;
  if (eliminarElemento(id)) {
    contGlobos--;
    if (contGlobos === 0) {
      alert('Ganaste');
    }
  }
}

/**
 * Método que elimina un elemento del HTML con el id ingresado
 * @param {string} id
 */
function eliminarElemento(id) {
  let element = document.getElementById(id);
  if (element) {
    padre = element.parentNode; //obtiene el padre
    padre.removeChild(element); //el padre borra a su elemento hijo
    return true;
  }
  return false;
}

// -------------------------------------------------------------------

//obtenemos un número aleatorio entre 10 y 30
const limitSup = 30;
const limitInf = 10;

let contGlobos = Math.floor(Math.random() * (limitSup - limitInf) + limitInf);
console.log('Total de Globos:', contGlobos);
inicio();
