import '../App.css'
import LastProduct from './LastProduct'
import LastAdmin from './LastAdmin'
import SideBar from './SideBar'
import Header from "./Header"
import Users from './componenteListUsarios'
import Product from './componentsListProduct'
import BoxCountData from './BoxCountData'
import Footer from './componentFooter'

function App() {

  return (
    <>
    <body>

      <Header/>

      <main className="main">
        <section className="column-izq">
            <SideBar />
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
            <LastProduct/>
            <LastAdmin/>
          </article>
        </section>
      </main>

      <footer className="footer">
      <Footer></Footer>
      </footer>
      </body>
    </>
  )
}

export default App
