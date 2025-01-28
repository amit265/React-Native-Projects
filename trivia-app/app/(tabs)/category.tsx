import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setSelectedCategory } from "../store/categorySlice";
import { setQuestions } from "../store/quizSlice";
import shuffleArray from "../services/shuffleArray";
import { BASE_URL } from "../utils/constants";
import { ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { useNavigation } from "expo-router";

const Category = () => {
  const dispatch = useDispatch();
  const defaultImage = require("../../assets/images/quiz/science.png");

  // const category = [
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Science" },
  //   { icon: require("../../assets/images/quiz/history.png"), name: "History" },
  //   { icon: require("../../assets/images/quiz/geography.png"), name: "Geography" },
  //   { icon: require("../../assets/images/quiz/art.png"), name: "Art" },
  //   { icon: require("../../assets/images/quiz/sports.png"), name: "Sports" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Technology" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Movies" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Music" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Literature" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Mythology" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Politics" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Business" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Animals" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "Nature" },
  //   { icon: require("../../assets/images/quiz/science.png"), name: "General Knowledge" },
  // ];


  const allQuestions = useSelector((store: { quiz: { questions: any[] } }) => store.quiz.questions);
  // const category = useSelector((store: { category: { categories: CategoryType[] } }) => store.category.categories);
  const navigation = useNavigation();


  const question_category = allQuestions.map((question) => question?.category);
  const uniqueCategory = [...new Set(question_category)];
  dispatch(setCategories(uniqueCategory));

  interface Question {
    category: string;
    [key: string]: any;
  }

  interface CategoryType {
    icon: any;
    name: string;
  }

  const handleCategory = (cat: string) => {
    const filteredQuestions = allQuestions.filter(
      (question: Question) => question.category === cat
    );
    dispatch(setSelectedCategory(cat));
    dispatch(setQuestions(shuffleArray(filteredQuestions).slice(0, 10)));
    navigation.navigate("quiz");

  };

  if (uniqueCategory?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-900">
      <Text className="text-lg font-semibold text-white text-center mb-6">
        Choose a Category
      </Text>
      <FlatList
        data={uniqueCategory}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10 }} // Padding for the content inside FlatList
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index + item} // Unique key for each item
            className="bg-white rounded-xl m-2 p-4 w-full items-center justify-center"
            onPress={() => handleCategory(item)}
            style={{ flex: 1, alignItems: 'center', width: '48%' }} // Ensures each item takes up about half of the width
          >
            <Image source={defaultImage} style={{ width: 40, height: 40 }} />
            <Text className="text-xl text-center mt-2">{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;
