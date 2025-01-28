import React from 'react';
import { View, Text } from 'react-native';

interface HeaderProps {
  score: number;
}

const Header = ({ score }: HeaderProps) => {
  return (
    <View className="w-full rounded-lg shadow-md mb-4">
      <View className="flex flex-row justify-between items-center p-4">
        <Text className="text-balck text-lg text-center mx-auto font-bold">Total Score: {score}</Text>
      </View>
    </View>
  );
};

export default Header;
