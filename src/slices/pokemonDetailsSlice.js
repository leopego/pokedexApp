import { createSlice } from "@reduxjs/toolkit";

export const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState: {
    pokemonUrl: null,
  },
  reducers: {
    setPokemonDetails: (state, action) => {
      state.pokemonUrl = action.payload.pokemonUrl;
    },
  },
});

export const { setPokemonDetails } = pokemonDetailsSlice.actions;

export const selectPokemonDetails = (state) => state.pokemonDetails.pokemonUrl;

export default pokemonDetailsSlice.reducer;
