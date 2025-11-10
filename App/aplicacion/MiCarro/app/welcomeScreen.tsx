import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  function handleSkip() {
    // Navigate to the compra route when user enters without login
    // push into the (tabs) group where compra is defined
    router.replace ('/(tabs)/compra');
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Mercadona</Text>
        <Text style={styles.subtitle}>Tu tienda al alcance</Text>
      </View>

      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <View style={styles.qrBox}>
          <Image 
            source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=Mercadona' }}
            style={styles.qrImage}
          />
        </View>
        
        <Text style={styles.qrText}>
          Escanea este código con tu app de{'\n'}Mercadona para vincular tu cuenta
        </Text>
      </View>

      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingDot} />
      </View>

      {/* Manual Login Button */}
      <TouchableOpacity style={styles.manualLoginButton}>
        <View style={styles.lockIcon}>
          <View style={styles.lockBody} />
          <View style={styles.lockShackle} />
        </View>
        <Text style={styles.manualLoginText}>Iniciar sesión manualmente</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Continue Without Login Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleSkip} accessibilityLabel="Entrar sin iniciar sesión">
        <Text style={styles.continueButtonText}>Entrar sin iniciar sesión</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>
        Puedes explorar productos y crear tu lista de compra sin estar conectado.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00A651',
    marginBottom: 4,
    fontFamily: 'ChunkFive',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrBox: {
    width: 200,
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
  },
  qrText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  manualLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#00A651',
    borderRadius: 8,
    marginBottom: 20,
  },
  lockIcon: {
    width: 16,
    height: 18,
    marginRight: 8,
    position: 'relative',
  },
  lockBody: {
    position: 'absolute',
    bottom: 0,
    left: 2,
    width: 12,
    height: 10,
    backgroundColor: '#00A651',
    borderRadius: 2,
  },
  lockShackle: {
    position: 'absolute',
    top: 0,
    left: 4,
    width: 8,
    height: 8,
    borderWidth: 2,
    borderColor: '#00A651',
    borderRadius: 4,
    borderBottomWidth: 0,
  },
  manualLoginText: {
    fontSize: 15,
    color: '#00A651',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#999',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A651',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  continueButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});