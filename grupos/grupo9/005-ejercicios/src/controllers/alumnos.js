import express from 'express';
import * as connectDB from '../utils/crud-mongo';
const router = express.Router();

// methodOverride = require("method-override");--permite implementar y personalizar métodos HTTP.
// bodyParser  = require("body-parser");
// app.use(bodyParser.json());

const dbName = 'Db_Diplomatura';
const collectionName = 'alumnos';
const singleName = 'Alumno';

router.get('/', async function (req, res) {
  const params = req.query;  
  res.json(await getAlumnos(collectionName, params));
});


const getAlumnos = async (collection, params) => {
  // abrimos la conexión
  let client = await connectDB.connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await connectDB.find(db, collection, params);
  client.close();
  return res;
}

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  let resp = {};
  if (id) {
    resp = await getAlumnoById(collectionName, id);
  }
  res.json(resp);
});

const getAlumnoById = async (collection, id) => {
  // abrimos la conexión
  if (!id) {
    console.log("Error id sin contenido");
    return
  }
  const client = await connectDB.connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await connectDB.findById(db, collection, id);
   client.close();
  return res;
}

router.post('/', async function (req, res) {
  // TIP: En req.body viene los datoss
/*   console.log("Esto tiene el body :", req.body);
  console.log("Esto tiene el query :", req.query); */
  let resp;
  let message;
  //let message;return;
  if (req.body && Object.keys(req.body).length !== 0) {
    resp = await insertarAlumno(collectionName, req.body)
    // mostrarsalidaInsert(resp);
      if(!resp.ops)
      {
        message="Error no se pudo insertar el elemento ";
        res.status(500).send({ message });
      }
     else
      res.status(200).send( resp.ops );
               
  }
  else {
    message = `${singleName} no insertado: no se recibieron datos`;
    res.status(500).send({ message });
  }

  
});

function mostrarsalidaInsert(resp)
{
  console.log("salida insercion: ",resp);
}

const insertarAlumno = async (collection, params) => {
  // abrimos la conexión
  let client = await connectDB.connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await connectDB.insertarDoc(db, collection, params);
  client.close();
  return res;
}

router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  // console.log("delete parametro id ",id);
  let resp ;
  if (req.params.length===0 || !id) {
    // console.log("Debe ingresar un id.");
    res.status(404).send("Debe ingresar un id.");
  }
  else
  {
    resp = await deleteAlumnoByID(collectionName, id);
    salidaDel(resp,res);// console.log("respuesta de eliminacion",resp);    
  }
  
});


function salidaDel(respuesta,res)
{
  // console.log("salida del ",respuesta);
  res.status(respuesta.Codigo).send(respuesta.Mensaje);
}

const deleteAlumnoByID = async (collection, id) => {
  // abrimos la conexión 
   let client = await connectDB.connect();
      const db = client.db(dbName);
      
  try{
    // console.log("preparando delete");
      const resp=await connectDB.deleteByID(db, collection, id);
      const salida= salir(resp,client);// console.log("respuesta delete",resp);
      return salida;
  }
  catch(err)
  {
    client.close();
    return{Codigo:500,Mensaje:"Error de eliminación."};
  }

  // finally{
   
  //   // console.log("respuesta final",resp);
  //    return salida;
  // }
  // let client = await connectDB.connect();
  //   const db = client.db(dbName);
  //     console.log("preparando delete");
  //   const resp=await connectDB.deleteByID(db, collection, id);
  //   console.log("respuesta delete",resp);
  //   client.close();
  //  return res;
}
// Completar el resto de los métodos
// router....
async function salir(respuesta,client)
{
  // console.log("salir: ",respuesta);
  client.close();
  return respuesta;

}

export default router;