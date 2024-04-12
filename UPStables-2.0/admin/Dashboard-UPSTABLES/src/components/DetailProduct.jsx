import PropTypes from 'prop-types'

function DetailProduct(props) {
  DetailProduct.propTypes = {
    id: PropTypes.number.isRequired,
    modelo: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired  
  }
  DetailProduct.defaultTypes = {
    id: 0,
    nombre: "Not Found"
  }

  return (
    <>
      <p>ID {props.id}</p>
      <p>Modelo {props.modelo}</p>
      <p>Marca {props.marca}</p>
    </>
  )
}

export default DetailProduct