import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "../features/starships/starshipsSlice";


export const store = configureStore({
    reducer: {
        starships: starshipsReducer,
    },
});