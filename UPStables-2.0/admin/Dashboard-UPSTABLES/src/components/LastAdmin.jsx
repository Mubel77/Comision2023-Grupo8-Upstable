import { useState, useEffect } from "react"
import DetailAdmin from "./DetailAdmin"
  
function LastAdmin() {
  const [last, setLast] = useState()
  const [item, setItem] = useState()

  useEffect(() => {
    async function ultimoProducto() {
    const response = await fetch('http://localhost:3000/users/api/allAdmin')
    const data = await response.json()
    console.log('Result..',data);
    const pages = data.pages
    const respuesta = await fetch(`http://localhost:3000/users/api/allAdmin?page=${pages}`)
    const info = await respuesta.json()
    const ultimo = info.adminList.rows.filter(element =>
      element == info.adminList.rows[info.adminList.rows.length-1]
    )
    //console.log("ultimo", ultimo[0].id);
    setLast(ultimo[0].id)
    }
    ultimoProducto()
  },[])

  useEffect(() => {
    async function itemAdmin() {
    const response = await fetch(`http://localhost:3000/users/api/userDetail/${last}`)
    const data = await response.json()
    //console.log('Result..',data);
    setItem(data.user)
    }
    itemAdmin()
  },[last])

  // console.log('Last..',last);
  //console.log('Admin..',item);

  return(
    <>
      <div className="box-lastCreation">
      <DetailAdmin 
            nombre = {item.nombre}
            apellido = {item.apellido}
            id = {item.id}          
          />
      </div>
    </>
  )
}

export default LastAdmin