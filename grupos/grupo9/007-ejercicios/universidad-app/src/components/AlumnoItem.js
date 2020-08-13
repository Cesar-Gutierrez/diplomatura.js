import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

// import { render } from "react-dom";
// import datos from "../datos";

export default class AlumnoItem extends React.Component {
  _remove = () => {
    if (this.props.onRemove) this.props.onRemove();
  };

  handlerCargarDetalleAlumno = () => {
    console.log(
      "llamo al mostrar detalle desde alumno item con id:",
      this.props.value.id
    );
    this.props.onMostrarDetalleAlumno(this.props.value.id);
  };

  handlerEliminarAlumno = () => {
    this.props.onEliminarAlumno(this.props.value.id);
  };

  render() {
    // console.log("props alumno item", this.props);
    const { id, nombre } = this.props.value;
    return (
      <Router>
        <li>
          {/* <div className="icon" >
					<img src={require(`../images/estudiante.png`)} style={{width:"5rem" }} alt="estudiante" />
				</div> */}
          <div className="itemDescription">
            {/* <span className="item-idLabel">ID: </span>
					<span className="item-edad">{this.props.value.id}</span> */}
            <span className="item-nameLabel">Nombre: </span>
            <span className="item-name">{nombre}</span>
            {/* <span className="item-edadLabel">Edad: </span>
					<span className="item-edad">{this.props.value.edad}</span> */}
          </div>

          <button
            className="detalle-Alumno"
            onClick={() => this.handlerCargarDetalleAlumno()}
          >
            <Link to={`/alumnos/${id}`}> Detalle</Link>
            {/* <i className="alumno-Detalle">Detalle</i> */}
          </button>
          <button
            className="removeAlumno"
            onClick={() => this.handlerEliminarAlumno()}
          >
            <i className="alumno-Eliminar">Eliminar</i>
          </button>
          {/* <button className="remove" onClick={this._remove(this)}>
					<i className="material-icons">close</i>
				</button> */}
        </li>
      </Router>
    );
  }
  //   return (
  //     <div>
  //       <div style="float:left; width:70%">
  //         <h5> {props.elemento}</h5>
  //       </div>
  //       <div style="float:right; width:30%">
  //         <button onClick={() => {}}>Delete</button>
  //         {/* <button className="remove" onClick={()=>{}}>
  //           <i className="material-icons">Borrar</i>
  //         </button> */}
  //       </div>
  //     </div>
  //   );
}
// function _remove() {
//   if (this.props.onRemove) this.props.onRemove();
// }
