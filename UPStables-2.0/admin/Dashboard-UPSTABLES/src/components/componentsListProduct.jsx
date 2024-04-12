import React, { useEffect, useState } from 'react';
import Producto from './componentProducto';
import '../../../../../UPStables-2.0/public/stylesheets/dashboard.css';

const Product = () => {
    const [products, setProducts] = useState({ productos: [] });

    useEffect(() => {
        fetch('http://localhost:3000/products/api/list')
            .then(response => response.json())
            .then(data => {
                setProducts({ ...products, productos: data.productos });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <main className="dashboard_main">
            <div className="dashboard_box_search-add">
                <a href="/products"><button className="dashboard_add">List Products</button></a>
                <div className="dashboard_search">
                    <form action="/products/dashboard/search" method="GET">
                        <input type="text" name="keywords" placeholder="Buscar producto por Marca" />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <a href="/products/formCreate"><button className="dashboard_add">+ Agregar Producto</button></a>
            </div>

            <section className="dashboard_section">
                <div className="list-entidades">
                    <ul>
                        {products.productos.map((item, i) => (
                            <li className="box_li" key={i + item}>
                                <div className="dashboard_div_texto">
                                    <Producto
                                        modelo={item.modelo}
                                        marca={item.marcas.marca}
                                        potencia={item.potencia}
                                        imagenes={item.imagenes}
                                        tomas={item.tomas}
                                        precio={item.precio}
                                        descuento={item.descuento}
                                        stock={item.stock}
                                        key={i}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default Product;
