import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, Image, TouchableOpacity } from 'react-native'
import 'react-native-reanimated'
import { CartProvider } from '../components/cartContext'

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <CartProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: '#000',
            },
            headerStyle: {
              backgroundColor: 'green',
            },
            headerTitle: 'MiCarro',
            headerTitleStyle: {
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity activeOpacity={0.9} style={{ marginRight: 18 }}>
                <Image
                  source={require('../assets/images/image.png')}
                  style={{ width: 200, height: 56, borderRadius: 10 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ),
            
          }}
        />
      </CartProvider>
    </View>
  )
}