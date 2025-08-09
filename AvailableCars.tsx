import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const transportData = {
  Car: [
    {
      id: "1",
      name: "Swift Dzire",
      transmission: "Manual",
      seats: "4 seats",
      fuel: "Petrol",
      distance: "1.2km",
      time: "6 mins away",
      image: require("../assets/car.png"),
    },
    {
      id: "2",
      name: "Honda City",
      transmission: "Automatic",
      seats: "4 seats",
      fuel: "Petrol",
      distance: "2.0km",
      time: "10 mins away",
      image: require("../assets/car.png"),
    },
  ],
  Auto: [
    {
      id: "1",
      name: "Bajaj RE",
      transmission: "Manual",
      seats: "3 seats",
      fuel: "CNG",
      distance: "500m",
      time: "3 mins away",
      image: require("../assets/auto.png"),
    },
    {
      id: "2",
      name: "Piaggio Ape",
      transmission: "Manual",
      seats: "3 seats",
      fuel: "Diesel",
      distance: "1km",
      time: "5 mins away",
      image: require("../assets/auto.png"),
    },
  ],
  "Heavy Vehicle": [
    {
      id: "1",
      name: "Tata 407",
      transmission: "Manual",
      seats: "2 seats",
      fuel: "Diesel",
      distance: "2.5km",
      time: "12 mins away",
      image: require("../assets/truck.png"),
    },
  ],
  Others: [
    {
      id: "1",
      name: "E-Rickshaw",
      transmission: "Electric",
      seats: "4 seats",
      fuel: "Electric",
      distance: "1.1km",
      time: "7 mins away",
      image: require("../assets/taxi.png"),
    },
  ],
};

export default function AvailableCars() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const selectedVehicles = transportData[type as keyof typeof transportData] || [];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleBookThis = (car: any) => {
    setSelectedCar(car);
    Alert.alert("Please Wait", "Waiting for driver to confirm with a quote...");
    setTimeout(() => {
      const quote = Math.floor(100 + Math.random() * 400);
      Alert.alert(
        "Driver Quotation Received",
        `${car.name} is available.\nDriver quoted ₹${quote}.`,
        [
          {
            text: "Cancel Ride",
            style: "destructive",
            onPress: () => Alert.alert("Ride Cancelled", "You have cancelled the ride."),
          },
          {
            text: "Agree with Quote",
            onPress: () => router.push("/booking-success"),
          },
        ]
      );
    }, 3000);
  };

  const handleScheduleBooking = (car: any) => {
    setSelectedCar(car);
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, date?: Date) => {
    if (event.type === "set" && date) {
      const updatedDate = new Date(date);
      setSelectedDate(updatedDate);
      setShowDatePicker(false);
      if (Platform.OS === "android") setShowTimePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const onTimeChange = (event: any, time?: Date) => {
    if (event.type === "set" && time && selectedCar) {
      const updated = new Date(selectedDate);
      updated.setHours(time.getHours());
      updated.setMinutes(time.getMinutes());
      setShowTimePicker(false);
      router.push({
        pathname: "/booking-summary",
        params: {
          name: selectedCar.name,
          transmission: selectedCar.transmission,
          seats: selectedCar.seats,
          fuel: selectedCar.fuel,
          distance: selectedCar.distance,
          time: selectedCar.time,
          quotation: "To be decided",
          schedule: updated.toString(),
        },
      });
    } else {
      setShowTimePicker(false);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            {item.transmission} | {item.seats} | {item.fuel}
          </Text>
          <Text style={styles.distance}>
            <Ionicons name="location-outline" size={14} color="#555" />{" "}
            {item.distance} ({item.time})
          </Text>
        </View>
        <Image source={item.image} style={styles.carImage} />
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleBookThis(item)}
      >
        <Text style={styles.bookText}>Book This</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bookButton, styles.scheduleButton]}
        onPress={() => handleScheduleBooking(item)}
      >
        <Text style={styles.bookText}>Schedule Booking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available {type} Options</Text>
      <Text style={styles.subText}>{selectedVehicles.length} found</Text>

      <FlatList
        data={selectedVehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          minimumDate={new Date()}
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#f3b838",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  details: {
    fontSize: 13,
    color: "#777",
    marginVertical: 4,
  },
  distance: {
    fontSize: 13,
    color: "#555",
  },
  carImage: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bookButton: {
    marginTop: 12,
    borderRadius: 6,
    backgroundColor: "#f3b838",
    paddingVertical: 10,
    alignItems: "center",
  },
  scheduleButton: {
    backgroundColor: "#555",
    marginTop: 8,
  },
  bookText: {
    color: "#fff",
    fontWeight: "600",
  },
});
