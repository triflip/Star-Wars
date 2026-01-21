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
    },

    // Aquesta es cridarà en clicar "Logout"
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;

    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;