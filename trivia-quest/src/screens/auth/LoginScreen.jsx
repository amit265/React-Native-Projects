import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/src/config";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/src/store/slices/authSlice";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("ankit@gmail.com");
  const [password, setPassword] = useState("Ankit@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_BASE_URL + "/auth/login", {
        email,
        password,
      });

      // Store the token in AsyncStorage
      await AsyncStorage.setItem("auth_token", response.data.token);
      await AsyncStorage.removeItem("guest"); // ✅ Remove guest status on login

      await AsyncStorage.setItem(
        "user_info",
        JSON.stringify(response.data.user)
      );

      console.log("Token stored in AsyncStorage", response.data.token);
      console.log("User", response.data.user);

      // Dispatch the login action
      dispatch(loginSuccess({ user: response.data.user }));
      // Navigate to the profile or home screen
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }],
      });
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGuestLogin = async () => {
    await AsyncStorage.setItem("guest", "true"); // ✅ Save guest status
    navigation.reset({
      index: 0,
      routes: [{ name: "TabNavigator" }],
    });
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">Login</Text>

      <TextInput
        className="w-full p-4 mb-4 border border-gray-300 rounded-md"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full p-4 mb-4 border border-gray-300 rounded-md"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text className="text-red-500 text-center mb-4">{error}</Text>}

      <TouchableOpacity
        className="bg-blue-500 w-full p-4 rounded-md mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center text-lg font-bold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full p-4 mb-4 rounded-md border border-gray-300"
        onPress={() => navigation.navigate("Signup")}
      >
        <Text className="text-blue-500 text-center text-lg">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full p-4 rounded-md border border-gray-300"
        onPress={handleGuestLogin}
      >
        <Text className="text-blue-500 text-center text-lg">Guest Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
