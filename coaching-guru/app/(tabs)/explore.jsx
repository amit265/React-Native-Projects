import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import Colors from "../../constant/Colors";
import { CourseCategory } from "../../constant/Option";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";

export default function explore() {
  return (
    <FlatList
      data={[]}
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 700 }}
          />
          <View
            style={{
              flex: 1,
              padding: 20,
              marginTop: 20,
              width: "100%", // Ensure the container takes full width
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 30,
                color: Colors.WHITE,
                marginBlock: 10,
              }}
            >
              Explore More Courses
            </Text>
            {CourseCategory.map((item, index) => (
              <View key={index} style={{ marginTop: 10 }}>
                {/* <Text style={{ fontFamily: "outfit", fontSize: 20 }}>{item}</Text> */}
                <CourseListByCategory category={item} />
              </View>
            ))}
          </View>
        </View>
      }
    />
  );
}
