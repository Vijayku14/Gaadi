import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export default function TestAPI() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "https://https://e686ca3613e1.ngrok-free.app/api/users/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      Alert.alert("Success", res.data.message);
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Register" onPress={registerUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
