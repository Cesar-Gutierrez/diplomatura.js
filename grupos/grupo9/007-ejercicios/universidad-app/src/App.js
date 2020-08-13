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

  mostrarVista = () => {
    return <div>TODO</div>;
  };

  setLista = () => {};

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
    this.setVistaActual("alumnos", -1);
  };

  handlerVolverListadoAlumno = () => {
    this.setVistaActual("alumnos", -1);
  };

  handlerAddAlumno = (newAlumno) => {
    const {alumnos}= datos.alumnos;
    const newAlumnos= {...alumnos,newAlumno};
    datos.alumnos=newAlumnos;




  };

  render() {
    // const vistaActual = <div>setVistaActual('alumnos',1)</div>;
    //hacer switch
    // if(alumnos)
    // if(profesores)
    // if(materias)
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
          <h2>{vistaActual}</h2>
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

        {/* //      <Switch>
    //       <Route path="/alumnos">
    //         <></>
    //       </Route>
    //       <Route path="/profesores">
    //         <></>
    //       </Route> 
    //        <Route path="/dynamic/:id" component={DynamicParams} />
    //       <Route path="/">
    //         <Home />
    //       </Route>
    // <Redirect path="/" />
    //   </Switch>  */}
      </Router>
    );
  }

  // ReactDOM.render(<App />, document.getElementById("root"));
  // export default App;
}

export default App;
