import React from 'react';
import './App.css';
import datos from './datos';
import AlumnosList from './AlumnosList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActual: 'alumnos',
      idDetalleSeleccionado: -1,
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

   vistaIndex(vista){
    let component;

    switch(vista){
      case 'alumnos':
        component = <AlumnosList  data = { this.state.alumnos }/>;
    }
    return component;
  }



  render() {
    const vistaActual = <div>ToDo</div>;
    return (
      <div className="App">
        <header className="alert alert-info">Diplomatura JS</header>
        <div id="botonera">
          <button className="btn btn-outline-info" onClick={ () => this.setVistaActual('alumnos', -1) }>Alumnos</button>
          <button className="btn btn-outline-info" onClick={ () => this.setVistaActual('profesores', -1) }>Profesores</button>
          <button className="btn btn-outline-info" onClick={ () => this.setVistaActual('materias', -1) }>Materias</button>
          <button className="btn btn-outline-info" onClick={ () => this.setVistaActual('calificaciones', -1) }>Calificaciones</button>
        </div>
        <h2>Listado {this.state.vistaActual}</h2>
        <div className="container">
          <div className = 'col-lg-12'>
            {this.vistaIndex(this.state.vistaActual)}
          </div>
          </div>
      </div>
    );
  }
}

export default App;
