import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/homeScreen";
import detailsScreen from "../screens/detailsScreen";

const Stack = createStackNavigator();

const HomeRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="detailsScreen" component={detailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeRoute;
