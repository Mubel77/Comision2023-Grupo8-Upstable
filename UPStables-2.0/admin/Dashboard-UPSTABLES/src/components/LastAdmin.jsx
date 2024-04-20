import { useState, useEffect } from "react"
  
function LastAdmin() {
  const [last, setLast] = useState()
  const [item, setItem] = useState(0)

  useEffect(() => {
    async function ultimoAdmin() {
    const response = await fetch('http://localhost:3000/users/api/allAdmin')
    const data = await response.json()
    //console.log('Result..',data);
    const pages = data.pages
    const respuesta = await fetch(`http://localhost:3000/users/api/allAdmin?page=${pages}`)
    const info = await respuesta.json()
    const ultimo = info.adminList.rows.filter(element =>
      element == info.adminList.rows[info.adminList.rows.length-1]
    )
    //console.log("ultimo", ultimo[0].id);
    setLast(ultimo[0].id)
    }
    ultimoAdmin()
  },[])

  useEffect(() => {
    async function itemAdmin() {
      if (last) {
        const response = await fetch(`http://localhost:3000/users/api/userDetail/${last}`)
        const data = await response.json()
        //console.log('Result..',data);
        setItem(data.user)
        }
      }
    itemAdmin()
  },[last])

  // console.log('Last..',last);
  //console.log('Admin..',item);
  const estilo = {
    width: '200px',
    height: "200px"
  }
  return(
    <div className="content-box-lastCreation">
      <h2>Ultimo Administrador</h2>
      <div className="box-lastCreation">
        <div className="box-image"> 
            <img style={estilo} src={`http://localhost:3000/${item.imagen}`} alt="Avatar Usuario" />
        </div>
            <p>ID: {item.id}</p>
            <p>Nombre: {item.nombre}</p>
            <p>Apellido: {item.apellido}</p>
            <p>Email: {item.email}</p>
      </div>
    </div>
  )
}

export default LastAdmin