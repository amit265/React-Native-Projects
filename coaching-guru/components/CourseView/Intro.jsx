import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../constant/Colors";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";

export default function Intro({ course }) {
  const router = useRouter();
  return (
    <View>
      <Image
        source={imageAssets[course?.banner_image]}
        style={{
          width: "100%",
          height: 280,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          {course?.courseTitle}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <AntDesign name="book" size={24} color="black" />
          <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 10 }}
        >
          Description
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 18, color: Colors.GRAY }}
        >
          {course?.description}
        </Text>
        <Button text={"Start Now"} onPress={() => console.log("clicked")} />
      </View>
      <Pressable
        style={{ position: "absolute", padding: 10, marginTop: 25 }}
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>
    </View>
  );
}
