import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../config/firebaseConfig";
import { userDetailsContext } from "../../context/userDetailsContext";
import { signOut } from "firebase/auth";
import { ProfileMenu } from "../../constant/Option";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function profile() {
  const router = useRouter();
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const onMenuClick = (menu) => {
    if (menu.name == "Logout") {
      signOut(auth)
        .then(() => {
          setUserDetails(null);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push(menu?.path);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        padding: 20,
        marginTop: 20,
        width: "100%",
        height: "100%",
        backgroundColor: Colors.WHITE,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginBlock: 10,
        }}
      >
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ height: 150, width: 150 }}
        />

        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          {userDetails?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 15,
          }}
        >
          {userDetails?.email}
        </Text>
      </View>
      <View>
        {ProfileMenu.map((item, index) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            key={index}
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              backgroundColor: Colors.WHITE,
              padding: 15,
              borderRadius: 15,
              borderWidth: 0.5,
              borderColor: "#ddd",
              elevation: 5, // For Android shadow effect
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 }, // Creates a subtle lift
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={Colors.PRIMARY}
              style={{
                backgroundColor: Colors.BG_GRAY,
                padding: 10,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
