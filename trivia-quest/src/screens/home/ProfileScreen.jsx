// ProfileScreen.jsx
import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth); // Get user data from Redux
  // const navigation = useNavigation();

  // If no user is logged in, display a message or a login button
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text>No user data available. Please login!</Text>
        <TouchableOpacity
          className="w-full p-4 rounded-md border border-gray-300"
          onPress={() => navigation.navigate("Auth")}
        >
          <Text className="text-blue-500 text-center text-lg">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-5">
      {/* Profile Picture */}
      <View className="mb-5">
        {user.profilePicture ? (
          <Image
            source={{ uri: user?.profilePicture }}
            className="w-24 h-24 rounded-full"
          />
        ) : (
          <Image
            source={require("../../../assets/images/quiz/single_user.png")}
            className="w-24 h-24 rounded-full"
          />
        )}
      </View>

      {/* User Information */}
      <Text className="text-2xl font-bold mb-2">{user?.username}</Text>
      <Text className="text-lg text-gray-500 mb-5">{user?.email}</Text>

      {/* Edit Profile Button */}
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate("EditProfile")} // Navigates to EditProfile screen
      />
    </View>
  );
};

export default ProfileScreen;
