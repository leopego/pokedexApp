import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectPokemonDetails } from "../../slices/pokemonDetailsSlice";

import axios from "axios";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const DetailsScreen = ({ navigation }) => {
  const pokemonDetailsURL = useSelector(selectPokemonDetails);

  const [pokemonDetailsLocal, setPokemonDetailsLocal] = useState(null);
  const [pokemonDetailsLocalSpecies, setPokemonDetailsLocalSpecies] = useState(
    null
  );
  const [pokemonDetailsLoading, setPokemonDetailsLoading] = useState(false);

  const handlePokemonDetails = () => {
    axios
      .get(pokemonDetailsURL)
      .then((response) => setPokemonDetailsLocal(response.data))
      .then(() => {
        setPokemonDetailsLoading(true);
      })
      .catch((e) => console.log(e));
  };

  const handlePokemonDetailsSpecies = () => {
    axios
      .get(pokemonDetailsLocal.species.url)
      .then((response) => {
        setPokemonDetailsLocalSpecies(response.data);
        console.log("RESP SPECIES", response.data);
      })
      .catch((e) => console.log(e));
  };

  useFocusEffect(
    React.useCallback(() => {
      handlePokemonDetails();
    }, [])
  );

  // Waiting the other API call finish.
  useFocusEffect(
    React.useCallback(() => {
      if (pokemonDetailsLoading) {
        handlePokemonDetailsSpecies();
      }
    }, [pokemonDetailsLoading])
  );

  return pokemonDetailsLocal && pokemonDetailsLocalSpecies ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: pokemonDetailsLocalSpecies.color.name,
      }}
    >
      <View style={styles.pokemonDetailsContainer}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.pokemonDetailsTitle}
        >
          {pokemonDetailsLocal.species.name}
        </Text>
        <Image
          style={styles.pokemonDetailsImage}
          source={{
            uri: `${pokemonDetailsLocal.sprites.front_default}`,
          }}
        />
      </View>
      <View style={styles.pokemonDetailsStatusContainer}>
        <View style={styles.pokemonDetailsStatusHabitatContainer}>
          <Text style={styles.pokemonDetailsStatusHabitatText}>
            {pokemonDetailsLocalSpecies.habitat.name}
          </Text>
        </View>
        <View style={styles.pokemonDetailsBothContainer}>
          <View style={styles.pokemonDetailsWeightContainer}>
            <Text style={styles.pokemonDetailsWeightTitle}>Capture Rate</Text>
            <Text style={styles.pokemonDetailsWeightText}>
              {pokemonDetailsLocalSpecies.capture_rate}
            </Text>
          </View>
          <View style={styles.pokemonDetailsWeightContainer}>
            <Text style={styles.pokemonDetailsWeightTitle}>Weight</Text>
            <Text style={styles.pokemonDetailsWeightText}>
              {pokemonDetailsLocal.weight}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <View style={styles.pokemonDetailsLoadingContainer}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonDetailsContainer: {
    display: "flex",
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  pokemonDetailsTitle: {
    fontSize: 40,
    fontFamily: "BebasNeue_400Regular",
    color: "#fff",
  },
  pokemonDetailsImage: {
    margin: 8,
    width: screenWidth * 0.8,
    height: screenHeight * 0.36,
    resizeMode: "contain",
  },
  pokemonDetailsStatusContainer: {
    display: "flex",
    flex: 0.7,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    alignItems: "center",
    padding: 22,
    justifyContent: "space-around",
  },
  pokemonDetailsStatusHabitatContainer: {
    height: screenHeight * 0.14,
    width: screenWidth * 0.86,
    backgroundColor: "#EFEFEF",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pokemonDetailsStatusHabitatText: {
    fontSize: 60,
    fontFamily: "BebasNeue_400Regular",
    color: "#424242",
  },
  pokemonDetailsBothContainer: {
    flexDirection: "row",
    height: screenHeight * 0.14,
    width: screenWidth * 0.86,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pokemonDetailsWeightContainer: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 18,
    width: screenWidth * 0.4,
    height: screenHeight * 0.14,
    backgroundColor: "#EFEFEF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pokemonDetailsLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  pokemonDetailsWeightTitle: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 26,
    color: "#424242",
  },
  pokemonDetailsWeightText: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 46,
    color: "#424242",
  },
});

export default DetailsScreen;
