import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { userDetailsContext } from "../../context/userDetailsContext";
import QuizList from "../Quiz/QuizList";

export default function CourseListByCategory() {
  const { userDetails } = useContext(userDetailsContext);
  const [quizByCategory, setQuizByCategory] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(quizByCategory).length === 0) {
      getCourseListByCategory();
    }
  }, [userDetails]);

  const getCourseListByCategory = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "Quizzes"), orderBy("createdOn", "desc"));
      const querySnapshot = await getDocs(q);

      // Step 1: Fetch all quizzes
      const quizzes = querySnapshot.docs.map((doc) => doc.data());

      // Step 2: Group by category
      const groupedQuizzes = quizzes.reduce((acc, quiz) => {
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
        <ActivityIndicator size="large" color={"#0000ff"} />
      ) : Object.keys(quizByCategory).length > 0 ? (
        <FlatList
          data={Object.entries(quizByCategory)} // Converts object into an array of [category, quizzes]
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            const [category, quizzes] = item;
            return (
              <View key={category} style={{ marginBottom: 20 }}>
                {/* <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}>
                  {category}
                </Text> */}
                <QuizList quizList={quizzes} heading={category} enroll={true} />
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
