import React from "react";
import { helpers } from "../helpers";
import 'react-bulma-components/dist/react-bulma-components.min.css';
// import { Form } from  'react-bulma-components/dist';;
import { Button } from 'react-bulma-components/dist';
// import 'react-bulma-components/basic/react-bulma-components.min.css';
 
export default class FormAddAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      nombre: "",
      edad: 0,
    };
  }
// //sacar
//   onChangeNombre=(e)=> {
//     this.setState({ nombre: e.target.value, edad: this.state.edad });
//   }
//   // sacar
//   onChangeEdad=(e)=> {
//     this.setState({ nombre: this.state.nombre, edad: e.target.value });
//   }
  //este reemplaza a onchangeedad y onchangeNombre
  handleChange=({target})=>{
    const {name,value}=target
  this.setState({[name]:value});  
  }

  handleSubmit = e =>{
    e.preventDefault();
    console.log('prevenido');
    let id= (helpers.findLastID('alumnos')+1)
    console.log('el id nuevo es',id)
 
    const {nombre,edad}= this.state
    const newAlumno={id,nombre,edad}
    console.log('el nuevo alumno es ' , newAlumno)
    this.props.onAddAlumno(newAlumno);
  }

  render() {
    const {nombre,edad}=this.state
    return (
      <form on onSubmit = {this.handleSubmit}>
          <span className="lbl-AddAlumnoNombre">Nombre: </span>
          <input name ="nombre" onChange={this.handleChange} />
        {/* <input name ="nombre" value={nombre} onChange={this.onChangeNombre} /> */}
      {/* <input name ="nombre" onChange={this.handleChange} /> asi deberia ir en los dos  */}
        <span className="lbl-AddAlumnoedad">Edad: </span>
        {/* <input name ="apellido" value={edad} onChange={this.onChangeEdad} /> */}
        <input name ="edad" onChange={this.handleChange} />
        <input type= "submit" value="Agregar"/> 
        {/* <button className="btn-FormAddAlumno">Agregar</button> */}
      </form>
    );
  }
}
