// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './basededatos';
import {helpersss} from './helpers'
// // 2) Implementar una función que obtenga una universidad por Id
// // 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados

// const findUniversidadByID = (id)=> {database.universidades.find(item=>item.id===id )}
// // 3) Implementar una función que obtenga un profesor por Id
// const findProfesorByID = (id)=> {database.profesores.find(item=>item.id===id );};
// // 4) Implementar una función que obtenga una materia por Id
// const findMateriaByID = (id)=> {database.materias.find(item=>item.id===id )};
// // 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
// const findById = (tabla) => 
// {
//     (id)=> {return database[tabla].find((item)=> item.id===id)};
// }; 
// // findById("materias")(2)
// // 5) Crear un objeto 'helpers' que contenga las funciones como métodos
// const helpers=
// {

//     findUniversidadByID : (id)=> {database.universidades.find(item=>item.id===id );},
//     findProfesorByID : (id)=> {database.profesores.find(item=>item.id===id );},
//     findMateriaByID : (id)=> {database.materias.find(item=>item.id===id );},
//     findById :(tabla) =>     {   (id)=> {return database[tabla].find((item)=> item.id===id);}; }
// };

console.log(findUniversidadByID(1));


// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla

// 8) Importar helpers desde su propio módulo

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper

// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres

// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...

// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas
