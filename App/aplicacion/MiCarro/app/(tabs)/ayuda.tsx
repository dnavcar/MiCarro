import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { JSX } from "react/jsx-runtime";

type HelpItem = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  onPress?: () => void;
};

export default function Ayuda() {
  const helpItems: HelpItem[] = [
    {
      id: "1",
      title: "¿Cómo comprar?",
      description: "Aprende a usar la app y completar una compra",
      icon: <Ionicons name="help-circle-outline" size={24} color="#007B2E" />,
    },
    {
      id: "2",
      title: "Información de envío",
      description: "Conoce nuestras opciones y tiempos de entrega",
      icon: <MaterialIcons name="local-shipping" size={24} color="#007B2E" />,
    },
    {
      id: "3",
      title: "Devoluciones",
      description: "Política de devoluciones segura y sencilla",
      icon: <FontAwesome5 name="undo" size={20} color="#007B2E" />,
    },
    {
      id: "4",
      title: "Privacidad y seguridad",
      description: "Cómo protegemos tu información",
      icon: <Ionicons name="lock-closed-outline" size={22} color="#007B2E" />,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Mercadona</Text>
        <View style={styles.notificationCircle}>
          <Text style={styles.notificationText}>1</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Centro de Ayuda</Text>

        {helpItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card} onPress={item.onPress}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#555" />
          </TouchableOpacity>
        ))}
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
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});