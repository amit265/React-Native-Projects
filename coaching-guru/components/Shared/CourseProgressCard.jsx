import { View, Text, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";

export default function CourseProgressCard({ item, width = 280 }) {
  const getCompletedChapters = (course) => {
    const completedChapters = course?.completedChapter?.length;
    const totalChapters = course?.chapters?.length;
    const percent = completedChapters / totalChapters;
    return percent;
  };

  return (
    <View
      style={{
        padding: 15,
        margin: 7,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        width: width, // Ensure width is applied here
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Image
          source={imageAssets[item?.banner_image]}
          style={{
            width: 90,
            height: 90,
            borderRadius: 8,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "outfit-bold",
              fontSize: 18,
              flexWrap: "wrap",
            }}
          >
            {item?.courseTitle}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 15 }}>
            {item?.chapters?.length} Chapters
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Progress.Bar progress={getCompletedChapters(item)} width={width-20} />
        <Text>
          {item?.completedChapter?.length || 0} out of {item?.chapters?.length}{" "}
          chapters completed
        </Text>
      </View>
    </View>
  );
}
