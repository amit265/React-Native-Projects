import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getLocalStorage } from "../services/storage";
export default function TabLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ Get stored user info
        const userInfo = await getLocalStorage("userDetail");

        if (userInfo) setAuthenticated(true);
      } catch (error) {
        console.error("Error retrieving user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
    );
  }
  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: "Add New",
          tabBarIcon: () => (
            <AntDesign name="pluscircle" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
