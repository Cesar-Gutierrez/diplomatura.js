import express from 'express';
import * as connectDB from '../utils/crud-mongo';
import { helpers } from '../utils/helpers';
import { getAlumnoById } from './alumnos';
import { getMateriaById } from './materias';
// import { helpers } from '../utils/helpers';
const router = express.Router();

// methodOverride = require("method-override");--permite implementar y personalizar métodos HTTP.
// bodyParser  = require("body-parser");
// app.use(bodyParser.json());

const dbName = 'Db_Diplomatura';
const collectionName = 'calificaciones';
const singleName = 'Calificacion';

// router.get('/', async function (req, res) {
//   const params = req.query;
//   res.json(await getCalificaciones(params));
// });
router.get('/',async (req,res)=>connectDB.endPointGet(req,res,dbName ,collectionName));

// router.get('/:id', async function (req, res) {
//   const id = req.params.id;
//   let resp = {};
//   if (id) {
//     resp = await getCalificacionById(id);
//   }
//   res.json(resp);
// });
router.get('/:id',async (req,res)=>connectDB.endPointGetByID(req,res,dbName ,collectionName));

// router.post('/', async function (req, res) {
//   // TIP: En req.body viene los datoss
//   /*   console.log("Esto tiene el body :", req.body);
//   console.log("Esto tiene el query :", req.query); */
//   let resp;
//   let message;
//   //let message;return;
//   // console.log('entrada al post');
//   if (req.body && Object.keys(req.body).length !== 0) {
//     // console.log('req.body: ', req.body);
//     resp = await insertarCalificacion(req.body);
//     // helpers.mostrarsalidaInsert(resp);
//     if (!resp.ops) {
//       //   message = 'Error no se pudo insertar el elemento ';
//       // console.log('error de insercion', resp);
//       res.status(500).send(resp.Mensaje);
//     } else {
//       // console.log('salida correcta insertar ', resp.ops);
//       const calificacion = resp.ops;
//       res.status(200).send(calificacion);
//     }
//   } else {
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
//   } else {
//     resp = await deleteCalificacionByID(id);
//     helpers.salidaDel(resp, res); // console.log("respuesta de eliminacion",resp);
//   }
// });

router.delete('/:id',async (req,res)=>connectDB.endPointDeleteByID(req,res,dbName ,collectionName));

router.put('/:id', async function (req, res) {
  const id = req.params.id;
  let resp = {};
  if (id && req.body && Object.keys(req.body).length !== 0) {
    resp = await updateCalificacionByID(id, req.body);
    // console.log('vuelta del update', resp);
    if (resp.Codigo === 200) {
      res.status(resp.Codigo).send(resp.Result);
    } else {
      res.status(resp.Codigo).send(resp.Mensaje);
    }
  } else {
    res.status(400).send({Mensaje: 'No se actualizado el elemento: no se recibieron datos'});
  }
});

const getCalificaciones = async (params) => {return connectDB.getColeccion(dbName, collectionName, params);};
const getCalificacionById = async (id) => {return connectDB.getById(dbName, collectionName, id);};
const deleteCalificacionByID = async (id) => {  return connectDB.deleteElementByID(dbName, collectionName, id);};

const insertarCalificacion = async (params) => {
  
  if (!params.nota || (params.nota && params.nota < 0))
    return { Codigo: 400, Mensaje: 'Debe ingresar una nota valida.' };

  const validacion = await validacionCalificacionesParams(params, true);
  
  if (validacion.Codigo !== 0) {  
    return validacion;
  } else return connectDB.insertarElemento(dbName, collectionName, params);
};

const validacionCalificacionesParams = async (params, validoTodo) => {  
  let materiaValidada = false;
  let alumnoValidado = false;

  if ((!params.materia || !validoTodo) && params.materia && validoTodo) {    
    return { Codigo: 400, Mensaje: 'Error:Debe ingresar id materia.' };
  }

  if ((!params.alumno || !validoTodo) && params.alumno && validoTodo)
    return { Codigo: 400, Mensaje: 'Error:Debe ingresar id alumno.' };

  if (params.alumno) {
    const alumnoResult = await validacionParametroCalificacion(
      'alumnos',
      params.alumno
    ); //await getAlumnoById(params.alumno);

    if (alumnoResult.Codigo === 400) {      
      return alumnoResult;
    } else alumnoValidado = true;
  }
  if (params.materia) {
    const materiaResult = await validacionParametroCalificacion(
      'materias',
      params.materia
    ); //await getAlumnoById(params.alumno);

    if (materiaResult.Codigo === 400) {
      
      return materiaResult;
    } else materiaValidada = true;
  }

  if (
    (!validoTodo || (params.materia && materiaValidada)) &&    (validoTodo || true) &&
    (!validoTodo || (params.alumno && alumnoValidado)) &&    (validoTodo || true)
  )
  {   
    return { Codigo: 0, Mensaje: 'validación exitosa' };
  } else {  
    return { Codigo: 500, Mensaje: 'No se pudo validar materia y/o alumno' };
  }
};

const updateCalificacionByID = async (id, element) => {
  
  const validacion = await validacionCalificacionesParams(element, false);
  
  if (validacion.Codigo !== 0) {  
    return validacion;
  } else
    return connectDB.updateElementByID(dbName, collectionName, id, element);
};

const validacionParametroCalificacion = async (Coleccion, idElemento) => {  
  const elemento = await connectDB.getById(dbName, Coleccion, idElemento);  
  if (!elemento) {
    return {
      Codigo: 400,
      Mensaje: `Error: Elemento inexistente en ${Coleccion}.`,
    };
  } else return { Codigo: 0, Mensaje: `Elemento verificador en ${Coleccion}.` };
};

export default router;
