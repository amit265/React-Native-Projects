import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/src/config";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/src/store/slices/authSlice";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user data from Redux state

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || ""
  );

  // Function to handle selecting a new profile picture

  // Function to save updated profile
  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) {
        alert("Error, You must be logged in to update your profile.");
        return;
      }

      const updatedUser = { username, email, profilePicture };

      // Make API request to update profile
      const response = await axios.put(
        `${API_BASE_URL}/auth/update-profile`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // Update AsyncStorage with new user data
        await AsyncStorage.setItem(
          "user_info",
          JSON.stringify(response.data.user)
        );

        // Update Redux state
        dispatch(loginSuccess({ user: response.data.user }));

        alert("Success, Profile updated successfully!");
        navigation.goBack(); // Navigate back to the profile screen
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Error, Failed to update profile. Please try again.");
    }
  };

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold mb-5 text-center">Edit Profile</Text>

      {/* Profile Picture Section */}
      <TouchableOpacity className="items-center mb-5">
        <Image
          source={{ uri: profilePicture || "https://via.placeholder.com/150" }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-blue-500 mt-2">Change Profile Picture</Text>
      </TouchableOpacity>

      {/* Username Input */}
      <Text className="text-lg font-medium mb-2">Username</Text>
      <TextInput
        className="border border-gray-300 p-3 rounded-md mb-4"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />

      {/* Email Input */}
      <Text className="text-lg font-medium mb-2">Email</Text>
      <TextInput
        className="border border-gray-300 p-3 rounded-md mb-6"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      {/* Save Button */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={handleSaveProfile}
      >
        <Text className="text-white text-center text-lg font-bold">
          Save Changes
        </Text>
      </TouchableOpacity>

      <View>
        <Text>Edit Profile Screen</Text>
        <TouchableOpacity title="Go Back" onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;
