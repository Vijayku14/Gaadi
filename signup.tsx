import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRouter } from "expo-router";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { Button, LogBox, View } from "react-native"; // ⬅ Added View & Button
LogBox.ignoreLogs(["Failed to initialize reCAPTCHA Enterprise"]);

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "./firebaseConfig"; // ✅ Correct path (same folder)

export default function SignupScreen() {
  const router = useRouter();

  // ✅ States
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Recaptcha ref with proper type
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  // ✅ Send OTP
  const sendOtp = async () => {
    if (!name || !phone) {
      Alert.alert("Missing Info", "Please enter name and phone number.");
      return;
    }

    try {
      setLoading(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        `+91${phone}`,
        recaptchaVerifier.current!
      );
      setVerificationId(id);
      Alert.alert("OTP Sent", "Check your phone.");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    if (!verificationId) {
      Alert.alert("Error", "Missing verification ID. Please resend OTP.");
      return;
    }

    try {
      setLoading(true);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      Alert.alert("Success", "Phone verified!");

      // Navigate to booking screen
      router.push({
        pathname: "/book-vehicle",
        params: { name, phone },
      });
    } catch (err: any) {
      console.error(err);
      Alert.alert("Invalid OTP", err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <LottieView
        source={require("../assets/lottie/red-car-driver.json")}
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.heading}>Rider Signup</Text>

      <TextInput
        placeholder="Enter Your Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor="#555"
      />

      <TextInput
        placeholder="Enter Your Phone Number"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#555"
      />

      {verificationId ? (
        <>
          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            placeholderTextColor="#555"
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify & Continue</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <ActivityIndicator
          size="large"
          color="#ff5757"
          style={{ marginTop: 10 }}
        />
      )}

      {/* Test API Button */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Go to Test API"
          color="#007AFF"
          onPress={() => router.push("/TestAPI")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4d2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: -30,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#ff5757",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
