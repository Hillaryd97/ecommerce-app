import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

import { useCart } from "../../Context/CartContext";
import FAB from "../Components/FAB";
import { getProducts } from "../Utils/getProducts";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { addToCart, getCartItemsCount } = useCart();
  const navigation = useNavigation();
  console.log(getCartItemsCount());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setData(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ flex: 1, margin: 0 }}>
      <View style={[styles.product]}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={{ elevation: 4, height: 150, paddingHorizontal: 20 }}
        />
        <View>
          <Text
            style={{
              color: "#222",
              textAlign: "center",
              textTransform: "uppercase",
              marginBottom: 6,
              marginTop: 12,
            }}
          >
            {item.category}
          </Text>
          <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 10 }}>
            {item.title.length > 35
              ? `${item.title.slice(0, 35)}...`
              : item.title}
          </Text>

          <Text
            style={{
              color: "#222",
              textAlign: "right",
              fontWeight: "bold",
              marginBottom: 6,
              marginRight: 6,
            }}
          >
            ₦{item.price}
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              addToCart(item);
              // alert("Item added to cart!");
            }}
          >
            <FontAwesome name="plus" size={14} color="white" />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View>
          <Text style={styles.header}>Home</Text>
        </View>
        <View style={{ padding: 8 }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 150 }}
              numColumns={2}
            />
          )}
        </View>
        <FAB
          onPress={() => navigation.navigate("Cart")}
          getCartItemsCount={getCartItemsCount}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  productCategory: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  product: {
    backgroundColor: "white",
    elevation: 2,
    padding: 6,
    margin: 6,
  },
  addButton: {
    backgroundColor: "#1B059E",
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 6,
  },
});
