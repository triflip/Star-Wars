// Confirmat que l'accés a les naus està ben protegit i redirecciona als intrusos.

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ProtectedRoute } from '../components/ProtectedRoute'; // Revisa si és export default o named

const mockStore = configureStore([]);

describe('ProtectedRoute', () => {
  test('redirecciona a la Home si lusuari no està loguejat', () => {
    const store = mockStore({ auth: { isLoggedIn: false } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/starships']}>
          <Routes>
            <Route path="/" element={<div>Pàgina de Login</div>} />
            <Route path="/starships" element={
              <ProtectedRoute>
                <div>Contingut Privat</div>
              </ProtectedRoute>
            } />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Pàgina de Login')).toBeInTheDocument();
    expect(screen.queryByText('Contingut Privat')).not.toBeInTheDocument();
  });
});