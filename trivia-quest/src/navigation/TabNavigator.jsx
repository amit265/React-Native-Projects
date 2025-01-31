import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LeaderboardScreen from "../screens/home/LeaderboardScreen";
import SettingsScreen from "../screens/home/SettingsScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import QuizStackNavigator from "./QuizStackNavigator";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const checkGuestStatus = async () => {
      const guest = await AsyncStorage.getItem("guest");
      setIsGuest(guest === "true"); // ✅ Set guest state
    };
    checkGuestStatus();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Quiz") {
            iconName = "game-controller-outline";
          } else if (route.name === "ProfileTab") {
            iconName = "person-outline";
          } else if (route.name === "Leaderboard") {
            iconName = "trophy-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      {/* ✅ Always show Quiz */}
      <Tab.Screen name="Quiz" component={QuizStackNavigator} />

      {/* ✅ Show other tabs only if NOT guest */}
      {!isGuest && (
        <>
          <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
          <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
