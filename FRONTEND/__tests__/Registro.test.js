import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Registro from '../src/components/Registro';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

const mock = new MockAdapter(Axios);

describe('component Registro', () => {
    afterEach(() => {
        mock.reset();
    });
    it('Should render the from fields and submit correctly', async () => {
        mock.onPost('http://localhost:3001/registro').reply(200, {
            mensaje: 'Registro exitoso',
            token: 'token-para-prueba-jest'
        });
        render(
            <Router>
                <Registro />
            </Router>
        );

        const nombreInput = screen.getByPlaceholderText('Nombre');
        const emailInput = screen.getByPlaceholderText('Email');
        const contrasenaInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Registrar');

        fireEvent.change(nombreInput, { target: { value: 'felipe jimenez' } });
        fireEvent.change(emailInput, { target: { value: 'felipe@felipe.com' } });
        fireEvent.change(contrasenaInput, { target: { value: '1192804870' } });


        expect(nombreInput.value).toBe('felipe jimenez');
        expect(emailInput.value).toBe('felipe@felipe.com');
        expect(contrasenaInput.value).toBe('1192804870');

        await fireEvent.click(button);
        const mensajeElement = await screen.findByText('Registro exitoso');

        expect(mensajeElement).toBeInTheDocument();
    });
});