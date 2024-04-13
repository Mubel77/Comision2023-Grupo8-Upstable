import PropTypes from 'prop-types'

function Usuario (props) {
    Usuario.propTypes = {
        nombre: PropTypes.string,
        apellido:PropTypes.string,
        email: PropTypes.string,
        rol:PropTypes.number,
        imagen: PropTypes.string,
    };
    Usuario.defaultProps = {
        nombre: 'Nombre',
        apellido: 'apellido',
        email: 'email',
        rol: "rol",
        imagen: "",
    };
    const estilo = {
        width: '100px',
        height: "100px"
      }
      return (
        <>
        <div className='caja_imagen_usuario'>
         <img style={estilo} src={`http://localhost:3000${props.imagen}`} alt="Imagen de Producto" />
        </div>
        <div className='caja_de_texto'>
            <p>Nombre: {props.nombre}</p>
            <p>Apellido: {props.apellido}</p>
            {/* <p>Email: {props.email}</p> */}
            <p>Rol: {props.rol}</p>
        </div>
     </>
    );
}
export default Usuario;
