import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
//REDUX --------------------------------------------------------------
import { setPokemonDetails } from "../../slices/pokemonDetailsSlice";
import { useDispatch } from "react-redux";

import axios from "axios";

const screenWidth = Dimensions.get("screen").width;

const Pokemon = ({ name, url, navigation }) => {
  const [pokemonDetails, setPokemonDetailsLocal] = useState(null);
  const [PokemonDetailsLocalSpecies, setPokemonDetailsLocalSpecies] = useState(
    null
  );
  const [pokemonDetailsLoading, setPokemonDetailsLoading] = useState(false);

  const dispatch = useDispatch();

  const handlePokemonDetails = () => {
    axios
      .get(url)
      .then((response) => {
        setPokemonDetailsLocal(response.data);
        console.log("esse aqui léo:", response);
      })
      .then(() => {
        setPokemonDetailsLoading(true);
      })
      .catch((e) => console.log(e));
  };

  const handlePokemonDetailsSpecies = () => {
    axios
      .get(pokemonDetails.species.url)
      .then((response) => {
        setPokemonDetailsLocalSpecies(response.data);
        console.log("RESP SPECIES", response.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handlePokemonDetails();
  }, []);

  useEffect(() => {
    if (pokemonDetailsLoading) {
      handlePokemonDetailsSpecies();
    }
  }, [pokemonDetailsLoading]);

  return pokemonDetails && PokemonDetailsLocalSpecies ? (
    <TouchableOpacity
      onPress={() => {
        dispatch(setPokemonDetails({ pokemonUrl: url }));
        navigation.navigate("detailsScreen");
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: screenWidth * 0.96,
        height: 94,
        backgroundColor: PokemonDetailsLocalSpecies.color.name,
        borderRadius: 10,
        margin: 5,
        borderLeftWidth: 4,
        borderColor: "#fff",
      }}
    >
      <Text style={styles.pokemonName}>{name}</Text>
      <Image
        style={styles.pokemonImage}
        source={{
          uri: `${pokemonDetails.sprites.front_default}`,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  pokemonName: {
    fontSize: 32,
    fontFamily: "BebasNeue_400Regular",
    color: "#fff",
  },
  pokemonImage: {
    width: 90,
    height: 90,
  },
});

export default Pokemon;
