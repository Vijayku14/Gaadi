import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OnboardingScreen3() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/onboarding3.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Book Your Vehicles</Text>

      <TouchableOpacity
        style={styles.goButton}
        onPress={() => router.push("/choose-role")}
      >
        <Text style={styles.goText}>Go</Text>
      </TouchableOpacity>
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
    marginBottom: 420,
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
