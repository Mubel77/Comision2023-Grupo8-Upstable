import PropTypes from 'prop-types'

function Producto (props) {
    Producto.propTypes = {
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
        imagenes: []
    };
    return (
        <div className="producto">
            <p>Modelo: {props.modelo}</p>
            <p>Marca: {props.marca}</p>
            <p>Potencia: {props.potencia}</p>
            <p>Tomas: {props.tomas}</p>
            <p>Precio: ${props.precio}</p>
            <p>Descuento: {props.descuento ? props.descuento : 0}</p>
            <p>Stock: {props.stock}</p>
            {props.imagenes && props.imagenes.length > 0 && (
                <img src={`http://localhost:3000${props.imagenes[0].ubicacion}/${props.imagenes[0].nombre}`} alt="Imagen de Producto" />
            )}
        </div>
    );

}

export default Producto;