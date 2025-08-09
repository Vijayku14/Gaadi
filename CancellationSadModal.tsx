import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function CancellationSadModalScreen() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/'); // Navigate to Home screen
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeIcon} onPress={handleBackHome}>
          <Ionicons name="close" size={22} color="#777" />
        </TouchableOpacity>

        <Text style={styles.emoji}>😓</Text>

        <Text style={styles.title}>We're so sad about your cancellation</Text>
        <Text style={styles.subtitle}>
          We will continue to improve our service &{'\n'}
          satisfy you on the next trip.
        </Text>

        <TouchableOpacity style={styles.homeBtn} onPress={handleBackHome}>
          <Text style={styles.homeText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  homeBtn: {
    backgroundColor: '#fdbb2d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  homeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
