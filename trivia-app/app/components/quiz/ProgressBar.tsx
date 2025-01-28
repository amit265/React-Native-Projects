import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);
  const totalQuestions = useSelector((store) => store.quiz.questions.length);
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <View className="w-full mb-2">
      <View className="h-2 bg-gray-300 rounded-full">
        <View
          className="h-2 bg-red-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
