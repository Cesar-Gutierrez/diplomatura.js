import React from "react";
// import 'react-bulma-components/dist/react-bulma-components.min.css';
// import { Form } from  'react-bulma-components/dist';;
// import { Button } from 'react-bulma-components/dist';


export default class DetalleAlumno extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       alumno,
  //     };
  //   }



  handlerVolverListadoAlumno=()=>{
    this.props.onVolverListadoAlumno()
  }


  render() {
    const { id, nombre, edad } = this.props.value; // recibe un alumno por props
    console.log("llego por props a detalle alumno:", this.props);
    return (
      <>
       
          <div className="icon">
            <img
              src={require(`../images/estudiante.png`)}
              style={{ width: "20rem" }}
              alt="estudiante"
            />
          </div>
          <div className="alumnoDetalles">
            <div>
              <span className="alumno-idLabel">ID: </span>
              <span className="alumno-id">{id}</span>
              <div />

              <div>
                <span className="alumno-nameLabel">Nombre: </span>
                <span className="alumno-name">{nombre}</span>
              </div>
            </div>
            <span className="alumno-edadLabel">Edad: </span>
            <span className="alumno-edad">{edad}</span>
          </div>

          <button className="alumno-volver" color="primary"
           onClick={() => this.handlerVolverListadoAlumno()}
           >
            <i className="alumnoVolver">volver</i>
          </button>
        
      </>
    );
  }
}
