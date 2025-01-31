import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ score }) => {
  return (
    <View className="w-full rounded-lg shadow-md mb-4">
      <View className="flex flex-row justify-between items-center p-4">
        <Text className="text-balck text-lg text-center mx-auto font-bold">Total Score: {score}</Text>
      </View>
    </View>
  );
};

export default Header;
