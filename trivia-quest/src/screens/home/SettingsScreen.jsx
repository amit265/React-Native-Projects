import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/src/config"; // Your API base URL
import { useDispatch } from "react-redux";
import { logout } from "@/src/store/slices/authSlice"; // Assuming you have a logout action

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isQuizEnabled, setIsQuizEnabled] = useState(true); // Example state for quiz settings

  // Handle Quiz setting toggle
  const toggleQuizSetting = () => {
    setIsQuizEnabled(!isQuizEnabled);
    // You can call API to update the setting in your backend
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      // Remove token and user data from AsyncStorage
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user_info");

      // Dispatch logout action
      dispatch(logout());

      // Navigate to login screen
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "There was an issue logging out. Please try again.");
    }
  };

  // Handle Delete Account
  const handleDeleteAccount = () => {
    alert(
      "Are you sure?,This is a permanent action. You will lose all your data. Do you want to continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("auth_token");
              if (token) {
                const response = await axios.delete(
                  API_BASE_URL + "/auth/delete",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                if (response.status === 200) {
                  // Clear AsyncStorage and dispatch logout
                  await AsyncStorage.removeItem("auth_token");
                  await AsyncStorage.removeItem("user_info");
                  dispatch(logout());

                  alert("Success, Your account has been deleted successfully.");
                  navigation.navigate("Login");
                }
              }
            } catch (error) {
              console.error("Account deletion error:", error);
              alert(
                "Error, There was an issue deleting your account. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center">Settings</Text>

      {/* Quiz Settings */}
      <View className="mb-6">
        <Text className="text-lg font-medium">Quiz Settings</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-base">Enable Quiz</Text>
          <Switch
            value={isQuizEnabled}
            onValueChange={toggleQuizSetting}
            trackColor={{ false: "#ccc", true: "#4CAF50" }}
            thumbColor={isQuizEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md mb-6"
        onPress={handleLogout}
      >
        <Text className="text-white text-center text-lg font-bold">Logout</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity
        className="bg-red-500 p-4 rounded-md"
        onPress={handleDeleteAccount}
      >
        <Text className="text-white text-center text-lg font-bold">
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
