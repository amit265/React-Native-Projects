import React from "react";
import { Text, View } from "react-native";
import SpinWheel from "../components/SpinWheel"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SpinWheel />
    </View>
  );
}
