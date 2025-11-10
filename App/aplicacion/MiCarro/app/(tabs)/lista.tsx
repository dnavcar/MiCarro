// src/screens/CartScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function Lista() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      name: "Tomates Cherry",
      description: "250g - Frescos",
      price: 2.49,
      quantity: 1,
      image: "https://cdn.pixabay.com/photo/2018/03/06/13/56/tomatoes-3208605_1280.jpg",
    },
  ]);

  const handleIncrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Mercadona</Text>
        <View style={styles.notificationCircle}>
          <Text style={styles.notificationText}>{cart.length}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Product cards */}
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>

              <Text style={styles.itemPrice}>
                €{item.price.toFixed(2)}{" "}
                <Text style={styles.quantityText}>× {item.quantity}</Text>
              </Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => handleDecrease(item.id)}
                >
                  <Ionicons name="remove" size={16} color="#007B2E" />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => handleIncrease(item.id)}
                >
                  <Ionicons name="add" size={16} color="#007B2E" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemove(item.id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#E53935" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.itemTotal}>€{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              Subtotal ({cart.length} item{cart.length > 1 ? "s" : ""})
            </Text>
            <Text style={styles.summaryText}>€{subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Envío</Text>
            <Text style={styles.summaryText}>Gratis</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>€{subtotal.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Proceder al pago</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.keepShoppingButton}>
            <Text style={styles.keepShoppingText}>Seguir comprando</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007B2E",
  },
  notificationCircle: {
    backgroundColor: "#E52D2D",
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontWeight: "600",
    fontSize: 15,
  },
  itemDescription: {
    color: "#777",
    fontSize: 12,
    marginBottom: 4,
  },
  itemPrice: {
    color: "#007B2E",
    fontWeight: "600",
    fontSize: 13,
  },
  quantityText: {
    color: "#777",
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: "#007B2E",
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  qtyText: {
    marginHorizontal: 10,
    fontWeight: "600",
  },
  deleteButton: {
    marginLeft: 10,
  },
  itemTotal: {
    fontWeight: "600",
    color: "#333",
    fontSize: 14,
  },
  summary: {
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryText: {
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007B2E",
  },
  payButton: {
    backgroundColor: "#007B2E",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 8,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 6,
  },
  keepShoppingButton: {
    borderColor: "#007B2E",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  keepShoppingText: {
    color: "#007B2E",
    fontWeight: "500",
  },
});