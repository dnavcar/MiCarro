import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video } from 'expo-av'

const { width } = Dimensions.get('window')

export default function Mapa() {
  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/images/Video de WhatsApp 2025-11-10 a las 16.22.00_be88ea59.mp4')}
        style={styles.video}
        shouldPlay
        isLooping
       
        useNativeControls={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: width - 24,
    height: (width - 24) * (9 / 16),
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
})