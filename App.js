import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./App/Routes/AppNavigation";
import { CartProvider } from "./Context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <AppNavigation />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
