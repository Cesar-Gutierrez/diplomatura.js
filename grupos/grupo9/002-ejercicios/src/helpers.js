import { database } from './basededatos';
const helpers=
{
    findUniversidadByID : (id)=> {database.universidades.find(item=>item.id===id );},
    findProfesorByID : (id)=> {database.profesores.find(item=>item.id===id );},
    findMateriaByID : (id)=> {database.materias.find(item=>item.id===id );},
    findById :(tabla) =>     {   (id)=> {return database[tabla].find((item)=> item.id===id);}; },

    //ejercicio 7
    findLastID : (tabla) => {
        var cantidad = database[tabla].length;
        if(cantidad===0)
        return undefined

        return database[tabla][cantidad-1];
    }
};