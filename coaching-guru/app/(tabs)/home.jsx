import {
  View,
  Text,
  Platform,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    userDetails && getCourseList();
  }, [userDetails]);
  const getCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetails?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  return (
    <FlatList
      data={[]}
      onRefresh={() => getCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View style={{ backgroundColor: Colors.WHITE }}>
          <Image
            source={require("../../assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 600 }}
          />
          <View
            style={{
              padding: 25,
              paddingTop: Platform.OS == "ios" && 45,
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
        </View>
      }
    />
  );
}
