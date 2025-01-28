import React from "react";
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
  setTotalScore,
  setUserAnswer,
  setUserScore,
} from "../store/quizSlice";
import { setFeedBack } from "../store/uiSlice";
import UserScore from "../components/quiz/UserScore";
import LifeLine from "../components/quiz/LifeLine";
import Feedback from "../components/quiz/FeedBack";
import { resetLifeLine, setAiHint } from "../store/lifeLine";
import { useNavigation } from "expo-router";

const Quiz = () => {
  const navigation = useNavigation();
  const questions = useSelector((store) => store.quiz.questions);
  const selectedCategory = useSelector(
    (store) => store.category.selectedCategory
  );

  const currentQuestionIndex = useSelector(
    (store) => store.quiz.currentQuestionIndex
  );
  const dispatch = useDispatch();
  const userAnswer = useSelector((store) => store.quiz.userAnswer);
  const userScore = useSelector((store) => store.quiz.userScore);
  const isAnswerSubmitted = useSelector(
    (store) => store.quiz.isAnswerSubmitted
  );

  const handleAnswerSubmit = () => {
    const isAnswerCorrect =
      questions[currentQuestionIndex].correct_answer === userAnswer;
    dispatch(setCorrectAnswer(questions[currentQuestionIndex].correct_answer));
    dispatch(setIsAnswerCorrect(isAnswerCorrect));
    dispatch(setIsAnswerSubmitted(true));
    dispatch(setAiHint(""));

    if (isAnswerCorrect) {
      dispatch(setUserScore(userScore + 10));
      dispatch(setFeedBack("correct"));
    } else {
      dispatch(
        setFeedBack(
          "wrong! Correct answer is " +
            questions[currentQuestionIndex].correct_answer
        )
      );
      dispatch(setUserScore(userScore - 5));
    }

    setTimeout(() => {
      dispatch(setFeedBack(""));
      dispatch(setCorrectAnswer(null));
      dispatch(setIsAnswerCorrect(null));
      dispatch(setUserAnswer(null));
      dispatch(setIsAnswerSubmitted(false));

      if (currentQuestionIndex < questions.length - 1) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      } else {
        Alert.alert(
          "Quiz Complete",
          `Your score: ${
            isAnswerCorrect ? userScore + 10 : userScore - 5
          }/${questions.length * 10}`
        );

        if (isAnswerCorrect) {
          dispatch(setTotalScore(userScore + 10));
        } else {
          dispatch(setTotalScore(userScore - 5));
        }

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
    <ScrollView className="flex-1 p-4 bg-gray-900">
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
          <Text className="text-center text-white font-semibold">Submit Answer</Text>
        </TouchableOpacity>

        <LifeLine />
        <Feedback />
      </View>
    </ScrollView>
  );
};

export default Quiz;
