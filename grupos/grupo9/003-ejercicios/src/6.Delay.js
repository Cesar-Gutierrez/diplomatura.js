

export async function run() {
    
try {
    console.log(1);
    await delay(3000).then((prometido)=> console.log(prometido));
    console.log(2);
    await delay(2000).then((prometido)=> console.log(prometido));
    console.log(3)
    await delay(1000).then((prometido)=> console.log(prometido));

}
    catch(err)
    {console.log('Ha ocurrido un error:',err);}
    
};

const contadorMensajes= [0] ;

const delay = (demoraMinima)=>{

    return new Promise( (resolve)=> {
        setTimeout(() =>resolve(salidaDelay()),demoraMinima);
    });  
};


const salidaDelay= ()=>{    
    let mensaje ='Terminó '+(contadorMensajes[0]+1);    
    contadorMensajes[0]+=1;    

    return mensaje;
} 