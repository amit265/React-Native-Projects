import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "@/src/config"; // Update the import to your actual config file

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !username) {
      alert("Error, Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL + "/auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // Handle successful signup (e.g., navigate to login or profile screen)
        alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error", "Signup failed. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">Signup</Text>

      <TextInput
        className="w-full p-4 mb-4 border border-gray-300 rounded-md"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="w-full p-4 mb-4 border border-gray-300 rounded-md"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="w-full p-4 mb-4 border border-gray-300 rounded-md"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-500 w-full p-4 rounded-md mb-4"
        onPress={handleSignup}
      >
        <Text className="text-white text-center text-lg font-bold">Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full p-4 rounded-md border border-gray-300"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-blue-500 text-center text-lg">Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
