import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import { Link } from "expo-router";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
type Props = {
  navigation: NativeStackNavigationProp<any>;
};


export default function SignUpScreen({ navigation }:Props) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.phoneContainer}>
        <Picker
          selectedValue="+91"
          style={styles.picker}
          onValueChange={(value) => console.log(value)}
        >
          <Picker.Item label="🇧🇩 +880" value="+880" />
          <Picker.Item label="🇮🇳 +91" value="+91" />
        </Picker>
        <TextInput
          style={styles.phoneInput}
          placeholder="Your mobile number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      <Picker
        selectedValue={gender}
        style={styles.input}
        onValueChange={(value) => setGender(value)}
      >
        <Picker.Item label="Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <View style={styles.termsRow}>
        <Checkbox value={agreed} onValueChange={setAgreed} />
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.link}>Terms of service</Text> and{' '}
          <Text style={styles.link}>Privacy policy</Text>.
        </Text>
      </View>

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={24} color="black" />
        </TouchableOpacity>
        <Link href="/location">Go</Link>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.link}>Sign in</Text>
        </Text>
      </TouchableOpacity>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginVertical: 10
  },
  phoneContainer: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#ccc',
    borderRadius: 5, marginVertical: 10
  },
  picker: { width: 100 },
  phoneInput: { flex: 1, padding: 10 },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  termsText: { fontSize: 12, color: '#666', marginLeft: 10, flexShrink: 1 },
  link: { color: '#f39c12' },
  signUpButton: {
    backgroundColor: '#f39c12', padding: 12,
    borderRadius: 5, alignItems: 'center', marginVertical: 10
  },
  signUpButtonText: { color: '#fff', fontWeight: 'bold' },
  orText: { textAlign: 'center', marginVertical: 10 },
  socialContainer: {
    flexDirection: 'row', justifyContent: 'space-around',
    marginVertical: 10
  },
  socialButton: {
    padding: 10, borderRadius: 5,
    borderWidth: 1, borderColor: '#ccc'
  },
  signInText: { textAlign: 'center', marginTop: 20 }
});