import React, { useEffect, useState } from 'react';
import Producto from './componentProducto';
import { Link } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState({ productos: [] });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6); // Cambia esta cantidad según tus necesidades
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/products/api/list?page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                setProducts({ ...products, productos: data.productos });
                setIsLastPage(data.productos.length <= 0); // Verifica si no hay productos en la página actual
            })
            .catch(error => {
                console.log(error);
            });
    }, [page, limit]);

    return (
        <>
            <div className="list-entidades entidades-estilos">
                <h1 className='caja_h1'>Lista de Productos</h1>
                <ul className='ul_estilo'>
                    {products.productos.map((item, i) => (
                        <li className="box_li caja_estilos estilos_productos" key={i + item}>
                            <Producto
                                modelo={item.modelo}
                                marca={item.marcas.marca}
                                potencia={item.potencia}
                                imagenes={item.imagenes}
                                key={i}
                            />
                        </li>
                    ))}
                </ul>
                {isLastPage && <p>No hay más productos</p>} {/* Muestra el mensaje si no hay productos en la última página */}
            </div>

            {/* Botones de paginación */}
            <div className="pagination-buttons">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                <button onClick={() => setPage(page + 1)} disabled={isLastPage}>Siguiente</button> {/* Deshabilita el botón si es la última página */}
            </div>
        </>
    );
};

export default Product;
