import PropTypes from 'prop-types'

function Producto (props) {
    Producto.propTypes = {
        modelo: PropTypes.string ,
        marca:PropTypes.string ,
        pontencia: PropTypes.number,
    }
    Producto.defaultProps = {
        modelo:  'modelo',
        marca: 'marca',
        pontencia: 0
    }
    return(<>
    <p>{props.modelo}</p>
    <p>{props.marca}</p>
    <p>{props.pontencia}</p>
    </>)
}

export default Producto;