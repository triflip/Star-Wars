import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Aquesta acció es cridarà quan l'usuari posi bé la seva contrasenya
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // action.payload seran les dades de l'usuari
      
      // PERSISTÈNCIA: Si tanquem la pestanya, volem que recordi l'usuari.
      // Guardem l'usuari al disc dur del navegador (LocalStorage)
      localStorage.setItem('starwars_user', JSON.stringify(action.payload));
    },

    // Aquesta es cridarà en clicar "Logout"
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('starwars_user'); // Netegem el disc dur
    },

    // Aquesta acció és per quan l'usuari refresca la pàgina (F5)
    // Mirem si hi ha algú guardat al LocalStorage i el recuperem
    checkAuth: (state) => {
      const savedUser = localStorage.getItem('starwars_user');
      if (savedUser) {
        state.isLoggedIn = true;
        state.user = JSON.parse(savedUser);
      }
    }
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;