import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookingSuccess() {
  const { vehicle, pickup, drop, date, quotation } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Booking Confirmed!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Vehicle:</Text>
        <Text style={styles.value}>{vehicle}</Text>

        <Text style={styles.label}>Pickup Location:</Text>
        <Text style={styles.value}>{pickup}</Text>

        <Text style={styles.label}>Drop Location:</Text>
        <Text style={styles.value}>{drop}</Text>

        <Text style={styles.label}>Scheduled Time:</Text>
        <Text style={styles.value}>
          {new Date(date as string).toLocaleString()}
        </Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>₹{quotation}</Text>
      </View>

      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => router.push("/CallingScreen")}
      >
        <Text style={styles.buttonText}>📞 Connect with Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff4d2", // Updated to match your app's theme
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#555",
  },
  value: {
    fontSize: 17,
    color: "#000",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#a75f28",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  connectButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
