import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sign in</Text>

      <TextInput
        placeholder="Enter Phone Number"
        placeholderTextColor="#aaa"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!passwordVisible}
          style={[styles.input, { flex: 1, borderWidth: 0 }]}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forget password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.push('/choose-role')}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <Image source={require('../assets/google.png')} style={styles.icon} />
        <Image source={require('../assets/facebook.png')} style={styles.icon} />
        <Image source={require('../assets/apple.png')} style={styles.icon} />
      </View>

      <Text style={styles.signUpText}>
        Don’t have an account?
        <TouchableOpacity onPress={() => router.push('/signup')}>
  <Text style={styles.signUpLink}> Sign Up</Text>
</TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    paddingTop: 60,
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: '#111',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: 'red',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#f2b203',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  signInText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
  },
  signUpLink: {
    color: '#f2b203',
    fontWeight: '600',
  },
});
