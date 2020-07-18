import express from 'express';
import * as connectDB from '../utils/crud-mongo';
const router = express.Router();

const dbName = 'diplomaturajs';
const collectionName = 'alumno';
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
    if (resp) {
      res.json(resp);
    }
    else {
      res.status(404).send({ mensaje: "Elemento no encontrado" })
    }
  }

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
  let resp;
  let message;
  //let message;return;
  if (req.body && Object.keys(req.body).length !== 0) {
    resp = await insertarAlumno(collectionName, req.body);
    message = `${singleName} insertado con éxito`;
  } else {
    message = `${singleName} no insertado: no se recibieron datos`;
  }
  //res.json('producto insertado');
  //console.log(message)
  res.status(200).send({ message })
});

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
  let resp;
  if (req.params.length === 0 || !id) {
    res.status(404).send("Debe ingresar un id.");
  }
  else {
    resp = await deleteAlumnoByID(collectionName, id);

    res.status(resp.codigo).send(resp.mensaje); //  salidaDel(resp, res);
  }
});

// function salidaDel(respuesta, res) {
//   res.status(respuesta.codigo).send(respuesta.mensaje);
// }

const deleteAlumnoByID = async (collection, id) => {
  // abrimos la conexión 
  let client = await connectDB.connect();
  const db = client.db(dbName);
  const resp = await connectDB.deleteByID(db, collection, id);
  client.close();
  return resp;
  // try {
  //   const resp = await connectDB.deleteByID(db, collection, id);
  //   //const salida = salir(resp, client);// console.log("respuesta delete",resp);
  //   client.close();
  //   return resp;
  // }
  // catch (err) {
  //   client.close();
  //   return { codigo: 500, mensaje: "Error de eliminación." };
  // }
}

// async function salir(respuesta, client) {
//   // console.log("salir: ",respuesta);
//   client.close();
//   return respuesta;

// }
router.put('/:id', async function (req, res) {
  const id = req.params.id;
  let resp = {};
  if (id && req.body && Object.keys(req.body).length !== 0) {
    resp = await updateAlumno(collectionName, id, req.body);
    if (resp.codigo === 200) {
      res.status(resp.codigo).send(resp.result);
    }
    else {
      res.status(resp.codigo).send(resp.mensaje);
    }
  } else {
    res.status(400).send({ mensaje: "No se actualizado el elemento: no se recibieron datos" })
  }
});

const updateAlumno = async (collection, id, alumno) => {
  // abrimos la conexión
  let client = await connectDB.connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = await connectDB.updateDoc(db, collection, id, alumno);
  client.close();
  return res;
}

// Completar el resto de los métodos
// router....

export default router;
