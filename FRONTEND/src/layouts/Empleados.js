import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Axios from 'axios';
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";

const Empleados = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const respuesta = await Axios.get('http://localhost:3001/api/', {
                headers: { 'authorization': token }
            });



            if (respuesta.data.mensaje !== 'Okay') {
                console.log('Algo anda mal');
            } else {
                sessionStorage.setItem('token', token)
                setEmployees(respuesta.data.employees || []);

            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    }


    const navigate = useNavigate();


    const handleEdit = () => {
        navigate('edit');
    };

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem('token');
        try {
            const respuesta = await Axios.delete(`http://localhost:3001/api/delete/${id}`, {
                headers: { 'authorization': token }
            });

            console.log('Respuesta:', respuesta.data)
            if (respuesta.data.mensaje !== 'Deleted Employee') {
                console.log('Algo anda mal');
            } else {
                getEmployees();

            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className='Home'>
            <button onClick={() => handleEdit()}>
                <IoAddCircleSharp size={24} color="red" />
            </button>
            <div>
                {
                    employees.map((empleado, i) => (
                        <div key={i}>
                            <h1>{empleado.nombre}</h1>
                            <button onClick={() => handleDelete(empleado.id)}>
                                <MdDelete size={24} color="red" />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
export default Empleados;