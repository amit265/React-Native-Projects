import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

export default function NoQuiz() {
  const router = useRouter();
  return (
    <View style={{ marginTop: 40, display: "flex", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/book.png")}
        style={{ height: 200, width: 200 }}
      />
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 25, textAlign: "center" }}
      >
        You don't have any Quiz
      </Text>
      <Button
        text={"+ Create New Quiz"}
        onPress={() => router.push("/addquiz")}
      />
      <Button text={"Explore Existing Quiz"} type="outline" onPress={() => router.push("/explore")} />
    </View>
  );
}
