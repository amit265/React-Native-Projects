import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "expo-router";

const UserScore = () => {
  const userScore = useSelector((store) => store.quiz.userScore);
  const questions = useSelector((store) => store.quiz.questions);
  const timer = useSelector((store) => store.ui.timer);
  const navigation = useNavigation();

  return (
    <View className="flex flex-row justify-between items-center bg-black p-4">
      {/* Navigation Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate('category')}>
        <Text className="text-white text-3xl">←</Text>
      </TouchableOpacity>

      {/* Optional Timer Section (Uncomment if needed) */}
      {/* <View className="flex flex-row items-center gap-4">
        <Text className="text-white text-xl">⏰</Text>
        <Text className="text-white text-xl">{timer}</Text>
      </View> */}

      {/* User Score Display */}
      <Text className="text-white text-base text-center">
        Your score: {userScore} / {questions.length * 10}
      </Text>
    </View>
  );
};

export default UserScore;
