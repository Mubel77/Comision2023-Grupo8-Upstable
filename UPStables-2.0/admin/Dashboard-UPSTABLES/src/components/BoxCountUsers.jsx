//import React from 'react'
import "../App.css";
//import BoxCountData from "./BoxCountData"; 
import PropTypes from "prop-types"
function BoxCount(props) {
  BoxCount.propTypes ={
    usuarios:PropTypes.number,
    empleados: PropTypes.number,
    clientes : PropTypes.number,
    
  }
  BoxCount.defaultTypes ={
    usuarios: 0,
    empleados: 0,
    clientes : 0,
  }
  return (
    <>
      <div className="div_box-counts">
        
          <div className="box-counts">
            <h3>Usuarios:</h3>
            <h3>{props.usuarios}</h3>
          </div>

          <div className="box-counts">
            <h3>Empleados:</h3>
            <h3>{props.empleados}</h3>
          </div>
        
          <div className="box-counts">
            <h3>Clientes:</h3>
            <h3>{props.clientes}</h3>
          </div>
      </div>
    </>
  );

}

export default BoxCount;
