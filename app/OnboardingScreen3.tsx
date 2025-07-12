import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen3() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     

      {/* Illustration */}
      <Image
        source={require("../assets/onboarding3.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={styles.title}>Book Your Vehicles</Text>
<Link href="/location">Go</Link>
      {/* Go Button */}
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
    marginBottom: 120,
  },
  goButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#a75f28",
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: "#ffe889",
  },
  goText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
