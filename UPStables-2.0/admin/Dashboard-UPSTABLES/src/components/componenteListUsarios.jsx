import React, { useEffect, useState } from 'react';

const Users = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('`http://localhost:3000/users/api/allUsers')
            .then(response => response.json())
            .then(data => {
                console.log(response,'holaaa');
                setProducts(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



}