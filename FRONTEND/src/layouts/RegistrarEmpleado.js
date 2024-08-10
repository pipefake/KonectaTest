import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fotoFelipeJimenez from '../multimedia/logoKonecta.png';

const RegistrarEmpleado = () => {
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [nombre, setNombre] = useState('');
    const [salario, setSalario] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        console.log('Token', token);
        try {
            const result = await Axios.post(
                'http://localhost:3001/api/create',
                {

                    fecha_ingreso: fechaIngreso,
                    nombre: nombre,
                    salario: salario
                },
                {
                    headers: { 'authorization': token }
                }
            );
            console.log(result);
            navigate(-1);
        } catch (err) {
            console.error(err);

        }
    }
    return (

        <div className='Home ingresarHome'>
            <div>
                <img className='' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                <h2 className='largeText blueTittle poppins-semibold'>
                    Ingresar
                </h2>
                <p className='smallText poppins-regular'>
                    Ingresar empleado:
                </p>
                <form onSubmit={handleSubmit}>

                    <input
                        type="date"
                        id="fechaIngreso"
                        className='input'
                        value={fechaIngreso}
                        onChange={(e) => setFechaIngreso(e.target.value)}

                    >
                    </input>
                    <input
                        type="text"
                        id="nombre"
                        className='input'
                        placeholder='Nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}

                    >
                    </input>
                    <input
                        type="number"
                        id="salario"
                        className='input'
                        placeholder='Salario'
                        value={salario}
                        onChange={(e) => setSalario(e.target.value)}

                    >
                    </input>

                    <button className='regularText loginBtn poppins-semibold' type="submit">
                        Registrar
                    </button>
                </form>


            </div>
        </div>



    );

}

export default RegistrarEmpleado;