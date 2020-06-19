import basededatos, { database } from './basededatos';
// import { helpers } from '../../../../../Repositorio_Grupo9/diplomatura.js/grupos/grupo9/002-ejercicios/src/helpers';

/**
 *1- Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {number} alumnoId el id del alumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  // console.log(basededatos.alumnos);
  var alumno=-1
  var colMateria=[]
  var materiaItemID
  var longitudCalificaciones
  var longitudMaterias
  var alumnoId

var longitudAlumnos = basededatos.alumnos.length

    for( var i=0; i<  longitudAlumnos;i++)
    {
        if(basededatos.alumnos[i].nombre===nombreAlumno)
        {
          //si existe el alumno
          alumno=0

          alumnoId= basededatos.alumnos[i].id

           longitudCalificaciones = basededatos.calificaciones.length;
            for (var j=0;j<longitudCalificaciones;j++)
            {
              if((basededatos.calificaciones[j].nota>=4 )&&(basededatos.calificaciones[j].alumno===alumnoId))
              {
                materiaItemID=  basededatos.calificaciones[j].materia
                longitudMaterias=basededatos.materias.length

                for(var k=0;k<longitudMaterias;k++)
                {
                    if(basededatos.materias[k].id===materiaItemID)
                    {
                        colMateria.push( basededatos.materias[k])
                    }
                }
              }
            }
        }
    }
    //no encontro el alumno
    if(alumno===-1)
    return

    if(colMateria.length!=0)
    {
   //quito materias duplicadas
    colMateria= new Set (colMateria)
    }

  return colMateria;

};

/**
 *2- Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */
export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {


  var longitudUniversidades=basededatos.universidades.length
  var universidadItem
  var universidadId
  var coleccionRetorno=[]
  var existeUniversidad = -1
  for(var i=0; i<longitudUniversidades;i++)
  {
    if(basededatos.universidades[i].nombre===nombreUniversidad)
    {
      existeUniversidad=0
      universidadItem=basededatos.universidades[i]
      universidadId=universidadItem.id
      // console.log("universidad encontrada:"+universidadId)
      break
    }

  }

  if(existeUniversidad===-1)
  return undefined

  var longitudMaterias= basededatos.materias.length
  var colMaterias= []
  var cantProf
  var colProfesoresID=[]
  var cantCalificaciones
  var colAlumnosID=[]
  var materiaItemID
  var colProfesoresIdTemp=[]
  for(var k=0; k<longitudMaterias;k++)
  {
    if(basededatos.materias[k].universidad===universidadId)
    {
      materiaItemID= basededatos.materias[k].id
      colMaterias.push(basededatos.materias[k])
      // console.log(basededatos.materias[k])
      colProfesoresIdTemp= basededatos.materias[k].profesores

      //busco profesores
       cantProf = colProfesoresIdTemp.length
      for(var j=0; j<cantProf;j++)
      {
        colProfesoresID.push(colProfesoresIdTemp[j])
      }
      //busco los alumnos
      cantCalificaciones= basededatos.calificaciones.length
      for(var r=0;r<cantCalificaciones;r++)
      {
        if(basededatos.calificaciones[r].materia===materiaItemID)
        {
            colAlumnosID.push(basededatos.calificaciones[r].alumno);
        }
      }

    }
  }


  coleccionRetorno.push(universidadItem)

  var colSetProfesoresID= new Set (colProfesoresID)
  var colSetAlumnosID = new Set (colAlumnosID)
  var cantProf= colSetProfesoresID.length
  var cantAlumn = colSetAlumnosID.length
  var cantProfBase= basededatos.profesores.length
  var cantAlumnBase= basededatos.alumnos.length


  // buscar materias
coleccionRetorno.push(colMaterias)

  //buscar profesores
  for(let i=0;i<cantProf;i++)
  {
    for(let j=0;j<cantProfBase;j++ )
    {
      if(basededatos.profesores[j]===colSetProfesoresID[i])
      {
        coleccionRetorno.push(basededatos.profesores[j]);
        // console.log(basededatos.profesores[j])
      }
    }
  }

  // busco alumnos
  for(let i=0;i<cantAlumn;i++)
  {
    for(let j=0;j<cantAlumnBase;j++ )
    {
      if(basededatos.alumnos[j]===colSetAlumnosID[i])
      {
        coleccionRetorno.push(basededatos.alumnos[j]);
        // console.log(basededatos.alumnos[j])
      }
    }
  }
  // console.log("coleccion de retorno \n")
  // console.log(coleccionRetorno)

  return coleccionRetorno;
};

// /**
//  *3- Devuelve el promedio de edad de los alumnos.
//  */
export const promedioDeEdad = () => {
  let promedio =promedioEdadAlumnos(database.alumnos);
  return promedio;
  } ;
//promedio la edad de la coleccion de alumnos colAlumnos
const promedioEdadAlumnos= (ColAlumnos)=>
 {
   let result=promedio(ColAlumnos,"edad");
  // console.log("result",result);
   return result;
 };

