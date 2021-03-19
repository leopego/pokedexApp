import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { pokemonApi } from "../../api";
import Pokemon from "../../components/pokemon";

const screenWidth = Dimensions.get("screen").width;

const HomeScreen = ({ navigation }) => {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    pokemonApi
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => setPokemonData(response.data.results))
      .catch((e) => console.log(e));
  }, []);

  if (!pokemonData) {
    return <Text>App is loading!</Text>;
  } else
    return (
      <SafeAreaView style={styles.pokemonListContainer}>
        <View style={styles.pokemonListTitleContainer}>
          <Text style={styles.pokemonListTitle}>Select a pokemon</Text>
          <Image
            style={styles.pokemonListTitleImage}
            source={{
              uri: "https://pngimg.com/uploads/pokeball/pokeball_PNG21.png",
            }}
          />
        </View>
        <FlatList
          data={pokemonData}
          renderItem={({ item }) => (
            <Pokemon name={item.name} url={item.url} navigation={navigation} />
          )}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  pokemonListContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 30,
  },
  pokemonListTitle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "BebasNeue_400Regular",
    fontSize: 26,
    padding: 4,
  },
  pokemonListTitleContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    borderRadius: 10,
  },
  pokemonListTitleImage: {
    marginLeft: 4,
    marginRight: 4,
    width: 20,
    height: 20,
  },
});

export default HomeScreen;
