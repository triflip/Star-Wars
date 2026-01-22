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
  page: 1,
  hasMore: true,
};

const starshipsSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {
    // Aquí podríem posar accions "síncrones", com per exemple "netejar llista"
  },
  extraReducers: (builder) => {
    builder
      // Cas 1: El missatger acaba de sortir cap a l'API
      .addCase(fetchStarships.pending, (state) => {
        state.status = "loading"; // Posem el cartell de "Carregant..."
      })
      // Cas 2: El missatger torna amb èxit i porta les naus
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Ara action.payload és l'objecte sencer (amb results i next)
        const newShips = action.payload.results;
        const nextUrl = action.payload.next;

        const filteredNewShips = newShips.filter(
          (newShip) =>
            !state.list.some((existingShip) => existingShip.url === newShip.url)
        );

        state.list = [...state.list, ...filteredNewShips];

        if (nextUrl) {
          state.page += 1;
          state.hasMore = true;
        } else {
          state.hasMore = false; // JA NO HI HA MÉS PÀGINES
        }
      })
      // Cas 3: El missatger ha tingut un problema
      .addCase(fetchStarships.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// Molt important: exportem el reducer per poder-lo posar a l'Store
export default starshipsSlice.reducer;

// Aquest és el "Thunk". És una funció que gestiona l'asincronia.
export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
  async (page, { getState }) => {
    // Si per algun motiu es crida quan hasMore és false, cancel·lem
    const { hasMore } = getState().starships;
    if (!hasMore) throw new Error("No more pages");

    const response = await axios.get(
      `https://swapi.py4e.com/api/starships/?page=${page}`
    );
    return response.data;
  }
);
