import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, Text } from "@react-navigation/native";
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";

import HomeRoute from "./src/routes/homeRoute";

export default App = () => {
  let [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  return (
    fontsLoaded && (
      <NavigationContainer>
        <HomeRoute />
      </NavigationContainer>
    )
  );
};
