import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import {
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import QuizList from "../Quiz/QuizList";
import Colors from "../../constant/Colors";

export default function CourseListByCategory({ userQuizList }) {
  const [quizByCategory, setQuizByCategory] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   getCourseListByCategory();
  }, [])

  const getCourseListByCategory = () => {
    setLoading(true);
    try {
      // Step 2: Group by category
      const groupedQuizzes = userQuizList.reduce((acc, quiz) => {
        const category = quiz.category || "Uncategorized";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(quiz);
        return acc;
      }, {});

      setQuizByCategory(groupedQuizzes);
    } catch (error) {
      console.log("Error fetching quizzes:", error);
    }
    setLoading(false);
  };

  console.log("Quiz List By Category:", quizByCategory);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : Object.keys(quizByCategory).length > 0 ? (
        <FlatList
          data={Object.entries(quizByCategory)} // Converts object into an array of [category, quizzes]
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            const [category, userQuizList] = item;
            return (
              <View key={category} style={{ marginBottom: 20 }}>
                {/* <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
                  {category}
                </Text> */}
                <QuizList heading={category}/>
              </View>
            );
          }}
        />
      ) : (
        <Text>No quizzes found</Text>
      )}
    </View>
  );
}
