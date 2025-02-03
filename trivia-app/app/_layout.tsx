import { Stack } from "expo-router";
import { useState } from "react";
import {
  userDetailsContext, userQuizDataContext,
} from "../context/userDetailsContext"
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

export default function RootLayout() {

  useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf")
  });

  const [userDetails, setUserDetails] = useState();
  const [userQuizList, setUserQuizList] = useState();

  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails, userQuizList, setUserQuizList }}>
      <userQuizDataContext.Provider value={{ userQuizList, setUserQuizList }}>

        <StatusBar backgroundColor="white" barStyle="dark-content" hidden={false} />

        <Stack screenOptions={{ headerShown: false }} />

      </userQuizDataContext.Provider>
    </userDetailsContext.Provider>);
}
