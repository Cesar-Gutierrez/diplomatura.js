 let TODO = ['Queso', 'Tomates', 'Zanahorias', 'Toalla'];
 

 const generarLista=()=>{
    let lista= `<ul>
    `
    TODO.forEach(elemento => {
   
   lista=lista+    `
        <li>${elemento}</li>
      `
           
    });
    lista=lista+`</ul>`
    return lista;
}



const cargarItem=(valorItem)=>{
    
    
    let result=false;
    
    if (valorItem && valorItem.trim()!='') {
        TODO.push(valorItem);       
        result=true;
    }
    return result;
    }
 
 refrescar();   
document.getElementById("botonAgregar").onclick=generarItemHtml;

function refrescar(){
    document.getElementById('app').innerHTML = generarLista();
    document.getElementById("agregarItem").value='';
}

function generarItemHtml(){
        if (cargarItem(document.getElementById("agregarItem").value))
        refrescar();

}

