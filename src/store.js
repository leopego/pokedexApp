import { configureStore } from "@reduxjs/toolkit";
import pokemonDetailsReducer from "../src/slices/pokemonDetailsSlice";

export default configureStore({
  reducer: {
    pokemonDetails: pokemonDetailsReducer,
  },
});
