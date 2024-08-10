import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Axios from 'axios';
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import ReactPaginate from 'react-paginate';
import Header from '../components/header';


const Empleados = () => {
    const [employees, setEmployees] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [actual, setActual] = useState(0);
    const [cantidad] = useState(4);
    useEffect(() => {
        getEmployees();
    }, [actual]);

    const getEmployees = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const respuesta = await Axios.get('http://localhost:3001/api/', {
                headers: { 'authorization': token },
                params: { page: actual + 1, limit: cantidad }
            });



            if (respuesta.data.mensaje !== 'Okay') {
                console.log('Algo anda mal');
            } else {
                sessionStorage.setItem('token', token)
                setEmployees(respuesta.data.employees || []);
                setPageCount(respuesta.data.totalPages || 1);

            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    }
    const handlePageChange = (pagina) => {
        setActual(pagina.selected);
    }

    const navigate = useNavigate();


    const handleEdit = () => {
        navigate('agregarEmpleado');
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
            <button className='btnAdd' onClick={() => handleEdit()}>
                <IoAddCircleSharp size={60} color="#1F41BB" />
            </button>
            <div className='contEmpleados'>
                <Header text="empleados" />
                {
                    employees.map((empleado, i) => (
                        <div className='divEmpleado' key={i}>
                            <p>{empleado.nombre}</p>
                            <button className='trash' onClick={() => handleDelete(empleado.id)}>
                                <MdDelete size={24} color="black" />
                            </button>
                        </div>
                    ))
                }
            </div>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};
export default Empleados;