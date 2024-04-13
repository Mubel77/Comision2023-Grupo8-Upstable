import { useState, useEffect } from "react"
  
function LastProduct() {
  const [last, setLast] = useState()
  const [item, setItem] = useState(0)

  useEffect(() => {
    async function ultimoProducto() {
    const response = await fetch('http://localhost:3000/products/api/list')
    const data = await response.json()
    //console.log('Result..',data);
    const pages = data.pages
    const respuesta = await fetch(`http://localhost:3000/products/api/list/?page=${pages}`)
    const info = await respuesta.json()
    // const ultimo = info.productos.filter(element =>
    //   element == info.productos[info.productos.length-3]
    // )
    //console.log("Info..",info);
    const ultimo = info.productos[info.productos.length-3]
    //console.log("ultimo", ultimo.id);
    setLast(ultimo.id)
    }
    ultimoProducto()
  },[])
  //console.log('Last..',last);
  useEffect(() => {
    async function itemProduct() {
      if (last) {
        const response = await fetch(`http://localhost:3000/products/api/detail/${last}`)
        const data = await response.json()
        //console.log('Data..',data);
        setItem(data.producto)
        }
      }
      itemProduct()
  },[last])

  //console.log('Product..',item)
  const estilo = {
    width: '200px',
    height: "200px",
    padding: "8px" & '8px'
  }
  return(
    <div className="content-box-lastCreation">
      <h2>Ultimo Producto</h2>
      <div className="box-lastCreation">
        <div className="box-image">
          {item.imagenes && item.imagenes.length > 0 && (         
              <img style={estilo} src={`http://localhost:3000/${item.imagenes[0].ubicacion}/${item.imagenes[0].nombre}`} alt="Imagen Producto" />  
          )} 
        </div>   
            <p>ID: {item.id}</p>
            <p>Modelo: {item.modelo}</p>
            <p>Marca: {item.marcas.marca}</p>
            <p>Precio: {item.precio}</p>
            <p>Stock: {item.stock}</p>    
      </div>
    </div>
  )
}

export default LastProduct