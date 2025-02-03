import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";

export default function Button({ text, type = "fill", onPress, loading }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        marginTop: 15,
        backgroundColor: type == "fill" ? Colors.PRIMARY : Colors.WHITE,
      }}
    >
      {!loading ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: type == "fill" ? Colors.WHITE : Colors.PRIMARY,
          }}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size={"large"}
          color={type == "fill" ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
}
