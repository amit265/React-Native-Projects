import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import CourseProgressCard from "../Shared/CourseProgressCard";
export default function CourseProgress({ courseList }) {
  const getCompletedChapters = (course) => {
    const completedChapters = course?.completedChapter?.length;
    const totalChapters = course?.chapters?.length;
    const percent = completedChapters / totalChapters;
    console.log("percentage", percent);
    return percent;
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{ color: Colors.WHITE, fontFamily: "outfit-bold", fontSize: 25 }}
      >
        Progress
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <CourseProgressCard item={item} />
          </View>
        )}
      />
    </View>
  );
}
