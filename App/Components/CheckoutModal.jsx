import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CheckoutModal = ({
  isVisible,
  onClose,
  orderDetails,
  deliveryFee,
  totalPrice,
}) => {
  const [copied, setCopied] = useState(false);

  const bankAccount = {
    name: "Ruby Electronics Ltd",
    accountNumber: "00667576861",
    bank: "Zenith Bank",
  };

  const copyToClipboard = () => {
    Clipboard.setString(bankAccount.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Order Confirmation</Text>

          <View style={styles.orderSection}>
            <Text style={styles.sectionTitle}>Shipping Details</Text>
            <Text>Name: {orderDetails.name}</Text>
            <Text>Email: {orderDetails.email}</Text>
            <Text>Phone: {orderDetails.phone}</Text>
            <Text>Address: {orderDetails.address}</Text>
            <Text>City: {orderDetails.city}</Text>
          </View>

          <View style={styles.orderSection}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal:</Text>
              <Text>₦{(totalPrice - deliveryFee).toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery Fee:</Text>
              <Text>₦{deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalText}>₦{totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Instructions</Text>
            <Text>Please make a bank transfer to:</Text>
            <View style={styles.bankDetails}>
              <Text>Bank: {bankAccount.bank}</Text>
              <Text>Account Name: {bankAccount.name}</Text>
              <View style={styles.accountNumberContainer}>
                <Text>Account Number: {bankAccount.accountNumber}</Text>
                <TouchableOpacity onPress={copyToClipboard}>
                  <Ionicons
                    name={copied ? "checkmark" : "copy-outline"}
                    size={20}
                    color="#1B059E"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.noteText}>
              * Kindly include your name as the payment reference
            </Text>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  orderSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalText: {
    fontWeight: "bold",
  },
  paymentSection: {
    marginBottom: 15,
  },
  bankDetails: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  accountNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    fontStyle: "italic",
  },
  confirmButton: {
    backgroundColor: "#1B059E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutModal;
