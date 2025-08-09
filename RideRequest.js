import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function RideRequest() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const submitRideRequest = async () => {
    try {
      const response = await fetch("http://10.149.254.47:5000/api/ride-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          destination,
          location: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Ride request submitted successfully!");
      } else {
        Alert.alert("Error", data.error || "Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Request Form</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Destination" value={destination} onChangeText={setDestination} />
      <TextInput style={styles.input} placeholder="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="numeric" />
      <Button title="Submit" onPress={submitRideRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
});
