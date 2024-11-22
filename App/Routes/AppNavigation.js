import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Home from "../Screens/Home";
import Cart from "../Screens/Cart";
import Checkout from "../Screens/Checkout";
import { useCart } from "../../Context/CartContext";
const Stack = createStackNavigator();

const AppNavigation = () => {
  const { getCartItemsCount } = useCart();
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerTitle: `Cart (₦{getCartItemsCount()})`, // Dynamically set the header title
          }}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
