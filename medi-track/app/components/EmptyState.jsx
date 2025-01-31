import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import constantString from "../../Constant/constantString";
import Colors from "../../Constant/Colors";
import { useRouter } from "expo-router";

export default function EmptyState() {

    const router = useRouter();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
      }}
    >
      <Image
        source={require("../../assets/images/medicine.png")}
        style={{ width: 120, height: 120 }}
      />

      <Text style={{ fontSize: 35, fontWeight: "bold", marginTop: 20 }}>
        {constantString.NoMedication}
      </Text>
      <Text style={{ fontSize: 20, color: "gray", marginTop: 10 }}>
        {constantString.MedicationSubText}
      </Text>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 10,
          marginTop: 35,
          width: "100%",

        }}
        onPress={() => router.push("/add-new-medication")}
      >
        <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
          {constantString.AddMedication}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
