import React from 'react';
import datos from "../datos";

export default class Profesores extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            coleccion:'Profesores'
            ,todos: datos.profesores
            ,image:'profesores.png'

        };
    }

    render()
    {
        return ( 
            <> 
            <AddAlumno />
            <ul>
                {
                    // datos[alumnos].maps(e=>{
                    // return <li>{e}</li>
                    // helpers.getColeccion('alumnos').maps(e=>{
                    // this.state.todos.map(e=>{
                    datos.alumnos.map((e)=>{
                    // console.log('elemneto e:',e);
                    return <TodoItem Key ={e.id} value={e} 
                    borrarAlumno= {this.borrarAlumno}
                    onRemove={ () => this._remove(1)}/>;
                    // <ListItem key={number.toString()} value={number} />
                    // {(e.nombre)}/>;
                    //  {"Nombre:",e.nombre," Edad:",e.edad}/>;
                    })
                    // {this.state.data.map(
                    //     (item,index) =>
                    //       <Item data={item} key={index} onRemove={ () => this._remove(index)}
                }
            </ul>
            </>
        ); 
          
    }
}