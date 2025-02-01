import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PraticeOption } from "../../../constant/Option";
import Colors from "../../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { userDetailsContext } from "../../../context/userDetailsContext";
import CourseListGrid from "../../../components/PracticeScreen/CourseListGrid";

export default function PracticeTypeHomeScreen() {
  const { type } = useLocalSearchParams();
  const option = PraticeOption.find((item) => item.name == type);
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    userDetails && getCourseList();
  }, [userDetails]);
  const getCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetails?.email),
        orderBy("createdOn", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <View>
      <Image source={option.image} style={{ height: 200, width: "100%" }} />
      <View
        style={{
          position: "absolute",
          padding: 20,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{
              backgroundColor: Colors.WHITE,
              padding: 8,
              borderRadius: 10,
            }}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
            color: Colors.WHITE,
          }}
        >
          {type}
        </Text>
      </View>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: 20 }}
        />
      )}

      <CourseListGrid courseList={courseList} option={option}/>
    </View>
  );
}
