import React from "react";

export default class AddProfesores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      
    };
  } 

  onChangeNombre=(e)=> {
    this.setState({ nombre: e.target.value});
  }

  render() {
    return (
      <div>
          <span className="lbl-AddProfesorNombre">Nombre: </span>
        <input value={this.state.nombre} onChange={this.onChangeNombre} />
       

        <button className="btn-FormAddProfesor">Agregar</button>
      </div>
    );
  }
}
