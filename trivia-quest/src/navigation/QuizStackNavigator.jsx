import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/home/QuizScreen";
import ResultScreen from "../screens/home/ResultScreen";

const QuizStack = createStackNavigator();

const QuizStackNavigator = () => {
  return (
    <QuizStack.Navigator screenOptions={{ headerShown: false }}>
      <QuizStack.Screen name="QuizScreen" component={QuizScreen} />
      <QuizStack.Screen
        options={{ headerShown: true }}
        name="ResultScreen"
        component={ResultScreen}
      />
    </QuizStack.Navigator>
  );
};

export default QuizStackNavigator;
