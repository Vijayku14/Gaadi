import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define user roles
const roleOptions = [
  { id: "1", label: "Customer", value: "rider", icon: "person" },
  { id: "2", label: "Vehicle Owner", value: "owner", icon: "car" },
];

export default function ChooseRoleScreen() {
  const router = useRouter();
  const [expandedRole, setExpandedRole] = useState<null | string>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const submenuHeightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleSubmenu = (role: string) => {
    if (expandedRole === role) {
      Animated.timing(submenuHeightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpandedRole(null));
    } else {
      setExpandedRole(role);
      Animated.timing(submenuHeightAnim, {
        toValue: 160,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleNewUser = (role: string) => {
    if (role === "rider") {
      router.push({ pathname: "/signup", params: { role } });
    } else {
      router.push("/register-owner");
    }
  };

  const handleDashboard = (role: string) => {
    if (role === "rider") {
      router.push("/book-vehicle");
    } else {
      router.push("/owner-dashboard");
    }
  };

  const renderRoleItem = ({ item }: { item: typeof roleOptions[0] }) => (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => toggleSubmenu(item.value)}>
        <Ionicons name={item.icon as any} size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>{item.label}</Text>
      </TouchableOpacity>

      {expandedRole === item.value && (
        <Animated.View style={[styles.subMenu, { height: submenuHeightAnim }]}>
          <TouchableOpacity style={styles.subButtonNew} onPress={() => handleNewUser(item.value)}>
            <Text style={styles.subButtonText}>🆕 New User</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subButtonDash} onPress={() => handleDashboard(item.value)}>
            <Text style={styles.subButtonText}>📋 Dashboard for Existing User</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/lottie/red-car-driver.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>Choose Your Role</Text>

        <FlatList
          data={roleOptions}
          renderItem={renderRoleItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ width: "100%", alignItems: "center" }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC800",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#222",
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lottie: {
    position: "absolute",
    top: 0,
    height: 300,
    width: 300,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#a75f28",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 10,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  subMenu: {
    overflow: "hidden",
    width: 300,
    marginBottom: 20,
  },
  subButtonNew: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  subButtonDash: {
    backgroundColor: "#f4a261",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  subButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
