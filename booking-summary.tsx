import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookingSummaryScreen() {
  const router = useRouter();
  const { name, transmission, seats, fuel, distance } = useLocalSearchParams();

  const handleConfirmSchedule = () => {
    Alert.alert("Thank You!", "Your ride has been scheduled successfully.");
  };

  const handleCancel = () => {
    router.push("/CancellationSadModal");
  };

  const handleRideNow = () => {
    const rideId = Math.floor(100000 + Math.random() * 900000); // random 6-digit ride ID
    Alert.alert(
      "Ride Confirmed!",
      `Thank you! Your ride ID is #${rideId}.\n\nPlease wait while the vehicle reaches your location shortly.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking Summary</Text>
      <Text style={styles.item}>🚗 Car: {name}</Text>
      <Text style={styles.item}>⚙️ Transmission: {transmission}</Text>
      <Text style={styles.item}>🧍 Seats: {seats}</Text>
      <Text style={styles.item}>⛽ Fuel: {fuel}</Text>
      <Text style={styles.item}>📍 Distance: {distance}</Text>

      <View style={styles.buttonGroup}>
        

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmSchedule}>
          <Text style={styles.confirmText}>Confirm Schedule Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  item: {
    fontSize: 18,
    marginBottom: 15,
  },
  buttonGroup: {
    marginTop: 40,
  },
  
  rideNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
