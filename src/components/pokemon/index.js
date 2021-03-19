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
  const dispatch = useDispatch();

  const handlePokemonDetails = () => {
    axios
      .get(url)
      .then((response) => setPokemonDetailsLocal(response.data))
      .catch((e) => console.log("error leo"));
  };

  useEffect(() => {
    handlePokemonDetails();
  }, [url]);

  return pokemonDetails != null ? (
    <TouchableOpacity
      onPress={() => {
        dispatch(setPokemonDetails({ pokemonUrl: url }));
        navigation.navigate("detailsScreen");
      }}
      style={styles.pokemonContainer}
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
  pokemonContainer: {
    flexDirection: "row",
    borderWidth: 4,
    borderColor: "#700",
    alignItems: "center",
    justifyContent: "space-around",
    width: screenWidth * 0.96,
    height: 94,
    backgroundColor: "#f00",
    borderRadius: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
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
