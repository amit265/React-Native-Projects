import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setAiHint,
  setIsAiHintUsed,
  setIsEliminateUsed,
  setIsSkipUsed,
  setLoading,
} from "../../store/lifeLine";
import {
  setCurrentQuestionIndex,
  setRemoveIncorrectAnswer,
  setUserScore,
} from "../../store/quizSlice";
import openai from "../../utils/openai";
import  shuffleArray  from "../../services/shuffleArray";
import { OPENAI_API_URL } from "app/utils/constants";

const LifeLine = () => {
  const dispatch = useDispatch();
  const hintByAi = useSelector((store) => store.lifeLine.aiHint);
  const isAiHintUsed = useSelector((store) => store.lifeLine.isAiHintUsed);
  const isSkipUsed = useSelector((store) => store.lifeLine.isSkipUsed);
  const isEliminateUsed = useSelector((store) => store.lifeLine.isEliminateUsed);
  const loading = useSelector((store) => store.lifeLine.isLoading);
  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);
  const questions = useSelector((store) => store.quiz.questions);
  const userScore = useSelector((store) => store.quiz.userScore);
  const question = questions[currentQuestionIndex]?.question;

  const eliminate = () => {
    if (isEliminateUsed) return;

    dispatch(setIsEliminateUsed(true));
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    let incorrectOptions = questions[currentQuestionIndex].options.filter(
      (option) => option !== correctAnswer
    );

    if (incorrectOptions.length > 2) {
      incorrectOptions = shuffleArray(incorrectOptions).slice(0, 2);
    }
    dispatch(setRemoveIncorrectAnswer(incorrectOptions));
  };

  const aiHint = async () => {
    if (isAiHintUsed) return;
  
    dispatch(setIsAiHintUsed(true));
    const questionText = question; // This is the current question text
  
    try {
      // Call the backend API to get the AI hint
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: questionText }),
      });
  
      const data = await response.json();
  
      if (data.hint) {
        dispatch(setAiHint(data.hint));
      } else {
        throw new Error('No hint received from AI');
      }
    } catch (error) {
      console.error("Error fetching hint:", error.message);
    }
  
    dispatch(setLoading(false));
  };
  

  const skipQuestion = () => {
    if (isSkipUsed) return;

    dispatch(setIsSkipUsed(true));
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      alert(`Quiz complete! Your score: ${userScore}/${questions.length * 10}`);
      dispatch(setCurrentQuestionIndex(0));
      dispatch(setUserScore(0));
    }
  };

  return (
    <View className="mt-4">
      <View className="flex-row justify-center gap-4">
        {/* Skip Button */}
        <TouchableOpacity
          className={`p-2 w-1/4 bg-yellow-400 rounded-lg ${
            isSkipUsed ? "opacity-50" : ""
          }`}
          onPress={skipQuestion}
          disabled={isSkipUsed}
        >
          <View className="flex-row items-center justify-center">
            <Image source={require("../../../assets/images/quiz/skip_next.png")} className="w-6 h-6" />
            <Text className="text-sm text-center ml-1">Skip</Text>
          </View>
        </TouchableOpacity>

        {/* 50-50 Button */}
        <TouchableOpacity
          className={`p-2 w-1/4 bg-yellow-400 rounded-lg ${
            isEliminateUsed ? "opacity-50" : ""
          }`}
          onPress={eliminate}
          disabled={isEliminateUsed}
        >
          <View className="flex-row items-center justify-center">
            <Image source={require("../../../assets/images/quiz/magic.png")} className="w-6 h-6" />
            <Text className="text-sm text-center ml-1">50-50</Text>
          </View>
        </TouchableOpacity>

        {/* AI Hint Button */}
        <TouchableOpacity
          className={`p-2 w-1/4 bg-yellow-400 rounded-lg ${
            isAiHintUsed ? "opacity-50" : ""
          }`}
          onPress={async () => {
            aiHint();
            dispatch(setLoading(true));
          }}
          disabled={isAiHintUsed}
        >
          <View className="flex-row items-center justify-center">
            <Image source={require("../../../assets/images/quiz/ai.png")} className="w-6 h-6" />
            <Text className="text-sm text-center ml-1">Hint by AI</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View className="mt-4 flex justify-center items-center">
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        hintByAi && (
          <View className="p-4">
            <Text className="text-base text-green-600 font-semibold">{hintByAi}</Text>
          </View>
        )
      )}
    </View>
  );
};

export default LifeLine;
