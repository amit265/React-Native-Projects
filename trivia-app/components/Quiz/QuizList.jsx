import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
export default function QuizList({
  quizList,
  heading = "Quizzes",
  enroll = false,
}) {
  const router = useRouter();

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>{heading}</Text>

      <FlatList
        data={quizList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/quizView/" + item?.docId,
                params: {
                  courseParams: JSON.stringify(item),
                  enroll: enroll,
                },
              })
            }
            key={index}
            style={styles.courseContainer}
          >
            <Image
              source={imageAssets[item.banner_image]}
              style={{ width: "100%", height: 150, borderRadius: 15 }}
            />
            <Text
              style={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 10 }}
            >
              {item?.quizTitle}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <AntDesign name="book" size={24} color="black" />
              <Text>{item?.quiz?.length} Questions</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    width: 260,
    borderRadius: 15,
  },
});
