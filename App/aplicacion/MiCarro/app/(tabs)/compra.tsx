import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import ProductCard from '../../components/productCard'
import { products } from '../../data/data'
import { useCart } from '../../components/cartContext'
import { predecirSiguiente } from '../../components/prediction'

export default function ProductListScreen() {
  const [loading, setLoading] = useState(false)
  const [predicted, setPredicted] = useState<string | null>(null)
  const { items } = useCart()

  async function handlePredict() {
    try {
      setLoading(true)
      const siguiente = await predecirSiguiente(items)
      setPredicted(siguiente)
      Alert.alert('Predicción', `Siguiente producto recomendado: ${siguiente}`)
    } catch (err) {
      console.error('Error al predecir:', err)
      Alert.alert('Error', 'No se pudo obtener la predicción.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        {predicted ? <Text style={styles.predictedText}>Sugerido: {predicted}</Text> : null}
      </View>

      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={{ id: item.id, name: item.name, description: item.description, price: item.price, image: item.image }}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerRow: {
    width: '100%',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  predictButton: {
    backgroundColor: '#007A33',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  predictButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  predictedText: {
    marginLeft: 12,
    color: '#333',
    fontWeight: '600',
  },
})