import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginFailure, loginSuccess } from "../store/slices/authSlice";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();
const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isGuest, setIsGuest] = useState(false); // ✅ Track guest mode

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const [token, user, guest] = await Promise.all([
          AsyncStorage.getItem("auth_token"),
          AsyncStorage.getItem("user_info"),
          AsyncStorage.getItem("guest"), // ✅ Check if guest login is active
        ]);

        if (token) {
          dispatch(loginSuccess({ user: JSON.parse(user) }));
        } else if (guest === "true") {
          setIsGuest(true); // ✅ Set guest mode
        } else {
          dispatch(loginFailure("Token not found"));
        }
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };

    checkAuthToken();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated && !isGuest ? (
          <Stack.Screen name="Auth">
            {({ navigation }) => (
              <AuthNavigator setIsGuest={setIsGuest} navigation={navigation} />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="TabNavigator">
            {() => <TabNavigator isGuest={isGuest} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
