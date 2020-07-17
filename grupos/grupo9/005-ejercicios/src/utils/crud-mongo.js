import { MongoClient, ObjectId } from 'mongodb';
import { json } from 'body-parser';

// Connection URL
const urlDefault = 'mongodb://localhost:27017';


// Create a new MongoClient
export async function connect(url = urlDefault) {
    try {
        const client = MongoClient.connect(url);
        console.log("Conexión exitosa!!! :D ");
        return client;
    } catch (error) {
        console.log("No fue posible conectarse!!! :/ ");//return{codigo:mensaje}
    }
}


export async function find(db, nameCollection, params) {
    if (!db || !nameCollection) {
        console.log("BD o colección incorrecta");
        return;
    }
    try {
        const collection = db.collection(nameCollection);
        const result = await collection.find(params).toArray();
        
        // si se quisiera sin devolver _id
        //const result = await collection.find(params, { projection: { _id: 0 } }).toArray();
        return result;
    } catch (error) {
        console.log("No fue posible realizar la consulta! Error:  ", error);
    }
}

export async function findById(db, nameCollection, id) {
    if (!db || !nameCollection || !id) {
        console.log("BD, colección y/o id son incorrectos");
        return;
    }
    try {
        console.log("buscando elemento");
        const collection = db.collection(nameCollection);
        const idObj = new ObjectId(id);
        
        const elem=await collection.findOne({ _id: idObj });
        // console.log("find: ",elem);
        return elem;
    } catch (error) {
        console.log("No fue posible realizar la consulta! Error:  ", error);
    }
}

export async function insertarDoc(db, nameCollection, doc) {
    if (!db || !nameCollection || !doc) {
        console.log("BD o elemento incorrecto");
        return ;
    }
    try {
        const collection = db.collection(nameCollection);
        const result = await collection.insertOne(doc);
        return result;
    } catch (error) {
        console.log("No fue posible realizar la insercion! Error:  ", error);
    }
}

export async function deleteByID(db, nameCollection, id) {
    console.log("entro en deleteBYId");
    if (!db || !nameCollection || !id) {
        // console.log("BD, colección y/o id son incorrectos");
        return {Codigo:500,Mensaje:"BD, colección y/o id son incorrectos"}; 
    }   
    try {
        // console.log("eliminar elemento")
        const collec = await db.collection(nameCollection);
        if(!collec)
        { return {Codigo:400,Mensaje:"Error:La colección no existe dentro de la base ."}; }

        try{    
           const  elem=await findById(db, nameCollection, id) ;
        //    console.log("elemento find:",elem);
            if(!elem)
            {
                //  console.log("No existe el elemento que intenta eliminar");
                 return {Codigo:404,Mensaje:"No existe el elemento que intenta eliminar"}; 
            }
        }
        catch(err){        
                // console.log("Error al intentar recuperar el elemento a eliminar");
                return {Codigo:400,Mensaje:"Error interno al intentar recuperar el elemento a eliminar"};         
        }
    

     const respDel= await collec.deleteOne( {"_id"  :  ObjectId ( id)});
        const salida= await respuestaDelete(respDel);
        return salida;
    } catch (error) {
        // console.log("No fue posible eliminar el elemento! Error:  ", error);
        return {Codigo:500,Mensaje:"Error no se pudo eliminar el elemento."}; 
    }   
}

function respuestaFind(elemento)
{
    // console.log("elemento encotronrado o no", elememnto);
    if(!elemento)
    {
        // console.log("No existe el elemento que intenta eliminar");
        return {Codigo:400,Mensaje:"No existe el elemento que intenta eliminar"}; 
    }
}

async function respuestaDelete ( result) {
    // console.log(result);
    if(result.deletedCount===1)
   {
    //    console.log("despues de eliminar",result);
    // console.log("Eliminación exitosa.");
    return {Codigo:200,Mensaje:"Eliminación exitosa."};
   }
  else
    { 
        // console.log("Error base:No fue posible eliminar el elemento! Error:  ");
        return {Codigo:500,Mensaje:"Error mongo interno en el proceso de eliminación."};
    }
  
}