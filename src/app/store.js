import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "../features/starships/starshipSlice";
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        starships: starshipsReducer,
        auth: authReducer, //el registrrem
    },
});