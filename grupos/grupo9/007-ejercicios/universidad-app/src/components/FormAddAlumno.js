import React from "react";

export default class FormAddAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      edad: "",
    };
  }
//sacar
  onChangeNombre=(e)=> {
    this.setState({ nombre: e.target.value, edad: this.state.edad });
  }
  // sacar
  onChangeEdad=(e)=> {
    this.setState({ nombre: this.state.nombre, edad: e.target.value });
  }
  //este reemplaza a onchangeedad y onchangeNombre
  handleChange=({target})=>{
    const {name,value}=target
  this.setState({[name]:value});
  }

  handleSubmit = e =>{
    e.preventDefault();
    console.log('prevenido');

    const {nombre,edad}= this.state
    const newAlumno={nombre,edad}
console.log('el nuevo alumno es ' , newAlumno)
    this.props.onAddAlumno(newAlumno);
  }

  render() {
    const {nombre,edad}=this.state
    return (
      <form on onSubmit = {this.handleSubmit}>
          <span className="lbl-AddAlumnoNombre">Nombre: </span>
        <input name ="nombre" value={nombre} onChange={this.onChangeNombre} />
      {/* <input name ="nombre" onChange={this.handleChange} /> asi deberia ir en los dos  */}
        <span className="lbl-AddAlumnoedad">Edad: </span>
        <input name ="apellido" value={edad} onChange={this.onChangeEdad} />

        <input type= "submit" value="Agregar"/> 
        {/* <button className="btn-FormAddAlumno">Agregar</button> */}
      </form>
    );
  }
}
