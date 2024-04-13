import PropTypes from 'prop-types'

function Producto (props) {
    Producto.propTypes = {
        id: PropTypes.string,
        modelo: PropTypes.string,
        marca: PropTypes.string,
        potencia: PropTypes.number,
        tomas: PropTypes.number,
        precio: PropTypes.number,
        descuento: PropTypes.number,
        stock: PropTypes.number,
        imagenes: PropTypes.arrayOf(
            PropTypes.shape({
                nombre: PropTypes.string,
                ubicacion: PropTypes.string
            })
        )
    };
    Producto.defaultProps = {
        modelo: 'Modelo',
        marca: 'Marca',
        potencia: 0,
        tomas: 0,
        precio: 0,
        descuento: 0,
        stock: 0,
        imagenes: [],
        id:"",
    };
    const estilo = {
        width: '100px',
        height: "100px",
        padding: "5"
      }
    return (
        <>
        <div className='caja_imagenes'>
            <a href={`http://localhost:3000/products/productDetail/${props.id}`}>
         {props.imagenes && props.imagenes.length > 0 && (
         <img style={estilo} src={`http://localhost:3000${props.imagenes[0].ubicacion}/${props.imagenes[0].nombre}`} alt="Imagen de Producto" />
            )}
            </a>
        </div>
        <div className='caja_de_texto'>
            <p>Modelo: {props.modelo}</p>
            <p>Marca: {props.marca}</p>
            <p>Potencia: {props.potencia}</p>
        </div>
     </>
    );

}

export default Producto;


