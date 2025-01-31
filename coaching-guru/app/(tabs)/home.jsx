import { View, Text, Platform, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from "../../constant/Colors";
import NoCourse from "../../components/Home/NoCourse";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { userDetailsContext } from "../../context/userDetailsContext";
import CourseList from "../../components/Home/CourseList";
import PracticeSection from "../../components/Home/PracticeSection";
import CourseProgress from "../../components/Home/CourseProgress";

export default function home() {
  const [courseList, setCourseList] = useState([]);
  const { userDetails, setUserDetails } = useContext(userDetailsContext);

  useEffect(() => {
    userDetails && getCourseList();
  }, [userDetails]);
  const getCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetails?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("doc data from home", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            paddingTop: Platform.OS == "ios" && 45,
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Header />
          {courseList?.length === 0 ? (
            <NoCourse />
          ) : (
            <View>
              <CourseProgress courseList={courseList} />
              <PracticeSection />
              <CourseList courseList={courseList} />
            </View>
          )}
        </View>
      }
    />
  );
}
