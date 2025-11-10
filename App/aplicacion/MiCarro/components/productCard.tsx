import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from './cartContext'

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
};

type Props = {
  product: Product;
  onAdd?: (product: Product) => void;
  onDetails?: (product: Product) => void;
};

export default function ProductCard({ product, onAdd, onDetails }: Props) {
  const { contains, toggle } = useCart()
  const inCart = contains(product.name)
  return (
    <View style={styles.card}>
      {/* Imagen */}
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{product.price}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity onPress={() => onDetails?.(product)}>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>Ver detalles</Text>
            <Ionicons name="information-circle-outline" size={14} color="#007B2E" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addButton, inCart ? styles.removeButton : undefined]}
          onPress={async () => {
            // toggle presence in cart (add -> calls prediction inside context)
            await toggle(product.name)
            // still call external handler if provided
            onAdd?.(product)
          }}
        >
          <Ionicons name={inCart ? "trash" : "add"} size={18} color="#fff" />
          <Text style={styles.addText}>{inCart ? 'Eliminar' : 'Añadir'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    width: 180,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 10,
  },
  imageContainer: {
    height: 120,
    backgroundColor: "#f3f3f3",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  priceTag: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#007B2E",
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  priceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  description: {
    color: "#777",
    fontSize: 13,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailsText: {
    color: "#007B2E",
    fontSize: 13,
    marginRight: 4,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#007B2E",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  removeButton: {
    backgroundColor: '#A30000',
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
});