import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Constant/Colors";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/authService";
import { setLocalStorage } from "../services/storage";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("ankit@gmail.com");
  const [password, setPassword] = useState("Ankit@123");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Error, Please fill all the fields.");
      return;
    }
    try {
      console.log("login clicked");

      const response = await loginUser(email, password);
      await setLocalStorage('userDetail', response?.user)

      console.log("response from login", response);
      
      router.replace("/(tabs)");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };
  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>{error}</Text>
      
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ fontSize: 17, color: "white", textAlign: "center" }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signup")}
      >
        <Text
          style={{ fontSize: 17, color: Colors.PRIMARY, textAlign: "center" }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonCreate: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 35,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
