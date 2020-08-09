import React from 'react';
import { render } from 'react-dom';
// import datos from "../index/database";
import datos from "../datos";
import TodoItem from './TodoItem';
import { helpers } from '../helpers';
// import helpers from '../helpers';
// import { helpers } from '../helpers';

export default class TodoList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            coleccion:'alumnos'
            ,todos: datos.alumnos
            ,image:'estudiante.png'

        };
    }
    
  _remove(position){
    //   debo implementar el remove de colleccion
    let { data } = this.state.todos;
    
    let newData = [
      ...data.slice(0, position),
      ...data.slice(position + 1),
    ]

    this.setState({todos : newData });

  }
    render()
    {
        return ( 
        
            <ul>
                {
                    // datos[alumnos].maps(e=>{
                    // return <li>{e}</li>
                    // helpers.getColeccion('alumnos').maps(e=>{
                        // this.state.todos.map(e=>{
                         datos.alumnos.map((e)=>{
                        // console.log('elemneto e:',e);
                    return <TodoItem Key ={e.id} value={e}  onRemove={ () => this._remove(1)}/>;
                    // <ListItem key={number.toString()} value={number} />
                    // {(e.nombre)}/>;
                    //  {"Nombre:",e.nombre," Edad:",e.edad}/>;
                    
                    })

                    // {this.state.data.map(
                    //     (item,index) =>
                    //       <Item data={item} key={index} onRemove={ () => this._remove(index)}
                }
            </ul>
        ); 
          
    }
}

// function alumnoToString(e){
//     return ("Nombre: "+ e.nombre+" Edad: "+e.edad)
// }


// import React from "react";

// function ListItem(props) {
//   const color = props.selected === props.number ? "red" : "blue";
//   return (
//     <li key={props.number}>
//       <span onClick={props.onSelect} style={{ color }}>
//         {props.number}
//       </span>
//     </li>
//   );
// }

// // Componente funcional
// export default class Lista extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { numbers: [1, 2, 3, 4, 5], selected: 0 };
//   }

//   changeSelection = selected => {
//     console.log(selected);
//     if (this.state.selected === selected) {
//       selected = 0;
//     }
//     this.setState({ selected });
//   };

//   render() {
//     const { numbers } = this.state;
//     return (
//       <ul>
//         {numbers.map(number => (
//           <ListItem
//             number={number}
//             key={number}
//             selected={this.state.selected}
//             onSelect={() => this.changeSelection(number)}
//           />
//         ))}
//       </ul>
//     );
//   }
// }
