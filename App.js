import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { Provider } from "react-redux";
import store from "./src/store";

import HomeRoute from "./src/routes/homeRoute";

export default App = () => {
  let [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  return (
    fontsLoaded && (
      <Provider store={store}>
        <NavigationContainer>
          <HomeRoute />
        </NavigationContainer>
      </Provider>
    )
  );
};
