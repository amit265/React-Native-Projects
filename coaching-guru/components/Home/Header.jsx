import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { userDetailsContext } from "../../context/userDetailsContext";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../constant/Colors";
export default function Header() {
  const { userDetails, setUserDetails } = useContext(userDetailsContext);


  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
            color: Colors.WHITE,
          }}
        >
          Hello, {userDetails?.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 17, color: Colors.WHITE }}
        >
          Let's get started
        </Text>
      </View>
      <TouchableOpacity>
        <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
