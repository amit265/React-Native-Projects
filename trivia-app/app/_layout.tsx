import { Stack } from "expo-router";
import { useState } from "react";
import {
  userDetailsContext,
  userQuizDataContext,
  quizAttemptsContext,
  dbUpdateContext,
} from "../context/userDetailsContext";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  const [userDetails, setUserDetails] = useState();
  const [userQuizList, setUserQuizList] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [dbUpdate, setUpdate] = useState(false); // ✅ State to track updates

  return (
    <userDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <userQuizDataContext.Provider value={{ userQuizList, setUserQuizList }}>
        <quizAttemptsContext.Provider value={{ quizAttempts, setQuizAttempts }}>
          <dbUpdateContext.Provider value={{ dbUpdate, setUpdate }}> 
            {/* ✅ Providing dbUpdate and setUpdate */}
            <StatusBar backgroundColor="white" barStyle="dark-content" hidden={false} />
            <Stack screenOptions={{ headerShown: false }} />
          </dbUpdateContext.Provider>
        </quizAttemptsContext.Provider>
      </userQuizDataContext.Provider>
    </userDetailsContext.Provider>
  );
}
