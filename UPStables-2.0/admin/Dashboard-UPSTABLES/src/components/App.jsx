import '../App.css'

import Header from "./Header"
import Users from './componenteListUsarios'
import Product from './componentsListProduct'
import BoxCountData from './BoxCountData'
function App() {

  return (
    <>
    <body>

  
      <Header/>

      <main className="main">
        <section className="column-izq">
            <ul>
              <li>
                <i></i>
                <p>Mi Cuenta</p>
              </li>
              <li>
                <i></i>
                <p>Editar Productos</p>
              </li>
              <li>
                <i></i>
                <p>Editar Empleados</p>
              </li>
              <li>
                <i></i>
                <p>Editar perfil</p>
              </li>
              <li>
                <i></i>
                <p>Salir</p>
              </li>
            </ul>
        </section>

        <section className="column-der">
        <article className="article-1">
        <BoxCountData/>
        </article>
          <article className="article-2 clase_de_fondo">
           <Product></Product>
           <Users></Users>
          </article>
          <article className="article-3">
            <div className="box-lastCreation">
              <img src="" alt=""/>
              <p>Ultimo Producto</p>
            </div>
            <div className="box-lastCreation">
              <img src="" alt=""/>
              <p>Ultimo Admin</p>
            </div>
          </article>
        </section>
      </main>

      <footer className="footer">
        <div className="box_footer">
          <h1>Iconos</h1>
        </div>
        <div className="box_footer">
         <h1>UPSTABLES</h1>
        </div>
      </footer>
      </body>
    </>
  )
}

export default App
