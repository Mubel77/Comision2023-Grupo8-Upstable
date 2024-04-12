import { useState, useEffect } from "react"
import DetailProduct from "./DetailProduct"
  
function LastProduct() {
  const [last, setLast] = useState()
  const [item, setItem] = useState()

  useEffect(() => {
    async function ultimoProducto() {
    const response = await fetch('http://localhost:3000/products/api/list')
    const data = await response.json()
    //console.log('Result..',data);
    const pages = data.pages
    const respuesta = await fetch(`http://localhost:3000/products/api/list/?page=${pages}`)
    const info = await respuesta.json()
    const ultimo = info.productos.filter(element =>
      element == info.productos[info.productos.length-1]
    )
    //console.log("ultimo", ultimo[0].id);
    setLast(ultimo[0].id)
    }
    ultimoProducto()
  },[])

  useEffect(() => {
    async function itemProduct() {
    const response = await fetch(`http://localhost:3000/products/api/detail/${last}`)
    const data = await response.json()
    //console.log('Result..',data.count);
    setItem(data.producto)
    }
    itemProduct()
  },[last])

  // console.log('Last..',last);
  //console.log('Product..',item);

  return(
    <>
      <div className="box-lastCreation">
      <DetailProduct 
            modelo = {item.modelo}
            marca = {item.marcas.marca}
            id = {item.id}          
          />
      </div>
    </>
  )
}

export default LastProduct