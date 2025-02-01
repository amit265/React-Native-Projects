import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../constant/Colors";
export default function Chapters({ course }) {
  const router = useRouter();
  const isChapterCompleted = (index) => {
    const isCompleted = course?.completedChapter.find((item) => item == index);
    return isCompleted ? true : false;
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Chapters</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: "/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index,
                },
              })
            }
            style={{
              padding: 18,
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                flex: 1,
              }}
            >
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text numberOfLines={1} style={styles.chapterText}>
                {item?.chapterName}
              </Text>
            </View>
            {course?.completedChapter && isChapterCompleted(index) ? (
              <AntDesign name="checkcircleo" size={24} color={Colors.GREEN} />
            ) : (
              <AntDesign name="playcircleo" size={24} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: 15,
    display: "flex",
  },
});
