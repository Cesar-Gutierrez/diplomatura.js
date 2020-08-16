import React from "react";
import "./App.css";
import datos from "./datos";
import ListadoAlumnos from "./components/ListadoAlumnos";
// import AddAlumno from "./components/AddAlumno";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import DetalleAlumno from "./components/DetalleAlumno";
import { helpers } from "./helpers";
// import 'react-bulma-components/dist/react-bulma-components.min.css';
// // import { Form } from  'react-bulma-components/dist';;
// import { Button } from 'react-bulma-components/dist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vistaActual: "",
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
    console.log("set de vista actual ", vista, idSeleccionado);
    const newState = { vistaActual: vista };
    if (idSeleccionado) {
      newState.idDetalleSeleccionado = idSeleccionado;
    } else {
      newState.idDetalleSeleccionado = -1;
    }
    this.setState(newState);

    console.log("estado vista actual ", this.state);
  }

  // mostrarVista = () => {
  //   return <div>TODO</div>;
  // };

  // setLista = () => {};

  cargarVista = () => {
    const { vistaActual, idDetalleSeleccionado, alumnos } = this.state;
    console.log(
      "carga vista,vista actual y iddetalle ",
      vistaActual,
      idDetalleSeleccionado
    );

    switch (vistaActual) {
      case "alumnos":
        if (idDetalleSeleccionado === -1)
          return (
            <ListadoAlumnos
              onMostrarDetalleAlumno={(id) => {
                this.handlerMostrarDetalleAlumno(id);
              }}
              data={alumnos}

              onEliminarAlumno={(id) => {
                this.handlerEliminarAlumno(id);
              }}
              
              onAddAlumno={(newAlumno) => {
                this.handlerAddAlumno(newAlumno);
              }}
            />
          );
        else {
          return (
            <DetalleAlumno
              value={helpers.findAlumnoByID(idDetalleSeleccionado)}
              onVolverListadoAlumno={() => this.handlerVolverListadoAlumno()}
            />
          );
        }
      case "profesores":
        return <></>;
      case "materias":
        return <></>;
      case "calificaciones":
        return <></>;
      case "":
        return <></>;
    }
  };

  cargarListadoAlumno = () => {
    // console.log("click cargar listado alumno");
    this.setVistaActual("alumnos", -1);
    // <Link to="/alumnos"></Link>;
  };
  cargarListadoProfesores = () => {
    this.setVistaActual("profesores", -1);
  };

  handlerMostrarDetalleAlumno = (id) => {
    console.log("lo que llega al handler detalle ,id:", id);
    this.setVistaActual("alumnos", id);
    // this.props.onMostrarDetalleAlumno()
    // this.cargarVista();
  };

  handlerEliminarAlumno = (id) => {
    console.log("lo que llega al handler eliminar,id:", id);
    this.setVistaActual("alumnos", id);
    // this.props.onMostrarDetalleAlumno()
    let alumno = helpers.findAlumnoByID(id);
    let position = this.state.alumnos.indexOf(alumno);
    const newAlumnos = [...this.state.alumnos];

    if (position !== -1) {
      newAlumnos.splice(position, 1);
    }

    this.setState({ alumnos: newAlumnos });
    // this.setVistaActual("alumnos", -1);
    this.cargarListadoAlumno();
  }

  handlerVolverListadoAlumno = () => {
    // this.setVistaActual("alumnos", -1);
    this.cargarListadoAlumno();
   };
  handlerAddAlumno = (newAlumno) => {

    console.log("llego al handler addalumno app",newAlumno);

    // const {alumnos}= this.state.alumnos;
    const {id,nombre,edad} = newAlumno
    // const ${id} = 
    const newAlumnos= [...this.state.alumnos,newAlumno];
    
    this.setState({ alumnos: newAlumnos });
    datos.alumnos=newAlumnos;
    this.cargarListadoAlumno();
    // console.log('alumnos se ve asi',alumnos)
    
    console.log('neWalumnos se ve asi',newAlumnos)
    
    console.log('datos.alumnos se ve asi',datos.alumnos)

    // this.cargarListadoAlumno();
    

  };

  render() {
  
    const { vistaActual } = this.state;

    // const vistaActual = mostrarVista;

    return (
      <Router>
        <div className="App">
          <header className="alert alert-info">Diplomatura JS</header>
          <div id="botonera">
            <button
              className="btn btn-outline-info"
              onClick={() => this.cargarListadoAlumno()}
            >
              <Link to="/alumnos">Alumnos</Link>
            </button>
            <button
              className="btn btn-outline-info"
              onClick={() => this.cargarListadoProfesores()}
            >
              <Link to="/profesores">Profesores</Link>
            </button>
            <button className="btn btn-outline-info">Materias</button>
            <button className="btn btn-outline-info">Calificaciones</button>
          </div>
          <h2>{vistaActual.toUpperCase()}</h2>
          <div>
            {/* <div className="mainView">vistaActual</div> */}
            {/* <div className="mainView">{this.setLista()}}</div> */}
            <div>{/* //deberia poner el addForm */}</div>
            <div>
              <div>{this.cargarVista()}</div>
            </div>
            <div>{/* <div>{ListadoAlumnos}</div> */}</div>
          </div>
        </div>


      </Router>
    );
  }

  // ReactDOM.render(<App />, document.getElementById("root"));
  // export default App;
}

export default App;
