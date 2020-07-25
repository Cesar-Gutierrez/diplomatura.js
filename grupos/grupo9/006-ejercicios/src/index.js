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
  let lista = `<table class = "table table-dark table-hover">
  <thead  class = "thead-light">
    <tr>
      <th>name</th>
      <th>height</th>
      <th>place</th>
    </tr>
    </thead>`;
  mountains.forEach((mount) => {
    lista =
      lista +
      `
   <tr>
        <td>${mount.name}</td>
        <td>${mount.height}</td>
        <td>${mount.place}</td>
    </tr>
      `;
  });
  lista = lista + `</table>`;
  return lista;
};

document.getElementById('tabla').innerHTML = generarTabla();
