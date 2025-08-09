import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyOtpScreen() {
  const { name, phone } = useLocalSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Missing OTP", "Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://your-api.com/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (data.verified) {
        // OTP verified – continue to next screen
        router.push({
          pathname: "/book-vehicle",
          params: { name, phone },
        });
      } else {
        Alert.alert("Invalid OTP", "Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Verification failed.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP sent to {phone}</Text>
      <TextInput
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff4d2",
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 14,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff5757",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
