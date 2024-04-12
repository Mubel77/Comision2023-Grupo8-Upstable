import React, { useEffect, useState } from 'react';
import Producto from './componentProducto';
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
    return (
        <>
                <div className="list-entidades entidades-estilos">
                        <h1>Lista de Productos</h1>
                    <ul>
                        {products.productos.map((item, i) => (
                            <li className="box_li box_li_estilos" key={i + item}>
                                    <Producto
                                        modelo={item.modelo}
                                        marca={item.marcas.marca}
                                        potencia={item.potencia}
                                        imagenes={item.imagenes}
                                        // tomas={item.tomas}
                                        // precio={item.precio}
                                        // descuento={item.descuento}
                                        // stock={item.stock}
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
