import React from "react";
import "./App.css";
import datos from "./datos";
import TodoList from "./components/TodoList";
import AddAlumno from "./components/AddAlumno";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActual: "alumnos ",
      idDetalleSeleccionado: 1,
      alumnos: datos.alumnos,
      profesores: datos.profesores,
      materias: datos.materias,
      calificaciones: datos.calificaciones,
    };
  }
  /**
   * Se utiliza para disparar el cambio de vista.
   * Si viene un id seleccionado, se setea como el detalle actual.
   * @param {*} vista
   * @param {*} idSeleccionado
   */
  setVistaActual(vista, idSeleccionado) {
    const newState = { vistaActual: vista };
    if (idSeleccionado) {
      newState.idDetalleSeleccionado = idSeleccionado;
    } else {
      newState.idDetalleSeleccionado = -1;
    }
    this.setState(newState);
  }
  render() {
    // const vistaActual = <div>setVistaActual('alumnos',1)</div>;
    const vistaActual = <div>TODO </div>;
    return (
      <div className="App">
        <header className="alert alert-info">Diplomatura JS</header>
        <div id="botonera">
          <button className="btn btn-outline-info">Alumnos</button>
          <button className="btn btn-outline-info">Profesores</button>
          <button className="btn btn-outline-info">Materias</button>
          <button className="btn btn-outline-info">Calificaciones</button>
        </div>
        <h2>{this.state.vistaActual}</h2>
        <div>
          <div className="mainView">{vistaActual}</div>
          <div>{/* //deberia poner el addForm */}</div>
          <div>
           
            <div>{<TodoList />}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