//dado un array busco el promedio de una propiedad con el valor mayor a a_valor,si es 0 toma a todos
  const promedio= (a_array,a_propierty)=>
  {    
    
    let iterador=0;
    let acumulador=0;
     a_array.forEach(element => {

      acumulador= acumulador+element[a_propierty];
      iterador++;

      });
      
      let resultado =iterador===0? 0: acumulador/iterador;
      
      return resultado;
};



// /**
//  * 4-Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
// export const alumnosConPromedioMayorA = (promedio) => {
//   return [];
// };

 export const alumnosConPromedioMayorA = (promedio) => {
  let alumnosPromedio=[];
  alumnosPromedio=basededatos.alumnos.filter((element)=> isAlumnoPromedioMayorA(element,promedio));

  return alumnosPromedio;
  };

  //devuelvo si el promedio del alumno a_alumno mayor al promedio a_valorPromedio
 const isAlumnoPromedioMayorA = (a_alumno,a_valorPromedio) => {  
  //genero el array con las calificaciones del alumno que necesito
  let colCalificacionesAlumn =[];
  colCalificacionesAlumn  = basededatos.calificaciones.filter(item=> item.alumno===a_alumno.id);
  // console.log("alumno:",a_alumno);
  //cuando no hayan calificaciones para ese alumno
  if(colCalificacionesAlumn.length===0)  
    return false;
  
  let  salida=isPromedioMayorA(colCalificacionesAlumn,"nota",a_valorPromedio);  
  // console.log(salida);
  return  salida;
};

//devuelvo  verifica si para los parametros indicados,el promedio es mayor a a_valorpromedio
const isPromedioMayorA= (a_array,a_propierty,a_valorPromedio)=>
{
 
  let prom= promedio(a_array,a_propierty);
  // console.log("prome:" ,prom);
  let salida=prom>a_valorPromedio;
 
   return  salida;
};
// /**
//  * 5-Devuelve la lista de materias sin alumnos
//  */
// export const materiasSinAlumnosAnotados = () => {
//   return [];
export const materiasSinAlumnosAnotados = () => {
  let  colMateriasVacias=[]  
  colMateriasVacias= basededatos.materias.filter((element)=> (!materiasVacias(element))    );
  // console.log("retorno colMateriasVacias:",colMateriasVacias);
  return colMateriasVacias;
};

//devuelve si la materia tiene inscriptos o no segun sus calificaciones
const materiasVacias= (aMateria) =>
{
  // console.log("Entro materias vacias ",aMateria);  
 let calificacion= basededatos.calificaciones.find((element)=> element.materia===aMateria.id);
  // console.log("retorno m:",m);
  return calificacion;
};
// /**
//  * 6-Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */
// export const promedioDeEdadByUniversidadId = (universidadId) => {
//   return [];
// };
// /* resolucion
// a) buscaruniversidad
// b) mapear por cada alumno alumnoCursaEnUniversidad(anAlumno,idUni)
// c) iterar por cada calificacion hasta, caliifacionDeMateriaInUniversidad(aCalificacion,idUni)
// d) buscar la materia de aCalificacion,si existe ver si pertenece a idUni 
//e) promediar el mapero generado en b)
 export const promedioDeEdadByUniversidadId = (universidadId) => {
//
  let alumnosEnUniversidadID=[]
  let universidadItem = helpers.findUniversidadByID(universidadId);
  
  if(!universidadItem)
  return 0

  alumnosEnUniversidadID= basededatos.alumnos.filter((anAlumno)=>  AlumnoCursaEnUniversidad(anAlumno,universidadId)  );

  let resultPromedio=promedioEdadAlumnos(alumnosEnUniversidadID);
  return resultPromedio;
};

const AlumnoCursaEnUniversidad= (anAlumno,universidadId) =>{
  // verfico si anAlumno cursa alguna materia en la universidad universidadId
  let recorrecalificaciones= 0;
  for(let aCalificacion of basededatos.calificaciones)
  {
    if(anAlumno.id===aCalificacion.alumno &&
       caliifacionDeMateriaInUniversidad(aCalificacion,universidadId))
    return true;  
  }
  return false;
};

const caliifacionDeMateriaInUniversidad= (aCalificacion,universidadId) =>
{//  busco si la materia a la que perternece la calificacion es de la universidad universidadId
  let materia= helpers.findMateriaByID(aCalificacion.materia);
  if(!materia)
  return false;

  return materia.universidad===universidadId;
};

const helpers=
{
    
    findUniversidadByID : (id)=> {return (helpers.findById("universidades")(id));},    
    findProfesorByID : (id)=> {return (helpers.findById("profesores")(id));},  
    findMateriaByID : (id)=> {return (helpers.findById("materias")(id));},    
    findById :(tabla) =>     { return   (id)=> { return helpers.findByPropierty(tabla,"id",id); };} ,    
  
    //busqueda generica 
    findByPropierty: (tabla,propierty,valor)=>{
        return database[tabla].find((element)=>element[propierty]===valor);},

  
    findLastID : (tabla) => {
        var cantidad = database[tabla].length;
        if(cantidad===0)
        return 0
        
        return database[tabla][cantidad-1].id;
    }
};