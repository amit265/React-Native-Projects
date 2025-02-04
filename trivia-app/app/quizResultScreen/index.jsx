import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { quizAttemptsContext } from "../../context/userDetailsContext";

export default function QuizSummary() {
  const { quizParam } = useLocalSearchParams();
  const quizId = JSON.parse(quizParam);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const { quizAttempts } = useContext(quizAttemptsContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log("quizResult", quizId);

  const singleQuiz = () =>
    Object.values(quizAttempts).find((item) => item.quizId == quizId);

  const quizzes = singleQuiz();
  const quizResult = quizzes?.result;

  console.log("singleQuiz", singleQuiz());

  useEffect(() => {
    if (quizResult) {
      calculateResult();
    }
  }, [quizResult]);

  const calculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)?.filter(
        ([, value]) => value?.isCorrect === true
      );
      setCorrectAns(correctAns_.length);
      setTotalQuestion(Object.keys(quizResult).length);
    }
  };

  const getPercMarks = () => {
    return totalQuestion > 0
      ? ((correctAns / totalQuestion) * 100).toFixed(0)
      : 0;
  };

  if (!quizzes) {
    setLoading(true);
  }

  const renderItem = ({ item, index }) => {
    const quizItem = item[1];
    return (
      <View
        key={index}
        style={{
          padding: 15,
          borderWidth: 1,
          marginHorizontal: 30,
          marginTop: 5,
          borderRadius: 15,
          backgroundColor: quizItem?.isCorrect
            ? Colors.LIGHT_GREEN
            : Colors.LIGHT_RED,
          borderColor: quizItem?.isCorrect
            ? Colors.LIGHT_GREEN
            : Colors.LIGHT_RED,
        }}
      >
        <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
          {quizItem?.question}
        </Text>
        {!quizItem?.isCorrect && (
          <Text
            style={{ fontFamily: "outfit", fontSize: 15, color: Colors.RED }}
          >
            Your Answer: {quizItem?.userChoice}
          </Text>
        )}
        <Text
          style={{ fontFamily: "outfit", fontSize: 15, color: Colors.GREEN }}
        >
          {!quizItem?.isCorrect ? "Correct Answer" : "Answer"}:{" "}
          {quizItem?.correctAns}
        </Text>
        <View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/quizExplainer/",
                params: {
                  questionParams: JSON.stringify(quizItem?.question),
                },
              })
            }
          >
            <Text>Click to read more about this question</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={quizResult ? Object.entries(quizResult) : []}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <Image
              source={require("../../assets/images/wave.png")}
              style={{ width: "100%", height: 600, position: "absolute" }}
            />
            <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 28,
                  color: Colors.WHITE,
                  left: 30,
                }}
              >
                Quiz Summary
              </Text>
              <View
                style={{
                  position: "absolute",
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

            <View style={{ width: "100%", padding: 35 }}>
              <View
                style={{
                  backgroundColor: Colors.WHITE,
                  padding: 20,
                  borderRadius: 20,
                  marginTop: 60,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/trophy.png")}
                  style={{ width: 100, height: 100, marginTop: -60 }}
                />
                <Text style={{ fontSize: 26, fontFamily: "outfit-bold" }}>
                  {getPercMarks() > 60 ? "Congratulations" : "Try Again!"}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit",
                    color: Colors.GRAY,
                    fontSize: 17,
                  }}
                >
                  You gave {getPercMarks()}% correct answer
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    gap: 5,
                    borderRadius: 5,
                    backgroundColor: Colors.WHITE,
                    elevation: 1,
                  }}
                >
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>Q {totalQuestion}</Text>
                  </View>
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>✅ {correctAns} </Text>
                  </View>
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>
                      ❌ {totalQuestion - correctAns}
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                text={"Back To Home"}
                onPress={() => router.replace("/(tabs)/home")}
              />
              <Button
                text={"Attempt again"}
                onPress={() =>
                  router.push({
                    pathname: "/quizView/" + quizId,
                    params: { quizParam: JSON.stringify(quizId) },
                  })
                }
              />
              <View style={{ marginTop: 25 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
                  Summary
                </Text>
              </View>
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resultText: {
    fontFamily: "outfit",
    fontSize: 20,
  },
  resultTextContainer: {
    padding: 7,
  },
});
