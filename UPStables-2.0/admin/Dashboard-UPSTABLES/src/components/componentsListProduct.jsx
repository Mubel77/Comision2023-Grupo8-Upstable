import React, { useEffect, useState } from 'react';
import Producto from './componentProducto';

const Product = () => {
    const [products, setProducts] = useState({ productos: [] });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5); 
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/products/api/list?page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                setProducts({ ...products, productos: data.productos });
                setIsLastPage(data.productos.length < limit); // verifico si hay hay productos
            })
            .catch(error => {
                console.log(error);
            });
    }, [page, limit]);
console.log(page, limit, "quiero ver");
    return (
        <>
            <div className="list-entidades entidades-estilos">
                <p className='p_estilo'>Lista de Productos</p>
                <ul className='ul_estilo'>
                    {products.productos.map((item, i) => (
                        <li className="box_li caja_estilos estilos_productos" key={i + item}>
                            <Producto
                                modelo={item.modelo}
                                marca={item.marcas.marca}
                                potencia={item.potencia}
                                imagenes={item.imagenes}
                                id={item.id}
                                key={i}
                            />
                        </li>
                    ))}
                </ul>
                {isLastPage && <p className='p_estilo'>No hay más productos</p>} 
                <div className="pagination-buttons">
                    <button className='style-button' onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                    <button className='style-button' onClick={() => setPage(page + 1)} disabled={isLastPage}>Siguiente</button>
                </div>
            </div>                  
        </>
    );
};

export default Product;
