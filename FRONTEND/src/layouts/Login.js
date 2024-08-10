import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import fotoFelipeJimenez from '../multimedia/logoKonecta.png';
import Axios from 'axios';



const Login = () => {

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const usuario = { email, contrasena };
        try {
            const respuesta = await Axios.post('http://localhost:3001/login', usuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(respuesta);
            const mensaje = respuesta.data.mensaje;
            const token = respuesta.data.token;

            if (mensaje !== 'Bienvenide') {
                console.log('Algo anda mal');
            } else {
                console.log('Bienvenido');
                sessionStorage.setItem('token', token)
                navigate('/inicio');
            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
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
                    Bienvenidos a esta prueba técnica Full Stack.
                </p>
                <form onSubmit={login}>
                    <input
                        id='email'
                        className='input'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input id='contrasena'
                        className='input'
                        type='password'
                        name='contrasena'
                        placeholder='Contraseña'
                        onChange={(e) => setContrasena(e.target.value)} />
                    <button id='loginBtn' className='regularText loginBtn poppins-semibold'
                    >
                        Login
                    </button >
                </form>

                <a className='poppins-semibold'>Crear una nueva cuenta.</a>
            </div>
        </div>
    )
}

export default Login;