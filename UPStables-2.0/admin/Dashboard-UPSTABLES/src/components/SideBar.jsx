function SideBar() {
  return (
    <>
      <div className="div_box_enlaces">
        {/* <a href="http://localhost:5173/">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Dashboard</p>
          </div>
        </a> */}
        <a href="http://localhost:3000/users/dashboard">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Dashboard Admins</p>
          </div>
        </a>
        <a href="http://localhost:3000/users/registerAdmin">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Crear Admin</p>
          </div>
        </a>
        <a href="http://localhost:3000/users/dashboard">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Editar Admin</p>
          </div>
        </a>
        <a href="http://localhost:3000/products/dashboard">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Dashboard Productos</p>
          </div>
        </a>
        <a href="http://localhost:3000/products/formCreate">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Crear Producto</p>
          </div>
        </a>
        <a href="http://localhost:3000/products/dashboard">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Editar Producto</p>
          </div>
        </a>
        <a href="http://localhost:3000/products/productsList/">
          <div className="div_enlaces_perfil-user">
          <i className="fa-solid fa-screwdriver-wrench"></i>
            <p>Lista de Productos</p>
          </div>
        </a>
        <a href="http://localhost:3000/users/logout">
          <div className="div_enlaces_perfil-user">
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Salir</p>
          </div>
        </a>
      </div>
    </>
  );
}

export default SideBar;
