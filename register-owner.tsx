import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebaseConfig'; // ✅ Make sure path is correct

export default function RegisterOwnerScreen() {
  const router = useRouter();
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [agree, setAgree] = useState(false);
  const [vehicleImage, setVehicleImage] = useState('');
  const [licenseImage, setLicenseImage] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async (setImage: Function) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const sendOtp = async () => {
    if (!name || !phone || !email || !password || !aadhar || !vehicleNo || !fuelType || !vehicleImage || !licenseImage) {
      Alert.alert('All fields are required!');
      return;
    }

    if (!agree) {
      Alert.alert('You must agree to the terms and privacy policy.');
      return;
    }

    try {
      setLoading(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(`+91${phone}`, recaptchaVerifier.current!);
      setVerificationId(id);
      Alert.alert("OTP Sent", "Check your phone.");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!verificationId) {
      Alert.alert("Error", "Missing verification ID.");
      return;
    }

    try {
      setLoading(true);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      Alert.alert("Success", "Phone verified. Registration Complete.");
      router.push('/owner-dashboard');
    } catch (error: any) {
      console.error(error);
      Alert.alert("Invalid OTP", error.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <Text style={styles.title}>Vehicle Owner Registration</Text>

      <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TextInput placeholder="Aadhar Number" keyboardType="number-pad" style={styles.input} value={aadhar} onChangeText={setAadhar} />
      <TextInput placeholder="Vehicle Registration Number" style={styles.input} value={vehicleNo} onChangeText={setVehicleNo} />
      <TextInput placeholder="Fuel Type (e.g. Petrol, Diesel, EV)" style={styles.input} value={fuelType} onChangeText={setFuelType} />

      <Text style={styles.label}>Upload Vehicle Image:</Text>
      {vehicleImage ? <Image source={{ uri: vehicleImage }} style={styles.image} /> : null}
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setVehicleImage)}>
        <Text style={styles.uploadText}>Select Vehicle Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Upload Driving License:</Text>
      {licenseImage ? <Image source={{ uri: licenseImage }} style={styles.image} /> : null}
      <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setLicenseImage)}>
        <Text style={styles.uploadText}>Select License Image</Text>
      </TouchableOpacity>

      <View style={styles.termsRow}>
        <Checkbox value={agree} onValueChange={setAgree} />
        <Text style={styles.termsText}>I agree to the <Text style={styles.link}>Terms</Text> and <Text style={styles.link}>Privacy Policy</Text></Text>
      </View>

      {!verificationId ? (
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify & Register</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && (
        <ActivityIndicator size="large" color="#f39c12" style={{ marginTop: 10 }} />
      )}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 14, marginBottom: 15, fontSize: 16
  },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
  termsText: { fontSize: 13, color: '#555', flex: 1 },
  link: { color: '#f39c12', fontWeight: 'bold' },
  button: {
    backgroundColor: '#f39c12', padding: 15,
    borderRadius: 8, alignItems: 'center', marginBottom: 10
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { textAlign: 'center', color: '#666', marginTop: 10 },
  label: { fontSize: 15, fontWeight: '600', color: '#444', marginBottom: 5 },
  uploadButton: {
    borderColor: '#ccc', borderWidth: 1,
    borderRadius: 8, padding: 12,
    alignItems: 'center', marginBottom: 15
  },
  uploadText: { color: '#333', fontSize: 15 },
  image: { width: '100%', height: 180, resizeMode: 'contain', marginBottom: 10, borderRadius: 8 },
});
