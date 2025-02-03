import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import Colors from "../../constant/Colors";
import QuizList from "../../components/Quiz/QuizList";
import NoQuiz from "../../components/Quiz/NoQuiz";

export default function QuizScreen() {
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList, setUserQuizList } = useContext(userQuizDataContext);

  const [loading, setLoading] = useState(true);
  const [quizByCategory, setQuizByCategory] = useState({});
  const [latestQuizzes, setLatestQuizzes] = useState([]);

  useEffect(() => {
    if (userDetails && userQuizList) {
      getQuizList();
    }
  }, [userDetails, userQuizList]); // Depend on both userDetails and userQuizList

  const getQuizList = () => {
    setLoading(true);

    // Ensure userQuizList is an array before proceeding
    if (!Array.isArray(userQuizList) || userQuizList.length === 0) {
      setLatestQuizzes([]);
      setQuizByCategory({});
      setLoading(false);
      return;
    }

    const latest10 = userQuizList.slice(0, 10);
    setLatestQuizzes(latest10);

    // Group remaining quizzes by category
    const groupedQuizzes = userQuizList.slice(10).reduce((acc, quiz) => {
      const category = quiz?.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(quiz);
      return acc;
    }, {});

    setQuizByCategory(groupedQuizzes);
    setLoading(false);
  };

  return (
    <FlatList
      data={Object.entries(quizByCategory)} // Convert object to array
      keyExtractor={(item) => item[0]}
      onRefresh={getQuizList}
      refreshing={loading}
      ListHeaderComponent={
        <View style={{ backgroundColor: Colors.WHITE }}>
          {/* Background Image */}
          <Image
            source={require("../../assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 600 }}
          />

          {/* Page Header */}
          <View
            style={{ padding: 25, paddingTop: Platform.OS === "ios" ? 45 : 25 }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 30,
                color: Colors.WHITE,
              }}
            >
              Quiz
            </Text>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            ) : Object.keys(quizByCategory).length === 0 &&
              latestQuizzes.length === 0 ? (
              <NoQuiz />
            ) : null}
          </View>

          {/* Latest Quizzes Section */}
          {latestQuizzes.length > 0 && (
            <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
              <QuizList quizList={latestQuizzes} heading="Latest Quizzes" />
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => {
        const [category, quizzes] = item;
        return (
          <View
            key={category}
            style={{ marginBottom: 20, paddingHorizontal: 20 }}
          >
            <QuizList quizList={quizzes} heading={category} />
          </View>
        );
      }}
    />
  );
}
