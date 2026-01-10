import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Primer definim com està la nostra aplicació quan s'obre per primer cop, abans de fer res
// Comencem amb una llista buida.
// 'idle' vol dir "en repòs". Altres estats: 'loading', 'succeeded', 'failed'.
// Si l'API falla, guardarem aquí el missatge.
// Comencem demanant la pàgina 1.

const initialState = {
    list: [],
    status: "idle",
    error: null, 
    page: 1
};

const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    // Aquí podríem posar accions "síncrones", com per exemple "netejar llista"
  },
  extraReducers: (builder) => {
    builder
      // Cas 1: El missatger acaba de sortir cap a l'API
      .addCase(fetchStarships.pending, (state) => {
        state.status = 'loading'; // Posem el cartell de "Carregant..."
      })
      // Cas 2: El missatger torna amb èxit i porta les naus
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Afegim les naus noves a les que ja teníem
        //Spread opertor,  ...state.list: Vol dir "agafa les naus que ja teníem guardades
        //...action.payload: Vol dir "afegeix les naus noves que acaben d'arribar
        state.list = action.payload;
      })
      // Cas 3: El missatger ha tingut un problema
      .addCase(fetchStarships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
// Molt important: exportem el reducer per poder-lo posar a l'Store
export default starshipsSlice.reducer;

// Aquest és el "Thunk". És una funció que gestiona l'asincronia.
export const fetchStarships = createAsyncThunk(
  'starships/fetchStarships', // Nom de l'acció (pots posar el que vulguis, però aquest és l'estàndard)
  async (page) => {
    // Aquí fem la crida real a la web de Star Wars
    const response = await axios.get(`https://swapi.py4e.com/api/starships/?page=${page}`);
    
    // El que fem aquí és "extreure" només les naus de la resposta del servidor
    // L'API de Star Wars ens torna un objecte amb moltes coses, 
    // però les naus estan a la propietat .results
    return response.data.results; 
  }
);