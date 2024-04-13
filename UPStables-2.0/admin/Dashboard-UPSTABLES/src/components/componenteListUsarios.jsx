import React, { useEffect, useState } from 'react';
import Usuario from './componentsUsuario';


const Users = () => {
    const [users, setUsers] = useState({adminList:[]});

    useEffect(() => {
        fetch('http://localhost:3000/users/api/allAdmin')
            .then(response => response.json())
            .then(data => {
                setUsers({...users,adminList:data.adminList.rows});
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const colorH1= {
        color:'black'
    }
    return (
        <>
                <div className="list-entidades entidades-estilos">
                        <h2 className='caja_h1' >Lista de Administradores</h2>
                    <ul className='ul_estilo' style={colorH1}>
                        {users.adminList.map((item, i) => (
                            <li className="box_li caja_estilos caja_estilos_productos" key={i + item}>
                                    <Usuario
                                        nombre={item.nombre}
                                        apellido={item.apellido}
                                        email={item.email}
                                        rol= {item.roles.rol}
                                        imagen={item.imagen}
                                        key={i}
                                    />
                            </li>
                        ))}
                    </ul>
                </div>
      
    </>
    )

};
export default Users;
