// 1) Importar el objeto 'database' del archivo "./basededatos"
import { database } from './basededatos';
import { helpers } from './helpers';
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

console.log(helpers.findUniversidadByID(1));
console.log("busco profesor por id(1) ", helpers.findProfesorByID(1));
console.log("busco materia por id (1)", helpers.findMateriaByID(1));
console.log("busco tabla por id (universidad===1)", helpers.findById("universidades")(1));
console.log("ultima universidad ", helpers.findLastID("universidades"));
console.log("busco provincia por propiedad- nombre-Neuquen", helpers.findByPropierty("provincias", "nombre", "Neuquen"));




// 6) Mover helpers y el todo el co´digo a un módulo, creando un nuevo archivo helpers.js

// 7) Crear un nuevo método en helpers que devuelva el último ID utilizado en una tabla

// 8) Importar helpers desde su propio módulo

// 9) Implementar una función que permite insertar una nueva provincia en la base de datos
//    La función tomará como parámetro el nombre de la provincia y devolverá el ID de la nueva provincia
// 🤓 Tip: Reusar una o más funciones de helper


// ,

//ejercicio 9
const insertProvincia = (nombreProvincia) => {
    //verifico que exista la provincia    
    let existeProvincia = helpers.findByPropierty("provincias", "nombre", nombreProvincia);

    if (!existeProvincia) {
        let ultimaPosicion = helpers.findLastID("provincias");
        let idNew = ultimaPosicion + 1;
        let itemNew = { id: idNew, nombre: nombreProvincia };
        database.provincias.push(itemNew);
        return idNew;
    }
    //En el caso de que la provincia con ese nombre exista    id=-1  
    console.log("esta provincia ya existe.\n");
    return -1;

};
//pruebas 
console.log("--------------------9------------------------");
let idProv = insertProvincia("Mendoza")
console.log("insertar provincia :", idProv, "\n");
console.log(database.provincias[idProv - 1], "\n");
console.log("insertar provincia Neuquen", insertProvincia("Neuquen"), "\n");
// 10) Implementar una función que reciba el id de una materia y devuelva la materia son los ids de universidad y profesores resueltos a sus nombres

const extenderMateriaANombres = (idMateria) => {
    //verifico que exista materia
    let materia = helpers.findMateriaByID(idMateria);
    if (!materia) {
        console.log("La materia con ese id no existe.");
        return
    }

    let universidad = helpers.findUniversidadByID(materia.universidad);
    if (!universidad) {
        console.log("No existe la universidad que tiene cargada la materia,id Universidad=", materia.universidad);
        return;
    }
    let nombreUniversidad = universidad.nombre;
    let profesoresPorNombre = materia.profesores.map((Element) => {
        let profesor = (helpers.findProfesorByID(Element))
        if (!profesor)
            return "No existe profesor con id:" + Element;

        return profesor.nombre
    });

    let materiaExtendida = {
        id: materia.id,
        nombre: materia.nombre,
        profesores: profesoresPorNombre,
        universidad: nombreUniversidad
    };
    // console.log(materiaExtendida);                   
    return materiaExtendida
};
console.log("--------------------10------------------------");
console.log("extender materia por nombres: \n");
console.log(extenderMateriaANombres(1));
// 11) Implementar una función que muestre en consola la información para todos los alumnos de la siguiente manera:
// NOTAS DE ALUMNOS
// ----------------
// RIGOBERTO MANCHU        <-- En mayúsculas
// Análisis matemático: 5
// ....
// ALUMNO 2
// ...

const listarAlumnosCalificaciones = () => {

    console.log("NOTAS DE ALUMNOS ");;
    console.log("-----------------\n");
    let  listadoAlumnosCalificaciones = database.alumnos.map(anAlumno => mostrarAlumno(anAlumno));
    //  console.log("listadoAlumnosCalificaciones:",listadoAlumnosCalificaciones);
};

