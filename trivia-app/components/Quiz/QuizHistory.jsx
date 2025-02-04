import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userDetailsContext } from "../../context/userDetailsContext";

export default function QuizHistory({
  quizAttempts,
  userDetails,
  userQuizList,
}) {
  const router = useRouter();
  // const attemptedQuizzes = userQuizList.filter((quiz) =>
  //   quizAttempts.some((attempt) => attempt?.quizId === quiz?.docId)
  // );

  // console.log("quizAttempts", quizAttempts); // This will contain only quizzes that have been attempted



  


  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 16,
          textAlign: "center",
          padding: 10,
        }}
      >
        Click to see your quiz summary
      </Text>

      <FlatList
        data={quizAttempts}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/quizResultScreen",
                params: {
                  quizParam: JSON.stringify(item?.quizId),
                },
              })
            }
            key={index}
            style={styles.courseContainer}
          >
            <View style={styles.itemContent}>
              <Image
                source={imageAssets[item?.banner_image]}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="checkmark-circle"
                      size={30}
                      color={Colors.GREEN}
                      style={{ textAlign: "right" }}
                    />
                  </View>
                <Text style={styles.quizTitle}>{item?.quizTitle}</Text>
                <View style={styles.subTextContainer}>
                  {/* <AntDesign name="book" size={24} color="black" /> */}
                  <Text style={{ fontFamily: "outfit" }}>
                    {item?.attemptedAt?.toDate()?.toLocaleDateString("en-GB")}
                  </Text>

                  <View
                    style={{
                      alignSelf: "flex-end",
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <AntDesign
                      name="checksquare"
                      size={24}
                      color={item?.score > 60 ? "green" : "red"}
                    />

                    <Text
                      style={{
                        fontWeight: "bold",
                        color:
                          item?.score > 60 ? "green" : "red",
                      }}
                    >
                      {item?.score} %
                    </Text>
                  </View>
                </View>
              </View>
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
    borderRadius: 15,
  },
  itemContent: {
    flexDirection: "row", // Set items to be in a row
    alignItems: "center",
  },
  image: {
    width: 100, // Set image width
    height: 100, // Set image height
    borderRadius: 15,
  },
  textContainer: {
    marginLeft: 10, // Space between image and text
    flex: 1, // Allow text container to take available space
  },
  quizTitle: {
    fontFamily: "outfit-bold",
    fontSize: 14,
    marginTop: 10,
  },
  subTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  iconContainer: {
    position: "absolute",
    left: "-35%",
    top: "25%",
  },
});
