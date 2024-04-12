import PropTypes from 'prop-types'

function DetailAdmin(props) {
  DetailAdmin.propTypes = {
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired  
  }
  DetailAdmin.defaultTypes = {
    id: 0,
    nombre: "Not Found",
    apellido: "Not Found"
  }

  return (
    <>
      <p>ID {props.id}</p>
      <p>Nombre {props.nombre}</p>
      <p>Apellido {props.apellido}</p>
    </>
  )
}

export default DetailAdmin