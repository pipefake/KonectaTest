import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { mensaje: 'Registro exitoso', token: 'some-token' } })),
}));