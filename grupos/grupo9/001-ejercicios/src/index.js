import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  promedioDeEdad,
  alumnosConPromedioMayorA,
  materiasSinAlumnosAnotados
  ,promedioDeEdadByUniversidadId
} from './moduloEjercicios';

import baseDeDatos from './basededatos';

// materiasAprobadasByNombreAlumno
console.log('-----------------------1-------------------------------');
console.log('Ejecutando ejercicios materiasAprobadasByNombreAlumno.');

const materiasAprobadasPorSuzana = materiasAprobadasByNombreAlumno(
  'Suzana Mendez'
);
console.log('Materias aprobadas por Suzana:', materiasAprobadasPorSuzana);

const materiasAprobadasPorAlina = materiasAprobadasByNombreAlumno(
  'Alina Robles'
);
console.log('Materias aprobadas por Alina:', materiasAprobadasPorAlina);

// expandirInfoUniversidadByNombre
console.log('-------------------------2-----------------------------');
console.log('Ejecutando ejercicios expandirInfoUniversidadByNombre.');

const infoUniversidadComahue = expandirInfoUniversidadByNombre(
  'Universidad del Comahue'
);
console.log('Info comahue:', infoUniversidadComahue);

const infoUniversidadRio = expandirInfoUniversidadByNombre(
  'Universidad de Rio Negro'
);
console.log('Info rio negro:', infoUniversidadRio);

//pruebas,no estaban en el index
console.log('-----------------------3-------------------------------');
console.log('****Promedio de edad de  alumno:***');
const promedioAlumno = promedioDeEdad();
console.log('Promedio de edad por alumno:', promedioAlumno);


console.log('-----------------------4-------------------------------');
const promedioAlumnoMayorA4 = alumnosConPromedioMayorA(4);
console.log('Nota promedio  por alumno (4):', promedioAlumnoMayorA4);

const promedioAlumnoMayorA5 = alumnosConPromedioMayorA(5);
console.log('Nota promedio  por alumno (5):', promedioAlumnoMayorA5);

const promedioAlumnoMayorA6 = alumnosConPromedioMayorA(6);
console.log('Nota promedio  por alumno (6):', promedioAlumnoMayorA6);

console.log('-----------------------5-------------------------------');
const materiasSinAlumnos = materiasSinAlumnosAnotados();
console.log('Materias sin incripciones:', materiasSinAlumnos);


console.log('-----------------------6-------------------------------');
const promEdadByUni1 = promedioDeEdadByUniversidadId(1);
console.log('Edad promedio universidad (1):',  promEdadByUni1);


const promEdadByUni2 = promedioDeEdadByUniversidadId(2);
console.log('Edad promedio universidad (2):',  promEdadByUni2);

const promEdadByUni3 = promedioDeEdadByUniversidadId(3);
console.log('Edad promedio universidad (3):',  promEdadByUni3);