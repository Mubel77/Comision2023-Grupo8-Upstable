import PropTypes from 'prop-types'

function Usuario (props) {
    console.log('heeeee',props);
    Usuario.propTypes = {
        id: PropTypes.string,
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
        id:"",
    };
    const estilo = {
        width: '100px',
        height: "100px"
      }
      return (
        <>
        <div className='caja_imagen_usuario'>
        <a href={`http://localhost:3000users/formUpdateAdmin/${props.id}`}>
         <img style={estilo} src={`http://localhost:3000${props.imagen}`} alt="Imagen de Producto" />
        </a>
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
