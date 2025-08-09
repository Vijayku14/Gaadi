// app/book-vehicle.tsx
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function BookVehicleScreen() {
  const router = useRouter();
  const { name, phone } = useLocalSearchParams();
  const [location, setLocation] = useState<any>(null);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to proceed.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleInstantRide = () => {
    if (!destination) {
      Alert.alert("Missing Info", "Please enter your destination.");
      return;
    }

    router.push({
      pathname: "/SelectTransport",
      params: {
        name,
        phone,
        destination,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  const handleScheduleRide = () => {
    if (!destination) {
      Alert.alert("Missing Info", "Please enter your destination.");
      return;
    }

    router.push({
      pathname: "/schedule-booking",
      params: {
        name,
        phone,
        destination,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book Your Vehicle</Text>
      <Text style={styles.sub}>Welcome, {name}! 📱 {phone}</Text>

      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter your destination"
        value={destination}
        onChangeText={setDestination}
      />

      <TouchableOpacity style={styles.instantBtn} onPress={handleInstantRide}>
        <Text style={styles.buttonText}>Instant Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.scheduleBtn} onPress={handleScheduleRide}>
        <Text style={styles.buttonText}>Schedule Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff4d2", // ← updated to match choose-role screen
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sub: {
    fontSize: 14,
    marginBottom: 10,
    color: "#444",
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  instantBtn: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  scheduleBtn: {
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
