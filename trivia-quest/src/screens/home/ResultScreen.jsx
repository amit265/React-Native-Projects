import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentQuestionIndex,
  setUserScore,
} from "../../store/slices/quizSlice";

const ResultScreen = ({ navigation }) => {
  const userScore = useSelector((state) => state.quiz.userScore);
  const questions = useSelector((state) => state.quiz.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    const saveScore = async () => {
      try {
        const previousScores = await AsyncStorage.getItem("quiz_scores");
        const scoresArray = previousScores ? JSON.parse(previousScores) : [];
        scoresArray.push(userScore);
        await AsyncStorage.setItem("quiz_scores", JSON.stringify(scoresArray));
      } catch (error) {
        console.error("Error saving score:", error);
      }
    };

    saveScore();
  }, []);

  const restartQuiz = () => {
    dispatch(setCurrentQuestionIndex(0));
    dispatch(setUserScore(0));
    navigation.navigate("QuizScreen");
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <LottieView
        source={require("../../../assets/animations/congrats.json")}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
      />
      <Text className="text-2xl font-bold mt-4">🎉 Quiz Complete! 🎉</Text>
      <Text className="text-lg font-semibold mt-2">
        Your Score: {userScore} / {questions.length * 10}
      </Text>
      <TouchableOpacity
        onPress={restartQuiz}
        className="mt-4 p-3 bg-blue-500 rounded-lg"
      >
        <Text className="text-white text-lg">Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Leaderboard")}
        className="mt-2 p-3 bg-green-500 rounded-lg"
      >
        <Text className="text-white text-lg">View Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;
