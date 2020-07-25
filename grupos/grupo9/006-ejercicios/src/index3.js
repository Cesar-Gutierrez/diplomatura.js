const generarLista = () => {
  let lista = `<ul list-group list-group-flush>`;
  TODO.forEach((elemento) => {
    lista =
      lista +
      `<li class="list-group-item list-group-item-dark d-flex justify-content-between">${elemento}<button id ="botonDelete${elemento}" class="btn btn-danger btn-sm">X</button> </li>
      `;
  });
  lista = lista + `</ul>`;
  return lista;
};

const cargarItem = (valorItem) => {
  let result = false;
  if (valorItem && valorItem.trim() != '') {
    TODO.push(valorItem);
    result = true;
  }
  return result;
};

function refrescar() {
  document.getElementById('app').innerHTML = generarLista();
  document.getElementById('agregarItem').value = '';
  TODO.forEach((element) => {
    document.getElementById('botonDelete' + element).onclick = borrarItem;
  });
}

function generarItemHtml() {
  if (cargarItem(document.getElementById('agregarItem').value)) {
    localStorage.setItem('todo', TODO);

    refrescar();
  }
}

function borrarItem(e) {
  console.log('quiero borrar: ', e.target.previousSibling.data);

  TODO.splice(TODO.indexOf(e.target.previousSibling.data), 1);
  localStorage.setItem('todo', TODO);
  refrescar();
}

let TODO = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];

// si el dato ya está en el localStorage (key) (puede estar vacío)
if (Object.keys(localStorage).find((e) => e === 'todo')) {
  TODO = localStorage.getItem('todo');
  TODO = TODO ? TODO.split(',') : [];
}

refrescar();
document.getElementById('botonAgregar').onclick = generarItemHtml;
