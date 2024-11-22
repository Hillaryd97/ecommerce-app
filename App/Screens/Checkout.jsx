import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useCart } from "../../Context/CartContext";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "@expo/vector-icons/Entypo";
import CheckoutModal from "../Components/CheckoutModal";
const deliveryLocations = [
  { location: "Garki", price: 1000 },
  { location: "Maitama", price: 1500 },
  { location: "Wuse", price: 1200 },
  { location: "Asokoro", price: 1800 },
  { location: "Utako", price: 1300 },
  { location: "Jabi", price: 1400 },
  { location: "Gwarinpa", price: 1600 },
  { location: "Kubwa", price: 2000 },
  { location: "Lugbe", price: 1700 },
  { location: "Central Area", price: 1100 },
];

const Checkout = ({ navigation }) => {
  const { cart, getCartTotal, clearCart, getCartItemsCount } = useCart();
  const cartTotal = getCartTotal();
  const [value, setValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });
  const handleCheckout = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !value
    ) {
      alert("Please fill in all details and select a delivery location");
      return;
    }

    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    clearCart();
    navigation.navigate("Home");
  };
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Delivery Location
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.orderSummary}>
          <Text style={styles.sectionHeader}>Order Summary</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.summaryItem}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>₦{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.divider}></View>
          <View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total Quantity</Text>
              <Text style={styles.totalAmount}>{getCartItemsCount()}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total Price</Text>
              <Text style={styles.totalAmount}>
                ₦{getCartTotal().toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Delivery Fee</Text>
              <Text style={styles.totalAmount}>₦{value ? value : 0}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total with Delivery</Text>
              <Text style={styles.totalAmount}>
                {value ? `₦${(cartTotal + value).toFixed(2)}` : `₦${cartTotal}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Shipping Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
          />
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={deliveryLocations}
            search
            maxHeight={300}
            labelField="location"
            valueField="price"
            placeholder={!isFocus ? "Select Location" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.price);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Entypo
                style={styles.icon}
                color={isFocus ? "black" : "gray"}
                name="location-pin"
                size={20}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handleCheckout}
        >
          <Text style={styles.placeOrderButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
      <CheckoutModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        orderDetails={formData}
        deliveryFee={value || 0}
        totalPrice={cartTotal + (value || 0)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "start",
  },
  product: {
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
    margin: 6,
    borderRadius: 8,
    flex: 1,
  },
  category: {
    color: "#222",
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: 6,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    color: "#222",
    textAlign: "right",
    fontWeight: "bold",
    marginBottom: 6,
    marginRight: 6,
  },
  addButton: {
    backgroundColor: "#1B059E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
  },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cartItemImage: {
    width: 80,
    height: 80,
  },
  cartItemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B059E",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 18,
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    elevation: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#1B059E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#666",
  },
  orderSummary: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 6,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 18,
  },
  form: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  placeOrderButton: {
    backgroundColor: "#1B059E",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // dropdownContainer: {
  //   backgroundColor: "white",
  //   padding: 16,
  // },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    backgroundColor: "white",
    paddingBottom: 8,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Checkout;
