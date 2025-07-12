import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

export default function EnableLocationScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleUseLocation = async () => {
    setLoading(true);

    try {
      // Ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to use this feature.");
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      console.log("Current Location:", location.coords);

      
      
    } catch (error) {
      Alert.alert("Error", "Could not fetch location.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.773972,
          longitude: -122.431297,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      />

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Image source={require("../assets/location.png")} style={styles.icon} />
        </View>

        <Text style={styles.title}>Enable your location</Text>
        <Text style={styles.subtitle}>Choose your location to start{'\n'}find the request around you</Text>

        <TouchableOpacity style={styles.useLocationBtn} onPress={handleUseLocation} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.useLocationText}>Use my location</Text>
          )}
        </TouchableOpacity>
        <Link href="./signup">Go2</Link>
            
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  iconCircle: {
    backgroundColor: "#ffeebe",
    borderRadius: 50,
    padding: 20,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#a75f28",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginVertical: 10,
  },
  useLocationBtn: {
    backgroundColor: "#f5aa1e",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  useLocationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  skipText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 20,
  },
});
