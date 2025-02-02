import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../../constant/Colors";
import Intro from "../../../components/CourseView/Intro";
import Chapters from "../../../components/CourseView/Chapters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

export default function CourseView() {
  const { courseParams, courseId, enroll } = useLocalSearchParams();
  const [course, setCourse] = useState([]);
  // const course = JSON.parse(courseParams);
  // console.log("CourseID", courseId);

  useEffect(() => {
    if (!courseParams) {
      getCourseById();
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId]);
  const getCourseById = async () => {
    const docRef = await getDoc(doc(db, "Courses", courseId));
    const courseData = docRef.data();
    setCourse(courseData);
  };

  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
            }}
          >
            <Intro course={course} enroll={enroll}/>
            <Chapters course={course} enroll={enroll}/>
          </View>
        }
      />
    )
  );
}
