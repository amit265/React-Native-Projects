import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
export default function CourseListGrid({ courseList, option }) {
  //   console.log("option", courseList);
  const router = useRouter();

  const onPressOption = (course) => {
    router.push({
      pathname: option.path,
      params: {
        courseParams: JSON.stringify(course),
      },
    });
  };
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{ padding: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPressOption(item)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              margin: 7,
              elevation: 1,
            }}
          >
            <FontAwesome6
              name="circle-check"
              size={24}
              color={Colors.GRAY}
              style={{ position: "absolute", top: 10, right: 20 }}
            />
            <Image
              source={option?.icon}
              style={{ width: "100%", height: 70, objectFit: "contain" }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 7,
              }}
            >
              {item?.courseTitle}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
