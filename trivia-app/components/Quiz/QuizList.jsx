import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  quizAttemptsContext,
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
export default function QuizList({quizList, heading = "Quizzes" }) {
  const router = useRouter();
  const { userDetails } = useContext(userDetailsContext);
  const { quizAttempts } = useContext(quizAttemptsContext);

  const currentUserId = userDetails?.email; // Assuming email is used as userId
  
  // Get all attempted quizzes by the current user
  const attemptedQuizMap = new Map(
    quizAttempts
      .filter((attempt) => attempt.userId === currentUserId)
      .map((attempt) => [attempt.quizId, attempt.score]) // Store quizId -> score
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>{heading}</Text>

      <FlatList
        data={quizList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const attemptedScore = attemptedQuizMap.get(item.docId); // Check if quiz was attempted

          return (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/quizView/" + item?.docId,
                  params: {
                    quizParam: JSON.stringify(item?.docId),
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

              {/* ✅ Mark Attempted Quizzes */}
              {attemptedScore !== undefined && (
                <View style={{ position: "absolute", right: "5%", top: "5%" }}>
                  <Ionicons
                    name="checkmark-circle"
                    size={30}
                    color={Colors.GREEN}
                    style={{ textAlign: "right" }}
                  />
                </View>
              )}

              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 18,
                  marginTop: 10,
                }}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <AntDesign
                    name="book"
                    size={20}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  <Text>{item?.quiz?.length} Questions</Text>
                </View>

                {/* 🏆 Show Score if Attempted */}
                {attemptedScore !== undefined && (
                  <View
                    style={{
                      alignSelf: "flex-end",
                      flexDirection: "row",
                      gap: 5,
                      backgroundColor: Colors.LIGHT_GRAY,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 10,
                    }}
                  >
                    <AntDesign
                      name="staro"
                      size={20}
                      color={attemptedScore > 60 ? "green" : "red"}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: attemptedScore > 60 ? "green" : "red",
                      }}
                    >
                      {attemptedScore}%
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
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
