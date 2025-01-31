import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserAnswer } from "../../store/quizSlice";

const QuestionOptions = () => {
  const dispatch = useDispatch();
  const removeIncorrectAnswer = useSelector(
    (store) => store.quiz.removeIncorrectAnswer
  );
  const options = useSelector((store) => store.quiz.currentQuestionOption);
  const correctAnswer = useSelector((store) => store.quiz.correctAnswer);
  const userAnswer = useSelector((store) => store.quiz.userAnswer);
  const isAnswerSubmitted = useSelector(
    (store) => store.quiz.isAnswerSubmitted
  );

  const handleOptionSelect = (option) => {
    console.log("Selected option:", option);
    dispatch(setUserAnswer(option));
  };

  const renderItem = ({ item: option }) => (
    <TouchableOpacity
      disabled={removeIncorrectAnswer.includes(option)}
      className={`w-full p-2 mb-2 rounded-lg ${
        isAnswerSubmitted
          ? option === correctAnswer
            ? "bg-green-500 text-white animate-pulse transition-all duration-75"
            : option === userAnswer
            ? "bg-red-500 text-white animate-pulse transition-all duration-100"
            : "bg-gray-100"
          : userAnswer === option
          ? "bg-blue-500 text-white"
          : "bg-gray-100"
      } hover:bg-blue-100`}
      onPress={() => handleOptionSelect(option)}
    >
      <Text
        className={`${
          removeIncorrectAnswer.includes(option) ? "line-through text-red-600" : ""
        }`}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-4">
      <FlatList
        data={options}
        keyExtractor={(item) => item} // Ensure each option is unique
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }} // Add spacing for the list
      />
    </View>
  );
};

export default QuestionOptions;
