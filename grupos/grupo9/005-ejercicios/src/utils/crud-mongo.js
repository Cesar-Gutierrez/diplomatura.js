import { MongoClient, ObjectId } from 'mongodb';
import { json } from 'body-parser';
import { helpers } from '../utils/helpers';

// Connection URL
const urlDefault = 'mongodb://localhost:27017';

// Create a new MongoClient
export async function connect(url = urlDefault) {
  try {
    const client = MongoClient.connect(url);
    console.log('Conexión exitosa!!! :D ');
    return client;
  } catch (error) {
    console.log('No fue posible conectarse!!! :/ '); //return{codigo:mensaje}
  }
}
export  async function endPointGet(req,res,dbName, coleccion) {
  const params = req.query;
  res.json(await  getColeccion(dbName,coleccion, params));
}
export  async function endPointGetByID(req,res,dbName, coleccion) {
  const id = req.params.id;
  let resp = {};
  if (id) {
    resp = await getById(dbName,coleccion,id);
  }
if(resp)
res.status(500).send(resp);
else
  res.status(400).send(`No existe el elemento en  ${coleccion}`);
}
export async function endPointPost(req, res,dbName,coleccion) {
  // TIP: En req.body viene los datoss
  /*   console.log("Esto tiene el body :", req.body);
   */
  let resp;
  let message;
  //let message;return;
  if (req.body && Object.keys(req.body).length !== 0) {      
    resp = await  insertarElemento(dbName,coleccion,req.body);
    // helpers.mostrarsalidaInsert(resp);
    if ( !resp.ops) {
      message = 'Error no se pudo insertar el elemento ';
      res.status(500).send({ message });
    }
     else
     {       
       const elemento=resp.ops;
       res.status(200).send(elemento);
      }
  } 
  else {
    message = `El elemento no se pudo insertar en ${coleccion}: no se recibieron datos`;
    res.status(500).send({ message });
  }
}




export  async function endPointDeleteByID(req, res,dbName,coleccion) {
  const id = req.params.id;
  let resp;
  if (req.params.length === 0 || !id) {    
    res.status(404).send('Debe ingresar un id.');
  } 
  else 
  {
    resp = await  deleteElementByID(dbName,coleccion,id);  
    helpers.salidaDel(resp, res); 
  }
}
  
async function findByParams(db, nameCollection, params) {
  if (!db || !nameCollection) {
    console.log('BD o colección incorrecta');
    return;
  }
  try {
    const collection = db.collection(nameCollection);
    const result = await collection.find(params).toArray();
  
    return result;
  } catch (error) {
    console.log('No fue posible realizar la consulta! Error:  ', error);
  }
}

async function findById(db, nameCollection, id) {
  if (!db || !nameCollection || !id) {
    console.log('BD, colección y/o id son incorrectos');
    return;
  }
  try {
    const collection = db.collection(nameCollection);
    const idObj = new ObjectId(id);
    const elem = await collection.findOne({ _id: idObj });
    return elem
  } catch (error) {
    console.log('No fue posible realizar la consulta! Error:  ', error);
    return;
  }
}

 export async function insertarDoc(db, nameCollection, doc) {
  if (!db || !nameCollection || !doc) {
    console.log('BD o elemento incorrecto');
    return;
  }
  try {
    const collection = db.collection(nameCollection);  
    const result = await collection.insertOne(doc);
    return result;
  } catch (error) {
    console.log('No fue posible realizar la insercion! Error:', error);
  }
}

export async function deleteByID(db, nameCollection, id) {  
  if (!db || !nameCollection || !id) {
    return { Codigo: 500, Mensaje: 'BD, colección y/o id son incorrectos' };
  }
  try {
    const collec = await db.collection(nameCollection);
    if (!collec) {
      return {
        Codigo: 400,
        Mensaje: 'Error:La colección no existe dentro de la base .',
      };
    }

    try {
      const elem = await findById(db, nameCollection, id);
      if ( !elem) {
        return {
          Codigo: 400,
          Mensaje: 'No existe el elemento que intenta eliminar',
        };
      }
    } catch (err) {
      return {
        Codigo: 400,
        Mensaje: 'Error interno al intentar recuperar el elemento a eliminar',
      };
    }

    const respDel = await collec.deleteOne({ _id: ObjectId(id) });
    const salida = await respuestaDelete(respDel);
    return salida;
  } catch (error) {
    return { Codigo: 500, Mensaje: 'Error no se pudo eliminar el elemento.' };
  }
}

function respuestaFind(elemento) {  
  if (!elemento) {    
    return {
      Codigo: 400,
      Mensaje: 'No existe el elemento que intenta eliminar',
    };
  }
}

async function respuestaDelete(result) {
  console.log(result);
  if (result.deletedCount === 1) {
    return { Codigo: 200, Mensaje: 'Eliminación exitosa.' };
  } else {
    console.log("Error base:No fue posible eliminar el elemento! Error:  ");
    return {
      Codigo: 500,
      Mensaje: 'Error mongo interno en el proceso de eliminación.',
    };
  }
}



export async function getById(dbName, collection, id) {
  // abrimos la conexión
  if (!id) {
    console.log('Error id sin contenido');
    return;
  }
  const client = await connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await findById(db, collection, id);
  client.close();
  return res;
}
export async function getColeccion(dbName, collection, params) {
  // abrimos la conexión
  let client = await connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await findByParams(db, collection, params);
  client.close();
  return res;
}

export const insertarElemento = async (dbName,collection, params) => {
  // abrimos la conexión
  console.log("insertar elemento");
  let client = await connect();
  const db =  client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await insertarDoc(db, collection, params);
  // await mostrar(res);
  client.close();
  return res;
};
// const mostrar = async (result)=>{console.log(" mostrar resultado: ",result)};

export const deleteElementByID = async (dbName, collection, id) => {
    // abrimos la conexión
    let client = await connect();
    const db = client.db(dbName);
  
    try {
    //   console.log("preparando delete");
      const resp = await deleteByID(db, collection, id);
      const salida = helpers.salir(resp, client); // console.log("respuesta delete",resp);
      return salida;
    }
     catch (err) 
     {
      client.close();
      return { Codigo: 500, Mensaje: 'Error de eliminación.' };
    }
}

export const updateElementByID= async(dbName, collection, id,element) => {
  // abrimos la conexión
  let client = await connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await updateDoc(db, collection, id, element);
  client.close();
  return res;
}

 async function updateDoc(db, nameCollection, id, doc) {
    if (!db || !nameCollection || !id || !doc) {
        console.log("BD o elemento incorrecto");
        return;
    }
    let elem = await findById(db, nameCollection, id);
    if (!elem) {

        return { Codigo: 400, Mensaje: "Elemento no encontrado" }
    }
    try {
        const collection = db.collection(nameCollection);

        const idObj = new ObjectId(id);
        const result = await collection.findOneAndUpdate({ _id: idObj }, { $set: doc }, { returnOriginal: false });
        if (result.lastErrorObject.n === 1 && result.lastErrorObject.updatedExisting) {
            return { Codigo: 200, Mensaje: "Elemento actualizado con éxito", Result: result.value }
        }
        else {
            return { Codigo: 500, Mensaje: "No fue posible realizar la actualización" }
        }

    } catch (error) {
        return { Codigo: 500, Mensaje: "Error: No fue posible realizar la actualización" }
    }
}
