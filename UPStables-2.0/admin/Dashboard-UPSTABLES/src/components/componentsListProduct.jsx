import React, { useEffect, useState } from 'react';

const Product = () => {
    const [products, setProducts] = useState({modelo:'',marca:'',potencia:''});

    useEffect(() => {
        fetch('http://localhost:3000/products/api/list')
            .then(response => response.json())
            .then(data => {
                // console.log(response,'holaaa');
                setProducts(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
console.log( products);
    return (
        <>
      {/* <div className="list-entidades">
        <ul>
          {products.productos.map((item, i) => (
            <li className="box_li" key={i + item}>
              < Producto 
              modelo={item.modelo}
              marca={item.marcas.marca}
              potencia={item.potencia}
              />
            </li>
          ))}
        </ul>
      </div> */}
      
    </>
        // <main className="dashboard_main">
        //     <div className="dashboard_box_search-add">
        //         <a href="/products"><button className="dashboard_add">List Products</button></a>
        //         <div className="dashboard_search">
        //             <form action="/products/dashboard/search" method="GET">
        //                 <input type="text" name="keywords" placeholder="Buscar producto por Marca"/>
        //                 <button type="submit"><i className="fas fa-search"></i></button>
        //             </form>
        //         </div>
        //         <a href="/products/formCreate"><button className="dashboard_add">+ Agregar Producto</button></a>
        //     </div>

        //     <section className="dashboard_section">
        //         {products.productos.map(producto => (
        //             <article key={producto.id} className="dashboard_article">
        //                 <div className="dashboard_div_img">
        //                     <img src={producto.imagen} alt=""/>
        //                 </div>
        //                 <div className="dashboard_div_texto">
        //                     <h2>Modelo:  {producto.modelo}</h2>
        //                     <h3>Marca:  {producto.marcas.marca}</h3>
        //                     <h4>Categoria:  {producto.categorias.categoria}</h4>
        //                     <p> {producto.descripcion}</p>
        //                     <h4>Potencia:  {producto.potencia}</h4>
        //                     <h4>Tomas:  {producto.tomas}</h4>
        //                     <h4>Precio: $  {producto.precio}</h4>
        //                     <h4>Descuento:  {producto.descuento ? producto.descuento : 0} </h4>
        //                     <h4>Stock:  {producto.stock}</h4>
        //                 </div>
        //                 <div className="dashboard_div_botones">
        //                     <a href={`/products/formUpdate/${producto.id}`}><button>Modificar</button></a>
        //                     <form action={`/products/delete/${producto.id}?_method=DELETE`} method="POST">
        //                         <button type="submit">Eliminar</button>
        //                     </form>
        //                 </div>
        //             </article>
        //         ))}
        //     </section>
        // </main>
    )
};

export default Product;