const mostrarAlumno = (anAlumno) => {
    let ColCalificacionesByAlumno = database.calificaciones.filter(
        (aCalificacion) => aCalificacion.alumno === anAlumno.id);

    let nameUpper = (anAlumno.nombre).toUpperCase();
    console.log(nameUpper);

    if (ColCalificacionesByAlumno.length === 0) {
        console.log("El alumno no se ha inscripto a ninguna materia");
        return { name: nameUpper };
    }

    let listadoMateriasNota = ColCalificacionesByAlumno.map((aCalificacion) =>
        BuscarMateriaByCalificacion(aCalificacion));
    // console.log(listadoMateriasNota);
    console.log("\n");
    return { name: nameUpper, materias: listadoMateriasNota };
};


const BuscarMateriaByCalificacion = (aCalificacion) => {
    let nombreMateriaCalificacion = (helpers.findMateriaByID(aCalificacion.materia)).nombre;
    nombreMateriaCalificacion += ": " + aCalificacion.nota;
    console.log(nombreMateriaCalificacion);

    return nombreMateriaCalificacion;
};
console.log("--------------------11------------------------");
listarAlumnosCalificaciones();
// 12) Implementar una función que guarde la calificación de un alumno y una materia
//     La función recibirá: 'nombre del alumno', 'nombre de la materia', 'nota'
//     Si el alumno y/o la materia no existen deberán crearlos en sus respectivas tablas

const insertarCalificacion = (nombreAlumno, nombreMateria, aNota) => {

    // ///a) controla si existe la materia y el alumno,insertar caso contrario
    // //b) verificar calificacion si existe o no he insertarla
    // //c)insertar calificacion

    let alumnoItem = insertarAlumnoByNombre(nombreAlumno);
    let materiaItem = insertarMateriaByNombre(nombreMateria);
    let calificacion = { alumno: alumnoItem.id, materia: materiaItem.id, nota: aNota };
    database.calificaciones.push(calificacion);

    return calificacion;
};

const insertarAlumnoByNombre = (nombreAlumno) => {
    //siempre inserto a un nuevo alumno,porque el nombre no me alcanza para identificarlo
    let alumnoId;
    let alumnoNuevo;
    //busco el ultimo id de la tabla alumnos
    alumnoId = (helpers.findLastID("alumnos")) + 1;
    alumnoNuevo = { id: alumnoId, nombre: nombreAlumno };
    database.alumnos.push(alumnoNuevo);
    console.log("mostrar Alumno creado:",alumnoNuevo);

    return alumnoNuevo;
};
const insertarMateriaByNombre = (nombreMateria) => {
    let materiasByNombre = database.materias.filter((aMateria) => aMateria.nombre === nombreMateria);
    let cantidadMaterias = (materiasByNombre)?materiasByNombre.length:0;
    let materia;
    let idMateria;
    switch (cantidadMaterias) {
        case 1:
            materia = materiasByNombre[0];
            break;

        default:
            //   si existe mas de una materia con ese nombre o no existe,creo la materia pues, partiendo de que 
            //   solo el nombre no basta para identificar si es unica o no,debido a que puede pertener a universidades diferentes por ejemplo
            materia = crearMateriaByNombre(nombreMateria);
            break;
    }

    return materia;
};

const crearMateriaByNombre = (nombreMateria) => {
    let materiaId = (helpers.findLastID("materias")) + 1;
    let materiaNueva = { id: materiaId, nombre: nombreMateria };
    database.materias.push(materiaNueva);
    console.log("mostrar materia creada",materiaNueva);

    return materiaNueva;
};
console.log("--------------------12------------------------");

console.log("inserto calificacion: (luis) (analisis analizados)(7)");
let nuevaCalificacion=insertarCalificacion("luis","analisis analizados",7);

console.log("inserto calificacion: (luis) (analisis analizados)(8)");
let nuevaCalificacion2=insertarCalificacion("luis","analisis analizados",8);

console.log("inserto calificacion: (luis) (analisis analizados)(9)");
let nuevaCalificacion3=insertarCalificacion("luis","analisis analizados",9);

console.log("mostrar calificaciones :",database.calificaciones);