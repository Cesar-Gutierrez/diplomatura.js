import { database } from './basededatos';
// helpers.findUniversidadByID = (id)=> {database.universidades.find(item=>item.id===id );};
//Ejercicio 5
export const helpers=
{
    // ejercicio 2)
    findUniversidadByID : (id)=> {return (helpers.findById("universidades")(id));},
    // ejercicio 3
    findProfesorByID : (id)=> {return (helpers.findById("profesores")(id));},
    //  Ejercicio 4 
    findMateriaByID : (id)=> {return (helpers.findById("materias")(id));},
    // Retorna una funcion con el parametro tabla cargado, esta funcion usa id para su busqueda// findById("universidad")(1)
    findById :(tabla) =>{ return   (id)=> { return helpers.findByPropierty(tabla,"id",id); };} ,
    
    findAlumnoByID : (id)=> {return (helpers.findById("alumno")(id));},

    findByPropierty: (tabla,propierty,valor)=>{
        return database[tabla].find((element)=>element[propierty]===valor);},

    //ejercicio 7
    findLastID : (tabla) => {
        let cantidad = database[tabla].length;
        if(cantidad===0)
        return 0
        
        return database[tabla][cantidad-1].id;
    }
};