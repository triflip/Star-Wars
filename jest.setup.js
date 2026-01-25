/* eslint-disable no-undef */
import '@testing-library/jest-dom';
// Necessitem importar-ho del mòdul 'util' de Node.js
import { TextEncoder, TextDecoder } from 'util';

// Ara sí que els assignem al global perquè JSDOM els trobi
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Fem el mateix amb el fetch per si de cas
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// El mock de matchMedia que ja tenies
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});