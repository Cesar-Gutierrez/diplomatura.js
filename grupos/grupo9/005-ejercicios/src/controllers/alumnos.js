import express from 'express';
import * as connectDB from '../utils/crud-mongo';
import { helpers } from '../utils/helpers';
// import { helpers } from '../utils/helpers';
const router = express.Router();

// methodOverride = require("method-override");--permite implementar y personalizar métodos HTTP.
// bodyParser  = require("body-parser");
// app.use(bodyParser.json());

const dbName = 'Db_Diplomatura';
const collectionName = 'alumnos';
const singleName = 'Alumno';

// router.get('/', async function (req, res) {
//   const params = req.query;
//   res.json(await  getAlumnos( params));
// });
router.get('/',async (req,res)=>connectDB.endPointGet(req,res,dbName ,collectionName));

// // router.get('/:id', async function (req, res) {
// //   const id = req.params.id;
// //   let resp = {};
// //   if (id) {
// //     resp = await getAlumnoById(id);
// //   }
// //   res.json(resp);
// // });
router.get('/:id',async (req,res)=>connectDB.endPointGetByID(req,res,dbName ,collectionName));



// router.post('/', async function (req, res) {
//   // TIP: En req.body viene los datoss
//   /*   console.log("Esto tiene el body :", req.body);
//   console.log("Esto tiene el query :", req.query); */
//   let resp;
//   let message;
//   //let message;return;
//   if (req.body && Object.keys(req.body).length !== 0) {  
//     console.log("req.body: ",req.body);
//     resp = await insertarAlumno( req.body);
//     // helpers.mostrarsalidaInsert(resp);
//     if ( !resp.ops) {
//       message = 'Error no se pudo insertar el elemento ';
//       res.status(500).send({ message });
//     }
//      else
//      {
//        console.log("salida correcta insertar ",resp.ops);
//        const alumno=resp.ops;
//        res.status(200).send(alumno);
//       }
//   } 
//   else {
//     message = `${singleName} no insertado: no se recibieron datos`;
//     res.status(500).send({ message });
//   }
// });

router.post('/',async (req,res)=>connectDB.endPointPost(req,res,dbName ,collectionName));

// router.delete('/:id', async function (req, res) {
//   const id = req.params.id;
//   // console.log("delete parametro id ",id);
//   let resp;
//   if (req.params.length === 0 || !id) {
//     // console.log("Debe ingresar un id.");
//     res.status(404).send('Debe ingresar un id.');
//   } else 
//   {
//     resp = await deleteAlumnoByID( id);
  
//     helpers.salidaDel(resp, res); // console.log("respuesta de eliminacion",resp);
//   }
// });

router.delete('/:id',async (req,res)=>connectDB.endPointDeleteByID(req,res,dbName ,collectionName));


router.put('/:id', async function (req, res) {
  const id = req.params.id;
  let resp = {};
  if (id && req.body && Object.keys(req.body).length !== 0) {
    resp = await updateAlumnoByID( id, req.body);
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

// const getAlumnos = async (params)=>{return connectDB.getColeccion(dbName,collectionName,params)};
export const getAlumnoById =async  (id)=> {return connectDB.getById(dbName,collectionName,id);};
const insertarAlumno = async (params)=>{return connectDB.insertarElemento(dbName,collectionName,params)};
const deleteAlumnoByID = async (id)=>{return connectDB.deleteElementByID(dbName,collectionName,id)}; 
const updateAlumnoByID = async (id,element)=>{return connectDB.updateElementByID(dbName,collectionName,id,element)};





export default router;
