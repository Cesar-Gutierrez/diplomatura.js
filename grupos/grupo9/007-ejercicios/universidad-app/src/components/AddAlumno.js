import React from "react";

export default class AddAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      edad: "",
    };
  }

  onChangeNombre=(e)=> {
    this.setState({ nombre: e.target.value, edad: this.state.edad });
  }
  onChangeEdad=(e)=> {
    this.setState({ nombre: this.state.nombre, edad: e.target.value });
  }

  render() {
    return (
      <div>
          <span className="lbl-AddAlumnoNombre">Nombre: </span>
        <input value={this.state.nombre} onChange={this.onChangeNombre} />
        <span className="lbl-AddAlumnoedad">Nombre: </span>
        <input value={this.state.edad} onChange={this.onChangeEdad} />

        <button className="btn-FormAddAlumno">Agregar</button>
      </div>
    );
  }
}
