import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../../constant/Colors"; // Ensure Colors contains "active" and "inactive" color values.

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
        tabBarStyle: { backgroundColor: "white", paddingBottom: 5 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <Entypo
              name={focused ? "home" : "home"}
              size={size}
              color={focused ? "blue" : "gray"}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <MaterialCommunityIcons
              name="progress-check"
              size={size}
              color={focused ? "blue" : "gray"}
            />
          ),
          tabBarLabel: "Quiz",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <MaterialIcons
              name="explore"
              size={size}
              color={focused ? "blue" : "gray"}
            />
          ),
          tabBarLabel: "Explore",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <AntDesign
              name="user"
              size={size}
              color={focused ? "blue" : "gray"}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
