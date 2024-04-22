import { useState, useEffect } from "react"
  
function LastProduct() {
  const [last, setLast] = useState()
  const [item, setItem] = useState({})

  useEffect(() => {
    async function ultimoProducto() {
    const response = await fetch('http://localhost:3000/products/api/list')
    const data = await response.json()
    const pages = data.pages
    const respuesta = await fetch(`http://localhost:3000/products/api/list/?page=${pages}`)
    const info = await respuesta.json()
    const ultimo = info.productos.filter(element =>
      element == info.productos[info.productos.length-1]
    )
    setLast(ultimo[0].id)
    }
    ultimoProducto()
  },[])
  
  useEffect(() => {
    async function itemProduct() {
      if (last) {
        const response = await fetch(`http://localhost:3000/products/api/detail/${last}`)
        const data = await response.json()
        setItem(data.producto)
        }
      }
      itemProduct()
  },[last])

  const estilo = {
    width: '200px',
    height: "200px",
    padding: "8px" & '8px'
  }
  return(
    <div className="content-box-lastCreation">
      {Object.keys(item).length >0 && (
        <>
        <h2>Ultimo Producto Creado</h2>
      <div className="box-lastCreation">
        <div className="box-image">
          {item.imagenes && item.imagenes.length > 0 && (         
              <img style={estilo} src={`http://localhost:3000/${item.imagenes[0].ubicacion}/${item.imagenes[0].nombre}`} alt="Imagen Producto" />  
          )} 
        </div>   
            <p>ID: {item.id}</p>
            <p>Modelo: {item.modelo}</p>
            <p>Marca: {item.marcas.marca}</p>
            <p>Stock: {item.stock}</p>    
      </div>
      </>
    )} 
    </div>
  )
}

export default LastProduct