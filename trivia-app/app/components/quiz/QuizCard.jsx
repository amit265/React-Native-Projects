import React from 'react';
import { View } from 'react-native';
import Question from './Question';
import QuestionOptions from './QuestionOptions';

const QuizCard = () => {
  return (
    <View className="bg-white p-4 shadow-md rounded-t-lg">
      <Question />
      <QuestionOptions />
    </View>
  );
};

export default QuizCard;
