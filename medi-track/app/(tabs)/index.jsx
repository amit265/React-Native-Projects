import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalStorage, removeLocalStorage } from "../services/storage";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";

export default function HomeScreen() {
  

  // Handle Logout
  const handleLogout = async () => {
    try {
      // ✅ Remove user info from storage
      await removeLocalStorage();
      // ✅ Redirect to login screen
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View
      style={{ padding: 25, backgroundColor: "white", height: "100%" }}
    >
      <Header />
      <EmptyState />
    </View>
  );
}
