import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getLocalStorage } from "./services/storage";
export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />

      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
