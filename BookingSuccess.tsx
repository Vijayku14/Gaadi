import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';

export default function BookingSuccess() {
  const router = useRouter();

  const bookingId = 'ABC123'; // You can replace this with a real booking ID

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push({
        pathname: '/RideInProgress',
        params: { bookingId },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* ✅ Tick with bounce animation */}
      <Animated.Text entering={BounceIn} style={styles.tick}>
        ✅
      </Animated.Text>

      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>Thank you for renting with us.</Text>
      <Text style={styles.note}>Redirecting to your ride...</Text>

      <ActivityIndicator size="large" color="#f1a12f" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  tick: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    color: '#2e7d32' 
  },
  subtitle: { 
    fontSize: 16, 
    color: 'gray', 
    marginBottom: 8 
  },
  note: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
});
