import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";

export default function QuizSummary() {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParam);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  useEffect(() => {
    calculateResult();
  }, []);

  const router = useRouter();
  const calculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)?.filter(
        ([key, value]) => value?.isCorrect == true
      );
      setCorrectAns(correctAns_.length);
      const totalQues = Object.keys(quizResult).length;
      setTotalQuestion(totalQues);
    }
  };

  const getPercMarks = () => {
    return ((correctAns / totalQuestion) * 100).toFixed(0);
  };

  const renderItem = ({ item, index }) => {
    const quizItem = item[1];
    return (
      <View
        key={index}
        style={{
          padding: 15,
          borderWidth: 1,
          marginLeft: 30,
          marginRight: 30,

          marginTop: 5,
          borderRadius: 15,
          backgroundColor:
            quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
          borderColor:
            quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
        }}
      >
        <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
          {quizItem?.question}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 15 }}>
          Ans: {quizItem?.correctAns}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Object.entries(quizResult)}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            {/* Wave Image */}
            <Image
              source={require("../../assets/images/wave.png")}
              style={{ width: "100%", height: 600, position: "absolute" }} // Adjusted height
            />

            {/* Header Content */}
            <View style={{ width: "100%", padding: 35 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit-bold",
                  fontSize: 30,
                  marginTop: 40,
                  color: Colors.WHITE,
                }}
              >
                Quiz Summary
              </Text>
              <View
                style={{
                  backgroundColor: Colors.WHITE,
                  padding: 20,
                  borderRadius: 20,
                  marginTop: 60,
                  display: "flex",
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
                    display: "flex",
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
              <View style={{ marginTop: 25 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
                  Summary
                </Text>
              </View>
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom if needed
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
