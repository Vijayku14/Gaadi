import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const upiOptions = [
  { id: 'gpay', name: 'Google Pay', logo: require('../assets/google.png') },
  { id: 'phonepe', name: 'PhonePe', logo: require('../assets/google.png') },
  { id: 'paytm', name: 'Paytm', logo: require('../assets/google.png') },
];

export default function PaymentScreen() {
  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const router = useRouter();

  const handlePayNow = () => {
    if (!selectedUpi) {
      Alert.alert('Please select a UPI method first');
      return;
    }

    // Simulate payment
    Alert.alert('Payment Success', `Payment done via ${selectedUpi}`, [
      {
        text: 'OK',
        onPress: () => router.replace('/ReviewModal'),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select UPI Method</Text>

      {upiOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.upiOption,
            selectedUpi === option.id && styles.selectedOption,
          ]}
          onPress={() => setSelectedUpi(option.id)}
        >
          <Image source={option.logo} style={styles.upiLogo} />
          <Text style={styles.upiText}>{option.name}</Text>
          {selectedUpi === option.id && (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          )}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  upiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  selectedOption: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  upiLogo: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
  upiText: {
    fontSize: 16,
    flex: 1,
  },
  payButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 30,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
