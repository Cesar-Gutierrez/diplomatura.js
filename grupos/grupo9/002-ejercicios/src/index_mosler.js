// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './baseDeDatos';

// 2) Implementar una función que obtenga una universidad por Id
// 🤓 Tip: pueden ir probando las funciones usando console.log() asegurándose que los resultados sean los esperados
function getUniversidadById(id = 1){
    let universidad = database.universidades.find(universidad => universidad.id == id);
    if (typeof universidad  === 'undefined') universidad = {};
    console.log(universidad);
}

getUniversidadById(1);

// 3) Implementar una función que obtenga un profesor por Id

function getProfesorById(id = 1){
    let profesor = database.profesores.find(profesor => profesor.id == id);
    if (typeof profesor  === 'undefined') profesor = {};
    console.log(profesor);
}

getProfesorById(1);

// 4) Implementar una función que obtenga una materia por Id
// 🤓 Tip: Comparar con la función del ejercicio (3) y ver si se les ocurre una función genérica que sirva para cualquier tabla
function getDataById(table,id){
    let data = database[table].find(elem => elem.id == id);
    if (typeof data  === 'undefined') data = {};
    console.log(data);
}

getDataById('materias', 1);

// 5) Crear un objeto 'helpers' que contenga las funciones como métodos

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
