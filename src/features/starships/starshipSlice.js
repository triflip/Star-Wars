import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchStarships.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.status = "succeeded";

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
          state.hasMore = false; 
        }
      })
    
      .addCase(fetchStarships.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default starshipsSlice.reducer;

export const fetchStarships = createAsyncThunk(
  "starships/fetchStarships",
  async (page, { getState }) => {
    const { hasMore } = getState().starships;
    if (!hasMore) throw new Error("No more pages");

    const response = await axios.get(
      `https://swapi.py4e.com/api/starships/?page=${page}`
    );
    return response.data;
  }
);
