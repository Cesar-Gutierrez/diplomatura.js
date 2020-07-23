
let tabla=`
<table>
  <tr>
    <th>name</th>
    <th>height</th>
    <th>place</th>
  </tr>
  <tr>
    <td>Kilimanjaro</td>
    <td>5895</td>
    <td>Tanzania</td>
  </tr>
  </table>
`
const mountains = [
    { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
    { name: 'Everest', height: 8848, place: 'Nepal' },
    { name: 'Mount Fuji', height: 3776, place: 'Japan' },
    { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
    { name: 'Denali', height: 6168, place: 'United States' },
    { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
    { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
  ];

const generarTabla=()=>{
    let encabezado= `<table>
    <tr>
      <th>name</th>
      <th>height</th>
      <th>place</th>
    </tr>
    `
    mountains.forEach(mount => {
   
   encabezado=encabezado+    `
   <tr>
        <td>${mount.name}</td>
        <td>${mount.height}</td>
        <td>${mount.place}</td>
    </tr>
      `
           
    });
    encabezado=encabezado+`</table>`
    return encabezado;
}



document.getElementById('tabla').innerHTML = generarTabla();
