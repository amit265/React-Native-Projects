import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../../constant/Colors";
import {
  quizAttemptsContext,
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import QuizHistory from "../../components/Quiz/QuizHistory";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function quizHistory() {
  const screenWidth = Dimensions.get("screen").width;
  const { userQuizList } = useContext(userQuizDataContext);
  const { quizAttempts } = useContext(quizAttemptsContext);
  const { userDetails } = useContext(userDetailsContext);

  const router = useRouter();
  return (
    <FlatList
      data={[]} // Empty data since content is in ListHeaderComponent
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
          {/* Background Image */}
          <Image
            source={require("../../assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 600 }}
          />

          {/* Page Header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 28,
                color: Colors.WHITE,
                left: 30,
              }}
            >
              Quiz History
            </Text>
            <View
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                top: 30,
                left: 10,
              }}
            >
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color="white" />
              </Pressable>
            </View>
          </View>

          {/* Course List */}
          <View
            style={{
              marginTop: 30,
              paddingHorizontal: 15,
              paddingBottom: 20,
              width: screenWidth * 0.95,
              alignSelf: "center",
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <QuizHistory
              userQuizList={userQuizList}
              quizAttempts={quizAttempts}
              userDetails={userDetails}
            />
          </View>
        </View>
      }
    />
  );
}
