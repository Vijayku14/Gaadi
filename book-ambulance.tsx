import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BookAmbulance() {
  const router = useRouter();
  const { vehicle } = useLocalSearchParams();

  const [patientName, setPatientName] = useState("");
  const [contact, setContact] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [quote, setQuote] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBooking = () => {
    if (!patientName || !contact || !hospitalName || !pickup || !drop) {
      Alert.alert("Missing Info", "Please fill all fields.");
      return;
    }

    // Simulate receiving a quote from ambulance driver
    const generatedQuote = Math.floor(Math.random() * 300) + 500; // ₹500–800
    setQuote(generatedQuote);
    setModalVisible(true);
  };

  const confirmBooking = () => {
    setModalVisible(false);
    router.push({
      pathname: "/BookingSuccess",
      params: {
        vehicle: String(vehicle),
        patientName,
        contact,
        hospitalName,
        pickup,
        drop,
        emergency: "true", // ✅ must be string
        quote: String(quote),
        timestamp: new Date().toISOString(),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Book Ambulance</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Patient's Name"
        value={patientName}
        onChangeText={setPatientName}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Hospital Name"
        value={hospitalName}
        onChangeText={setHospitalName}
      />

      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={setPickup}
      />

      <TextInput
        style={styles.input}
        placeholder="Drop Location"
        value={drop}
        onChangeText={setDrop}
      />

      <TouchableOpacity style={styles.emergencyButton} onPress={handleBooking}>
        <Ionicons name="warning" size={20} color="#fff" />
        <Text style={styles.buttonText}>Emergency Booking</Text>
      </TouchableOpacity>

      {/* ✅ Quotation Confirmation Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Driver Quote Received</Text>
            <Text style={styles.modalText}>Ambulance driver quote: ₹{quote}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.rejectBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.rejectText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn} onPress={confirmBooking}>
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff4d2",
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  emergencyButton: {
    flexDirection: "row",
    backgroundColor: "#e63946",
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  acceptBtn: {
    backgroundColor: "#2a9d8f",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  rejectBtn: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  acceptText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  rejectText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
});
