import React from "react";
// import { render } from "react-dom";
// import datos from "../datos";

export default class TodoItem extends React.Component
 {
    _remove=()=>{
		if(this.props.onRemove)
			this.props.onRemove();
	}
	render(){

		console.log("props todo item", this.props);
		return (
			<li>
				{/* <div className="icon">
					<img src={require(`../images/${this.props.data.image}`)}  alt="estudiante" />
				</div> */}
				<div className="itemDescription">
					<span className="item-name">{this.props.value.nombre}</span>
					<span className="item-edad">{this.props.value.edad}</span>
				</div>
			
				{/* <button className="remove" onClick={this._remove(this)}>
					<i className="material-icons">close</i>
				</button> */}
			</li>
		)
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
