import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Colors from "../../constant/Colors";
import {
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { ProfileMenu } from "../../constant/Option";
import { collection, getDocs, query } from "firebase/firestore";

export default function Profile() {
  const router = useRouter();
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const screenWidth = Dimensions.get("screen").width;

  console.log("userScore from profile", userDetails?.totalScore);


   
  



  const onMenuClick = (menu) => {
    if (menu.name === "Logout") {
      signOut(auth)
        .then(() => {
          setUserDetails(null);
          router.push("/");
        })
        .catch((error) => console.log(error));
    } else {
      router.push(menu?.path);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Background Image */}
      <Image
        source={require("../../assets/images/wave.png")}
        style={{ position: "absolute", width: "100%", height: 550 }}
      />

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 25,
          paddingTop: Platform.OS === "ios" ? 50 : 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            color: Colors.WHITE,
          }}
        >
          Profile
        </Text>
      </View>

      {/* Profile Info */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
            backgroundColor: Colors.LIGHT_GRAY,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 22,
            color: Colors.WHITE,
            marginTop: 10,
          }}
        >
          {userDetails?.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 16, color: Colors.WHITE }}
        >
          {userDetails?.email}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 18,
            color: Colors.BLACK,
          }}
        >
          Your total score:{" "}
          {userDetails?.totalScore ? userDetails?.totalScore : 0}
        </Text>
      </View>

      {/* Menu Items */}
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {ProfileMenu.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onMenuClick(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: Colors.WHITE,
              padding: 15,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: "#ddd",
              width: screenWidth * 0.9,
              marginVertical: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
            }}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color={Colors.PRIMARY}
              style={{
                backgroundColor: Colors.BG_GRAY,
                padding: 12,
                borderRadius: 10,
              }}
            />
            <Text
              style={{ fontFamily: "outfit", fontSize: 18, marginLeft: 15 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
