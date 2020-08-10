import React from 'react';

const AlumnosList = ({data}) => {
    return (  
       <div className = 'mt-5'>
          <table className = 'table table-responsive table-striped '>
          <thead className="thead-dark">
            <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Acciones</th>
                
            </tr>
          </thead>
          <tbody>
           {
               data.map( alumno => (
                  <tr>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.edad}</td>
                    <td><button className ='btn btn-primary btn-sm'>Ver detalles</button></td>
                  </tr>     
               ))
           }
           </tbody>
        </table>
       </div>
    );
}
 
export default AlumnosList;