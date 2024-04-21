import React, { useEffect, useState } from 'react';
import Usuario from './componentsUsuario';

const Users = () => {
    const [users, setUsers] = useState({ adminList: [] });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5); 
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/users/api/allAdmin?page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                setUsers({ ...users, adminList: data.adminList.rows });
                setIsLastPage(page >= data.pages); // Verifica si es la última página
            })
            .catch(error => {
                console.log(error);
            });
    }, [page, limit]);

    return (
        <>
            <div className="list-entidades entidades-estilos">
                <div>
                <p className='p_estilo'>Lista de Administradores</p>
                </div>
                <ul className='ul_estilo'>
                    {users.adminList.map((item, i) => (
                        <li className="box_li caja_estilos estilos_usuario" key={i + item}>
                            <Usuario
                                nombre={item.nombre}
                                apellido={item.apellido}
                                email={item.email}
                                rol={item.roles.rol}
                                imagen={item.imagen}
                                id={item.id}
                                key={i}
                            />
                        </li>
                    ))}
                </ul>
                {isLastPage && <p className='p_estilo'>No hay más administradores</p>}
                <div className="pagination-buttons">
                    <button className='style-button' onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                    <button className='style-button' onClick={() => setPage(page + 1)} disabled={isLastPage}>Siguiente</button>
                </div>
            </div>
        </>
    );
};

export default Users;
