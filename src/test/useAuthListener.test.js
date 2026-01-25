// Validat que el hook es connecta correctament a l'autenticació de Firebase.

import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useAuthListener } from '../hooks/useAuthListener';
import { onAuthStateChanged } from 'firebase/auth';

// 1. Mokejem la configuració de Firebase abans que s'importi res
jest.mock('../firebase/config', () => ({
  auth: {
    currentUser: null
  }
}));

// 2. Mokejem la llibreria d'autenticació
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(() => { 
    // Al no declarar els paràmetres (_auth, _callback), 
    // l'ESLint ja no té res per analitzar i no es queixarà.
    return jest.fn(); 
  }),
}));

const mockStore = configureStore([]);

describe('useAuthListener', () => {
  test('ha de cridar a onAuthStateChanged en muntar-se', () => {
    const store = mockStore({});
    
    renderHook(() => useAuthListener(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    // Ara Firebase no donarà error de fetch i el mock funcionarà
    expect(onAuthStateChanged).toHaveBeenCalled();
  });
});