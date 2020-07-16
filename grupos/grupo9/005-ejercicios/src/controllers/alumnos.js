import express from 'express';
import * as connectDB from '../utils/crud-mongo';
const router = express.Router();

const dbName = 'diplomaturajs';

router.get('/', async function (req, res) {
  const params = req.query;
  res.json(await getAlumnos('alumno', params));
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
    resp = await getAlumnoById('alumno', id);
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


router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

// Completar el resto de los métodos
// router....

export default router;
