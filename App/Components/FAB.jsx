import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { useCart } from "../../Context/CartContext";

const FAB = ({ onPress }) => {
  const {getCartItemsCount } = useCart();

  const cartCount = getCartItemsCount();
  console.log(cartCount);
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <View style={styles.iconContainer}>
        <FontAwesome6 name="cart-shopping" size={24} color="white" />
        {cartCount > 0 && (
          <View style={styles.cartTotalContainer}>
            <Text style={styles.cartTotal}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "#1B059E",
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    zIndex: 10,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cartTotal: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  cartTotalContainer: {
    backgroundColor: "red",
    borderRadius: 12,
    position: "absolute",
    minWidth: 24,
    height: 24,
    paddingHorizontal: 6,
    top: -12,
    right: -12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FAB;
