import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
const { getLocalStorage } = require("../services/storage");
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../Constant/Colors";
export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ Get stored user info
        const userInfo = await getLocalStorage("userDetail");
        console.log(userInfo);

        if (userInfo !== null) {
          setUser(userInfo); // Convert string to object
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={require("../../assets/images/smiley.png")}
          style={{ width: 45, height: 45 }}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {" "}
          Hello {user?.username} 👋
        </Text>
      </View>
      <AntDesign name="setting" size={34} color={Colors.DARK_GRAY} />
    </View>
  );
}
