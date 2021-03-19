import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { selectPokemonDetails } from "../../slices/pokemonDetailsSlice";

const DetailsScreen = () => {
  const pokemonDetailsURL = useSelector(selectPokemonDetails);

  return (
    <View>
      <Text>{pokemonDetailsURL}</Text>
    </View>
  );
};

export default DetailsScreen;
