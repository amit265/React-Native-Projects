import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";
export default function CourseProgress({ courseList }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Progress</Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              padding: 15,
              margin: 7,
              backgroundColor: Colors.BG_GRAY,
              borderRadius: 15,
              width: 280,
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
              <Progress.Bar progress={0.3} width={250} />
              <Text>3 out of 5 chapter completed</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
