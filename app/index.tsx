
import { Link } from "expo-router";

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.appName}>Gaadi</Text>
      <Link href="/OnboardingScreen">Go to OnBoard</Link>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC800", // Bright yellow
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  loader: {
    marginTop: 30,
  },
});
