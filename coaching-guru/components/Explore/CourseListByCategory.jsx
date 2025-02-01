import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useRouter } from "expo-router";
import CourseList from "../Home/CourseList";

export default function CourseListByCategory({ category }) {
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCourseListByCategory();
  }, []);

  const getCourseListByCategory = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "Courses"),
        where("category", "==", category),
        orderBy("createdOn", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setCourseList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    courseList?.length > 0 && (
      <View>
        {loading && <ActivityIndicator size={"large"} />}
        <CourseList courseList={courseList} heading={category} enroll={true} />
      </View>
    )
  );
}
