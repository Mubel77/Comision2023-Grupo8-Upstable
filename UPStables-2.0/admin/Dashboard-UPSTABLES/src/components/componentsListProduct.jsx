import React, { useEffect, useState } from 'react';
import Producto from './componentProducto';
import { Link } from 'react-router-dom';


const Product = () => {
    const [products, setProducts] = useState({productos:[]});

    useEffect(() => {
        fetch('http://localhost:3000/products/api/list')
            .then(response => response.json())
            .then(data => {
                // console.log(response,'holaaa');
                setProducts({...products,productos:data.productos});
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    console.log(products, 'chauuuuu');
    return (
        <>
                <div className="list-entidades entidades-estilos">
                    {/* <Link to={`http://http://localhost:3000/products/productDetail/${id}`}></Link> */}
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
                </div>
      
    </>
    )
};

export default Product;
