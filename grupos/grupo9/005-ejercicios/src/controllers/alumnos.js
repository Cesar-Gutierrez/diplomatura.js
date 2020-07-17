import express from 'express';
import * as connectDB from '../utils/crud-mongo';
const router = express.Router();

const dbName = 'diplomatura';
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
  // TIP: En req.body viene los datos
/*   console.log("Esto tiene el body :", req.body);
  console.log("Esto tiene el query :", req.query); */
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



// Completar el resto de los métodos
// router....

export default router;
