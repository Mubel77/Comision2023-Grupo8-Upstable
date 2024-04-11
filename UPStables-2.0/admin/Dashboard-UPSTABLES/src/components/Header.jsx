import {useState, useEffect} from 'react'
import '../App.css'
function Header() {
const [usuario, setUsuario] = useState(null);
useEffect(()=>{
    async function fetchUsuario(){
        try {
            const response = await fetch('http://localhost:3000/users/api/allUsers');
            const data = await response.json()
            console.log("esto es api:", data)
            setUsuario(data[1])
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    }
    fetchUsuario()
},[])
    return (
    
        <>
      <header>
    <a className="link_to_home_header" href="/">
        <img className="logo_header" src="/images/logo_upstables.jpg" alt="logo_upstables"/>
        <div className="titular">
            <h1 className="titulo">UPSTABLES</h1>
            <p className="subtitulo">Proteccion para tu tecnología, garantizada.</p>
        </div>
    </a>

    {/* <div className="buscador_header">
        <form>
            <input type="text" name="buscador" placeholder="¿Qué estás buscando?"/>
            <div className="lupa_header">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </form>
    </div> */}

    <nav className="nav_header">
        <div className="burguer_header">
            <i className="fas fa-bars"></i>
        </div>

        
                <div className="icons_nav" id="img_user">
                    {usuario &&(
                        <a href="/users/perfilAdmin">
                        <img src="= locals.usuario.imagen " alt="foto de perfil"/>
                        <p className="texto_nav">¡ Hola !<br/>
                            {usuario.nombre}
                        </p>
                    </a>
                    )}
                    
                </div>

    </nav>

    <div className="on-off">
        <i className="fa-solid fa-toggle-off"></i>
    </div>

</header>
        </>
    )}

export default Header
