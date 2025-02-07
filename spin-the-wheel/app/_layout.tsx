import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return <>

    <StatusBar backgroundColor="white" barStyle="dark-content" hidden={false} />
    <Stack screenOptions={{ headerShown: false }} />
  </>;
}
