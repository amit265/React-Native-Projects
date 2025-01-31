import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { userDetailsContext } from "../context/userDetailsContext"
import { useState } from "react";

export default function RootLayout() {

  useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf")
  });

  const [userDetails, setUserDetails] = useState();


  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <Stack screenOptions={{ headerShown: false }}>

      </Stack>
    </userDetailsContext.Provider>);
}
