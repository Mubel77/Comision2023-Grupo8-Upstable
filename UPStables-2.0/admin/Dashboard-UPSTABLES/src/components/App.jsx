import '../App.css'
import SideBar from './SideBar'

import Header from "./Header"
function App() {

  return (
    <>
      {/* <header className="header">
        <div className="div_header">
          <h1>LOGO</h1>
        </div>
        <div className="div_header">
          <input type="text" placeholder="Buscador" />
        </div>
        <div className="div_header">
          <h1>Iconos</h1>
        </div>
      </header> */}
      <Header/>

      <main className="main">
        <section className="column-izq">
            <SideBar />
        </section>

        <section className="column-der">
          <article className="article-1">
            <div className="div_box-counts">
              <div className="box-counts">
                <h3>Count</h3>
                <h3>1</h3>
              </div>
              <div className="box-counts">
                <h3>Count</h3>
                <h3>2</h3>
              </div>
              <div className="box-counts">
                <h3>Count</h3>
                <h3>3</h3>
              </div>
              <div className="box-counts">
                <h3>Count</h3>
                <h3>4</h3>
              </div>
            </div>
            <div className="div_box-counts">
              <div className="box-counts">
                <h3>Count</h3>
                <h3>5</h3>
              </div>
              <div className="box-counts">
                <h3>Count</h3>
                <h3>5</h3>
              </div>
              <div className="box-counts">
                <h3>Count</h3>
                <h3>5</h3>
              </div>
                <div className="box-counts">
                  <h3>Count</h3>
                  <h3>5</h3>
                </div>
            </div>
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
    </>
  )
}

export default App
