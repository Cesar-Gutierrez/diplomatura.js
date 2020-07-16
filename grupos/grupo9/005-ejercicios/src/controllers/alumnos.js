import express from 'express';
import * as connectDB from '../utils/crud-mongo';
const router = express.Router();

const dbName = 'diplomaturajs';

router.get('/', async function (req, res) {
  // Completar
  const params = req.query;
  console.log(params);
  let resp = await getAlumnos('alumno', params);
  console.log("res: ", resp);
  //connectDB.disconnect(conec)
  res.json(resp);
});


const getAlumnos = async (collection, params) => {
  // abrimos la conexión
  let client = await connectDB.connect();
  const db = client.db(dbName);
  // hacemos la búsqueda en la colección alumno
  const res = connectDB.find(db, collection, params);
  client.close();
  return res;
}




router.get('/:id', function (req, res) {
  // Completar
  res.json({});
});

router.post('/', function (req, res) {
  // TIP: En req.body viene los datos

  // Completar
  res.json({});
});

// Completar el resto de los métodos
// router....

export default router;
