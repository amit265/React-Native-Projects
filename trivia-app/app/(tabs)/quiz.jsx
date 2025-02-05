import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import Colors from "../../constant/Colors";
import QuizList from "../../components/Quiz/QuizList";
import NoQuiz from "../../components/Quiz/NoQuiz";
import QuizLists from "../../components/Quiz/QuizLists";

export default function QuizScreen() {
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList } = useContext(userQuizDataContext);

  const [loading, setLoading] = useState(true);
  const [latestQuizzes, setLatestQuizzes] = useState([]);
  const [quizByCategory, setQuizByCategory] = useState({});

  useEffect(() => {
    if (userDetails && userQuizList) {
      getQuizList();
    }
  }, [userDetails, userQuizList]); // Re-run when user or quiz data changes

  const getQuizList = () => {
    setLoading(true);

    // Validate data
    if (
      !Array.isArray(userQuizList) ||
      userQuizList.length === 0 ||
      !userDetails
    ) {
      setLatestQuizzes([]);
      setQuizByCategory({});
      setLoading(false);
      return;
    }

    // ✅ Filter and sort quizzes by creation date
    const userCreatedQuizzes = userQuizList
      .filter((quiz) => quiz?.createdBy === userDetails?.email)
      .sort((a, b) => (b.createdOn) - (a.createdOn));

    // ✅ Extract latest 5 quizzes correctly
    const latest5 = userCreatedQuizzes.slice(0, 5);
    setLatestQuizzes(latest5);

    console.log("latest quiz", latest5.length);

    // ✅ Group ONLY the remaining quizzes into categories
    const remainingQuizzes = userCreatedQuizzes.slice(5);
    const groupedQuizzes = remainingQuizzes.reduce((acc, quiz) => {
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

  // ✅ Use useMemo to optimize FlatList re-renders
  const categoryList = useMemo(
    () => Object.entries(quizByCategory),
    [quizByCategory]
  );

  return (
    <FlatList
      data={categoryList} // Convert object to array
      keyExtractor={(item) => item[0]} // Unique category key
      onRefresh={getQuizList}
      refreshing={loading}
      removeClippedSubviews={true} // ✅ Improves performance
      initialNumToRender={5} // ✅ Render only first 5 items initially
      maxToRenderPerBatch={5} // ✅ Limits the number of items rendered at once
      updateCellsBatchingPeriod={50} // ✅ Smooth scrolling performance
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
              <QuizLists quizList={latestQuizzes} heading="Latest Quizzes" />
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
            <QuizLists quizList={quizzes} heading={category} />
          </View>
        );
      }}
    />
  );
}
