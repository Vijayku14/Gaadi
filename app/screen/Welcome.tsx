import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Rider</Text>
      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.primaryText}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondaryText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 40 },
  primaryBtn: {
    backgroundColor: '#f5aa1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: 200,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: 'bold' },
  secondaryBtn: {
    borderColor: '#f5aa1e',
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  secondaryText: { color: '#f5aa1e', fontWeight: 'bold' },
});
