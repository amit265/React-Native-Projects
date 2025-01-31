import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/home/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="EditProfile"
        options={{ headerShown: true }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
