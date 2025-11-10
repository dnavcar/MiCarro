import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../components/cartContext'
import { products } from '../../data/data'

const TAB_BAR_HEIGHT = 64;
const OVERLAY_HEIGHT = 100;

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={() => ({
          sceneStyle: {
            backgroundColor: 'white',
            // leave space at bottom so tab bar and overlay do not cover screen content
            
          },
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: 'white',
          tabBarStyle: {
            paddingTop: 6,
            paddingBottom: 6,
            paddingHorizontal: 4,
            backgroundColor: 'white',
            height: TAB_BAR_HEIGHT,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // subtle top border and shadow to separate content
            borderTopWidth: 1,
            borderTopColor: 'rgba(0,0,0,0.06)',
            // iOS shadow upwards
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            // Android elevation
            elevation: 6,
            position: 'relative',
          },
          tabBarItemStyle: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 2,
          },
          tabBarActiveTintColor: '#007A33',
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            marginBottom: 0,
          },
        })}
      >
        <Tabs.Screen
          name="mapa"
          options={{
            title: 'Mapa',
            tabBarIcon: ({ color }) => (
              <Ionicons name="map-outline" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="compra"
          options={{
            title: 'Compra',
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lista"
          options={{
            title: 'Lista',
            tabBarIcon: ({ color }) => (
              <Ionicons name="list-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ayuda"
          options={{
            title: 'Ayuda',
            tabBarIcon: ({ color }) => (
              <Ionicons name="help-circle-outline" size={22} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Persistent overlay box right above the tab bar showing recommended product */}
      <View style={styles.overlay} pointerEvents="box-none">
        <RecommendedCard />
      </View>
    </View>
  );
}

function RecommendedCard() {
  const { lastPrediction } = useCart()
  if (!lastPrediction) return null

  const found = products.find((p) => p.name === lastPrediction)
  if (!found) return (
    <View style={styles.emptyWrap} pointerEvents="none">
      <Text style={styles.emptyText}>No hay recomendación disponible</Text>
    </View>
  )

  return (
    <TouchableOpacity style={styles.cardWrap} activeOpacity={0.9} onPress={() => { /* future: open details */ }}>
      <Image source={{ uri: found.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text numberOfLines={1} style={styles.cardTitle}>{found.name}</Text>
        <Text numberOfLines={1} style={styles.cardPrice}>{found.price}</Text>
        <Text numberOfLines={1} style={styles.cardDesc}>{found.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: OVERLAY_HEIGHT,
    bottom: TAB_BAR_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  emptyText: {
    color: '#666',
    fontSize: 12,
  },
  cardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
  },
  cardPrice: {
    fontSize: 14,
    color: '#007A33',
    fontWeight: '800',
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});