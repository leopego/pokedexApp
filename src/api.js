import axios from "axios";

export const pokemonUrl = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});
