import { View, Text, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { imageAssets } from "../../constant/Option";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "../../constant/Colors";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";
import { userDetailsContext } from "../../context/userDetailsContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function Intro({ course, enroll }) {
  const router = useRouter();
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      if (userDetails?.member == false) {
        router.push("/subscription");
        return;
      }
      const data = {
        ...course,
        createdBy: userDetails?.email,
        createdOn: new Date(),
        enrolled: true,
      };
      const docId = Date.now().toString();
      await setDoc(doc(db, "Courses", docId), data);

      router.push({
        pathname: "/courseView/" + docId,
        params: {
          courseParams: JSON.stringify(data),
          enroll: false,
        },
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <View>
      <Image
        source={imageAssets[course?.banner_image]}
        style={{
          width: "100%",
          height: 280,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          {course?.courseTitle}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <AntDesign name="book" size={24} color="black" />
          <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 10 }}
        >
          Description
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 18, color: Colors.GRAY }}
        >
          {course?.description}
        </Text>
        {enroll == "true" ? (
          <Button
            text={"Enroll Now"}
            loading={loading}
            onPress={() => onEnrollCourse()}
          />
        ) : null}
      </View>
      <Pressable
        style={{ position: "absolute", padding: 10, marginTop: 25 }}
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>
    </View>
  );
}
