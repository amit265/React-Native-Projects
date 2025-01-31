import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Constant/Colors";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  console.log(Colors.PRIMARY);
  const router = useRouter();

  

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Image
          source={require("../../assets/images/login.png")}
          style={styles?.image}
        />
      </View>
      <View
        style={{ padding: 25, backgroundColor: Colors.PRIMARY, height: "100%" }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Stay on Track, stay healthy
        </Text>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 17,
            marginTop: 20,
          }}
        >
          Track your meds, take control of your health. Stay consistent, Stay
          confident
        </Text>

        <TouchableOpacity style={styles?.button} onPress={() => router.push("login/signin")}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: Colors.PRIMARY,
              padding: 10,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={{color: "white", marginTop: 4}}>
          Note: By clicking on this button you agree to our terms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 450,
    borderRadius: 20,
  },
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 99,
    marginTop: 25,
  },
});
