import { View, Text, FlatList, Image, Dimensions } from "react-native";
import React, { useContext } from "react";
import Colors from "../../constant/Colors";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";
import { userQuizDataContext } from "../../context/userDetailsContext";

export default function Explore() {
  const screenWidth = Dimensions.get("screen").width;
  const { userQuizList } = useContext(userQuizDataContext);

  // console.log("userQuizList from eplore", userQuizList);
  

  return (
    <FlatList
      data={[]} // Empty data since content is in ListHeaderComponent
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
          {/* Background Image */}
          <Image
            source={require("../../assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 600 }}
          />

          {/* Page Header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 28,
                color: Colors.WHITE,
              }}
            >
              Explore More Quizzes
            </Text>
          </View>

          {/* Course List */}
          <View
            style={{
              marginTop: 30,
              paddingHorizontal: 15,
              paddingBottom: 20,
              width: screenWidth * 0.95,
              alignSelf: "center",
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <CourseListByCategory userQuizList={userQuizList} />
          </View>
        </View>
      }
    />
  );
}
