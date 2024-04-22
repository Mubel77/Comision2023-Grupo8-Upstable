//import React from 'react'
import "../App.css";
//import BoxCountData from "./BoxCountData"; 
import PropTypes from "prop-types"
function BoxCount(props) {
  BoxCount.propTypes ={
    productos:PropTypes.number,
    categorias: PropTypes.number,
    estabilizadores : PropTypes.number,
    ups : PropTypes.number
  }
  BoxCount.defaultTypes ={
    productos: 0,
    categorias: 0,
    estabilizadores : 0,
    ups : 0
  }
  return (
    <>
      <div className="div_box-counts">
          <div className="box-counts">
            <h3>Productos:</h3>
            <h3>{props.productos}</h3>
          </div>
        
   
         <div className="box-counts">
            <h3>Categorias:</h3>
            <h3>{props.categorias}</h3>
          </div>

          <div className="box-counts">
            <h3>Ups:</h3>
            <h3>{props.ups}</h3>
          </div>

          <div className="box-counts">
            <h3>Estabilizadores:</h3>
            <h3>{props.estabilizadores}</h3>
          </div>
          </div>
    </>
  );

}

export default BoxCount;
