import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: (color, size = 24) => (
            <Entypo name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: (color, size = 24) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
          tabBarLabel: "Explore",
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: (color, size = 24) => (
            <MaterialCommunityIcons
              name="progress-check"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Progress",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: (color, size = 24) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
