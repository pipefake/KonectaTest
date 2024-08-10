import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import fotoFelipeJimenez from '../multimedia/logoKonecta.png';
import Axios from 'axios';


const Registro = () => {


    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const usuario = { nombre, email, contrasena };
        try {

            const respuesta = await Axios.post('http://localhost:3001/registro', usuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            console.log(respuesta);
            const mensaje = respuesta.data.mensaje;
            const token = respuesta.data.token;

            if (mensaje !== 'Registro exitoso') {
                console.log('Usuario no registrado');
                setMensaje('Usuario no registrado');
            } else {
                setMensaje('Registro exitoso');
                console.log('Registro');
                sessionStorage.setItem('token', token)
                navigate('/login');
            }

        } catch (err) {

            setMensaje('Registro Error');
            console.error(err.response ? err.response.data : err.message);
        }

    }

    return (
        <div className='Home ingresarHome'>
            <div>
                <img className='' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                <h2 className='largeText blueTittle poppins-semibold'>
                    Registrarse
                </h2>
                <p className='smallText poppins-regular'>
                    Cree una cuenta para poder ingresar a la prueba Full Stack.
                </p>
                <form onSubmit={login}>
                    <input id='nombre'
                        className='input'
                        value={nombre}
                        name='nombre'
                        placeholder='Nombre'
                        onChange={(e) => setNombre(e.target.value)} />
                    <input
                        id='email'
                        className='input'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input id='contrasena'
                        className='input'
                        name='contrasena'
                        value={contrasena}
                        placeholder='Contraseña'
                        onChange={(e) => setContrasena(e.target.value)} />

                    <button id='nombreBtn' className='regularText loginBtn poppins-semibold'
                    >
                        Registrar
                    </button >
                </form>
                {mensaje && <p>{mensaje}</p>}
                <a className='poppins-semibold'>Ya tengo una cuenta.</a>
            </div>
        </div>
    )
}
export default Registro;