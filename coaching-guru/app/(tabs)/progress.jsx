import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { userDetailsContext } from "../../context/userDetailsContext";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import getDocs
import { db } from "../../config/firebaseConfig";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export default function Progress() {
  const [courseList, setCourseList] = useState([]);
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (userDetails) {
      getCourseList();
    }
  }, [userDetails]);

  const getCourseList = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetails?.email)
      );
      const querySnapshot = await getDocs(q);

      const courses = [];
      querySnapshot.forEach((doc) => {
        courses.push(doc.data());
      });

      setCourseList(courses); // Use direct assignment instead of spreading
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{ position: "absolute", width: "100%", height: 700 }}
      />
      <View
        style={{
          flex: 1,
          position: "absolute",
          padding: 20,
          marginTop: 20,
          width: "100%", // Ensure the container takes full width
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 30,
            color: Colors.WHITE,
            marginBlock: 10,
          }}
        >
          Course Progress
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        ) : (
          <FlatList
            data={courseList}
            showsVerticalScrollIndicator={false}
            onRefresh={() => getCourseList()}
            refreshing={loading}
            keyExtractor={(item, index) => index.toString()} // Add keyExtractor for unique keys
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/courseView/" + item?.docId,
                    params: {
                      courseParams: JSON.stringify(item),
                    },
                  })
                }
              >
                <CourseProgressCard item={item} width={"100%"} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }} // Add padding at the bottom for better scroll experience
          />
        )}
      </View>
    </View>
  );
}
