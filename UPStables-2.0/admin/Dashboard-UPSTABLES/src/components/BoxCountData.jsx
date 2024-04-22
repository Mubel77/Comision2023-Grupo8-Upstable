import BoxCountProduct from "./BoxCountProduct";
import BoxCountUsers from "./BoxCountUsers"
import { useState, useEffect } from "react";

function BoxCountData() {
  const [ups, setUps] = useState();
  const [productos, setProductos] = useState();
  const [categorias, setCategorias] = useState();
  const [estabilizadores, setEstabilizadores] = useState();
  const [usuarios, setUsuarios] = useState();
  const [clientes, setClientes] = useState();
  const [empleados, setEmpleados] = useState();

  //Traigo datos de los productos de la api
  useEffect(() => {
    async function fetchProductos() {
      try {
        const resProd = await fetch("http://localhost:3000/products/api/list");
        const dataProd = await resProd.json();
        setProductos(dataProd.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductos();
  }, [productos]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const resCat = await fetch(
          "http://localhost:3000/products/api/list/categories"
        );
        const dataCat = await resCat.json();
        setCategorias(dataCat.categorias.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategorias();
  }, [categorias]);

  useEffect(() => {
    async function fetchUps() {
      try {
        const resUps = await fetch(
          "http://localhost:3000/products/api/list/ups"
        );
        const dataUps = await resUps.json();
        setUps(dataUps.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUps();
  }, [ups]);

  useEffect(() => {
    async function fetchEstabilizadores() {
      try {
        const resEst = await fetch(
          "http://localhost:3000/products/api/list/estabilizadores"
        );
        const dataEst = await resEst.json();
        setEstabilizadores(dataEst.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEstabilizadores();
  }, [estabilizadores]);

  //Traigo datos de los usuarios de la api
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const resUser = await fetch(
          "http://localhost:3000/users/api/allUsers"
        );
        const dataUser = await resUser.json();
        setUsuarios(dataUser.usersList.count);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsuarios();
  }, [usuarios]);
  useEffect(() => {
    async function fetchClientes() {
      try {
        const resClient = await fetch(
          "http://localhost:3000/users/api/allClients"
        );
        const dataClient = await resClient.json();
        setClientes(dataClient.clientsList.count);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchClientes();
  }, [clientes]);
  useEffect(() => {
    async function fetchEmpleados() {
      try {
        const resEmpl = await fetch(
          "http://localhost:3000/users/api/allAdmin"
        );
        const dataEmpl = await resEmpl.json();
        setEmpleados(dataEmpl.adminList.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmpleados();
  }, [empleados]);
return(
    <>
    <BoxCountProduct 
              productos={productos} 
              categorias ={categorias}
              estabilizadores = {estabilizadores}
              ups = {ups} />

              <BoxCountUsers
                            usuarios ={usuarios}
                            clientes = {clientes}
                            empleados = {empleados}
              />
    </>
    
)
}

export default BoxCountData
