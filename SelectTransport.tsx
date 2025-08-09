import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ Static transport types with images
const transportOptions = [
  {
    id: "1",
    title: "Car",
    image: require("../assets/car.png"),
  },
  {
    id: "2",
    title: "Auto",
    image: require("../assets/auto.png"),
  },
  {
    id: "3",
    title: "Heavy Vehicle",
    image: require("../assets/truck.png"),
  },
  {
    id: "4",
    title: "Ambulance",
    image: require("../assets/ambulance.png"),
  },
  {
    id: "5",
    title: "Others",
    image: require("../assets/taxi.png"),
  },
];

export default function SelectTransport() {
  const router = useRouter();

  const handleSelect = (item: any) => {
    if (item.title === "Ambulance") {
      router.push("/book-ambulance"); // ✅ Route to dedicated ambulance screen
    } else {
      router.push({
        pathname: "/AvailableCars",
        params: {
          type: item.title,
        },
      });
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
        <Text style={styles.headerText}>SelectTransport</Text>
      </View>

      <FlatList
        data={transportOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4d2",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "48%",
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
