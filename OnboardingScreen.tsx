import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.push("/OnboardingScreen2")}
      >
        
      </TouchableOpacity>

      {/* Illustration */}
      <Image
        source={require("../assets/taxi-onboarding.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Tagline Text just below image */}
      <Text style={styles.text}>Anywhere you are</Text>

      {/* Arrow Button that navigates */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push("/OnboardingScreen2")}
      >
        <Ionicons name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    alignItems: "center",
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 30,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  image: {
    width: "90%",
    height: 300,
    marginTop: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
    marginTop: 20,
  },
  nextButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#a75f28",
    borderRadius: 50,
    padding: 20,
    borderWidth: 3,
    borderColor: "#ffe889",
  },
});
