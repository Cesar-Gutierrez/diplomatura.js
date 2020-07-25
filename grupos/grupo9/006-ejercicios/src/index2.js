const mountains = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const generarTabla = () => {
  let encabezado = `<table>
    <tr>
      <th id="name">name</th>
      <th id="height">height</th>
      <th id="place">place</th>
      
    </tr>
    `;
  mountains.forEach((mount) => {
    encabezado =
      encabezado +
      `
   <tr>
        <td>${mount.name}</td>
        <td>${mount.height}</td>
        <td>${mount.place}</td>
    </tr>
      `;
  });
  encabezado = encabezado + `</table>`;
  return encabezado;
};

const generarTablaHTML = () => {
  document.getElementById('tabla').innerHTML = generarTabla();
};

const traducirEncabezado = () => {
  document.getElementById('name').innerHTML = 'nombre';
  document.getElementById('height').innerHTML = 'altura';
  document.getElementById('place').innerHTML = 'lugar';
};

document.getElementById('boton_ing').onclick = generarTablaHTML;

document.getElementById('boton_esp').onclick = function () {
  generarTablaHTML();
  traducirEncabezado();
};
