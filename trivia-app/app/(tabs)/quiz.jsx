import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import QuizCard from "../components/quiz/QuizCard";
import ProgressBar from "../components/quiz/ProgressBar";
import {
  resetQuiz,
  setCorrectAnswer,
  setCurrentQuestionIndex,
  setIsAnswerCorrect,
  setIsAnswerSubmitted,
  setUserAnswer,
  setUserScore,
  setTotalScore
} from "../store/quizSlice";
import { setFeedBack } from "../store/uiSlice";
import UserScore from "../components/quiz/UserScore";
import LifeLine from "../components/quiz/LifeLine";
import Feedback from "../components/quiz/FeedBack";
import { resetLifeLine } from "../store/lifeLine";
import { useNavigation } from "expo-router";

const Quiz = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [gameOver, setGameOver] = useState(false);

  const {
    questions,
    currentQuestionIndex,
    userAnswer,
    userScore,
    isAnswerSubmitted,
  } = useSelector((store) => store.quiz);
  const selectedCategory = useSelector(
    (store) => store.category.selectedCategory
  );
  console.log("userScore", userScore);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = currentQuestion.correct_answer === userAnswer;

    dispatch(setCorrectAnswer(currentQuestion.correct_answer));
    dispatch(setIsAnswerCorrect(isAnswerCorrect));
    dispatch(setIsAnswerSubmitted(true));

    if (isAnswerCorrect) {
      dispatch(setUserScore(userScore + 10));
      dispatch(setFeedBack("Correct!"));
    } else {
      dispatch(
        setFeedBack(
          `Wrong! Correct answer is ${currentQuestion.correct_answer}`
        )
      );
      dispatch(setUserScore(userScore - 5));
    }

    setTimeout(() => {
      // Reset for the next question
      dispatch(setFeedBack(""));
      dispatch(setCorrectAnswer(null));
      dispatch(setIsAnswerCorrect(null));
      dispatch(setUserAnswer(null));
      dispatch(setIsAnswerSubmitted(false));

      if (currentQuestionIndex < questions.length - 1) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      } else {
        setGameOver(true);

        if (isAnswerCorrect) {
          dispatch(setTotalScore(userScore + 10));
        } else {
          dispatch(setTotalScore(userScore - 5));
        }
        alert(
          `Quiz complete! Your score: ${
            isAnswerCorrect ? userScore + 10 : userScore - 5
          }/${questions.length * 10}`
        );
        console.log("userScore", userScore);

        dispatch(resetLifeLine());
        dispatch(resetQuiz());
        dispatch(setTotalScore(userScore));
        navigation.navigate("category");
      }
    }, 2000);
  };

  if (!questions.length) {
    return null; // Handle the case where questions are still loading
  }

  return (
    <View className="flex-1 p-4 bg-gray-900">
      <UserScore />
      <View>
        <Text className="text-white text-2xl font-semibold text-center p-4">
          {selectedCategory}
        </Text>
        <ProgressBar />
        <QuizCard />
        <TouchableOpacity
          onPress={handleAnswerSubmit}
          disabled={!userAnswer || isAnswerSubmitted}
          className={`w-full p-4 bg-green-500 text-white rounded-lg mt-4 ${
            !userAnswer || isAnswerSubmitted ? "opacity-50" : "opacity-100"
          }`}
        >
          <Text className="text-center text-white font-semibold">
            Submit Answer
          </Text>
        </TouchableOpacity>
        <LifeLine />
        <Feedback />
      </View>
    </View>
  );
};

export default Quiz;
