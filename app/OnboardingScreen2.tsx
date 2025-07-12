import { Ionicons } from "@expo/vector-icons"; // For arrow icon
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OnboardingScreen2() {
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require("../assets/onboarding2.png")}
        style={styles.image}
        resizeMode="contain"
      />
      {/* Text */}
      <Text style={styles.text}>At Any Time</Text>
<Link href="/OnboardingScreen3"></Link>
      {/* Arrow Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Ionicons name="arrow-forward" size={24} color="#fff" />
        <Link href="/OnboardingScreen3">Go1</Link>
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
    justifyContent: "space-between",
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 30,
  },
  skipText: {
    fontSize: 16,
    color: "#666",
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
    marginBottom: 120,
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
