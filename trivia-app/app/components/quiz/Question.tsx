import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestionOption } from '../../store/quizSlice';

const Question = () => {
  const dispatch = useDispatch();
  
  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);
  const questions = useSelector((store) => store.quiz.questions);
  const question = questions[currentQuestionIndex];

  useEffect(() => {
    // Dispatch the current question options on every question change
    dispatch(setCurrentQuestionOption(question.options));
  }, [dispatch, question.options]);

  return (
    <View className="p-4">
      <Text className="text-xl font-bold">{`${currentQuestionIndex + 1}. ${question.question}`}</Text>
    </View>
  );
};

export default Question;
