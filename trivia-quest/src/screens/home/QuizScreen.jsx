import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentQuestionIndex,
  setUserScore,
} from "../../store/slices/quizSlice";
import {
  setAiHint,
  setIsAiHintUsed,
  setLoading,
} from "../../store/slices/lifeLine";
import useFetchQuestions from "@/src/services/useFetchQuestions";

const QuizScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Fetch quiz questions from Redux store
  const questions = useSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const userScore = useSelector((state) => state.quiz.userScore);
  const aiHint = useSelector((state) => state.lifeLine.aiHint);
  const isAiHintUsed = useSelector((state) => state.lifeLine.isAiHintUsed);
  const loading = useSelector((state) => state.lifeLine.isLoading);

  // State for user selection
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Get current question
  const question = questions[currentQuestionIndex];
  useFetchQuestions();

  // Function to handle user selecting an option
  const handleAnswer = (option) => {
    if (isAnswered) return; // Prevent multiple selections

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === question.correct_answer[0]) {
      dispatch(setUserScore(userScore + 10)); // Increase score
    }

    setTimeout(() => {
      // Move to the next question or finish the quiz
      if (currentQuestionIndex < questions.length - 1) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      } else {
        navigation.navigate("ResultsScreen");
      }
      setSelectedOption(null);
      setIsAnswered(false);
    }, 1000);
  };

  // Function to get AI Hint from backend
  const fetchAIHint = async () => {
    if (isAiHintUsed) return;

    dispatch(setIsAiHintUsed(true));
    dispatch(setLoading(true));

    try {
      const response = await fetch(
        "http://your-server-url/api/ai/get-ai-hint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: question.question }),
        }
      );

      const data = await response.json();
      if (data.hint) dispatch(setAiHint(data.hint));
    } catch (error) {
      console.error("Error fetching AI hint:", error);
    }

    dispatch(setLoading(false));
  };

  if (!question) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold text-center">Quiz</Text>
      <View className="p-4 flex-1 justify-center">
        {/* Question */}
        <Text className="text-lg font-bold mb-4">{question.question}</Text>

        {/* Options */}
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(option)}
            className={`p-3 border rounded-lg my-2 ${
              isAnswered
                ? option === question.correct_answer[0]
                  ? "bg-green-400"
                  : option === selectedOption
                  ? "bg-red-400"
                  : "bg-white"
                : "bg-white"
            }`}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}

        {/* AI Hint Button */}
        <TouchableOpacity
          onPress={fetchAIHint}
          disabled={isAiHintUsed}
          className={`p-3 bg-blue-400 rounded-lg my-4 ${
            isAiHintUsed ? "opacity-50" : ""
          }`}
        >
          <Text className="text-center text-white">Hint by AI</Text>
        </TouchableOpacity>

        {/* AI Hint Display */}
        {loading ? (
          <ActivityIndicator size="small" color="blue" />
        ) : (
          aiHint && <Text className="text-green-500 mt-2">{aiHint}</Text>
        )}

        {/* Next Button (for manual navigation) */}
        {isAnswered && (
          <TouchableOpacity
            onPress={() =>
              currentQuestionIndex < questions.length - 1
                ? dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1))
                : navigation.navigate("ResultsScreen")
            }
            className="p-3 bg-yellow-400 rounded-lg mt-4"
          >
            <Text className="text-center">Next</Text>
          </TouchableOpacity>
        )}

        {/* Leaderboard Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ResultScreen")}
          className="p-3 bg-green-400 rounded-lg mt-4"
        >
          <Text className="text-center text-white">ResultScreen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuizScreen;
