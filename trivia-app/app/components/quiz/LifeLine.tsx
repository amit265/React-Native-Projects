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
    const gptQuery =
      "You are a trivia master. Please provide a hint for the question below that encourages the user to think critically, but do not reveal the answer directly. The hint should be in 1-2 sentences and guide the user to analyze the question and options: " +
      question;

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptResult = gptResults.choices?.[0]?.message?.content?.trim();
      if (!gptResult) throw new Error("No hint received from the AI");

      dispatch(setAiHint(gptResult));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching hint:", error.message);
      } else {
        console.error("Error fetching hint:", error);
      }
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
