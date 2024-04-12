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
    console.log('holaaaaaa',users);
    return (
        <>
                <div className="list-entidades entidades-estilos">
                        <h1>Lista de Administradores</h1>
                    <ul>
                        {users.adminList.map((item, i) => (
                            <li className="box_li box_li_estilos" key={i + item}>
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
