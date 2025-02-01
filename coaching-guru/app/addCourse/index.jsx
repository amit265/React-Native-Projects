import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import {
  generateCourseAiModel,
  generateTopicsAiModel,
} from "../../config/aiModel";
import Prompt from "../../constant/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { userDetailsContext } from "../../context/userDetailsContext";
import { useRouter } from "expo-router";

export default function AddCourse() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState();
  const [selectedTopic, setSelectedTopic] = useState([]);
  const { userDetails, getUserDetails } = useContext(userDetailsContext);
  const onGenerateTopic = async () => {
    try {
      setLoading(true);
      if (userDetails?.member == false) {
        router.push("/subscription");
        return;
      }
      const PROMPT = userInput + Prompt.IDEA;
      const aiResponse = await generateTopicsAiModel.sendMessage(PROMPT);

      if (aiResponse.response && aiResponse.response.candidates) {
        const topicIdeaText =
          aiResponse?.response?.candidates[0]?.content?.parts[0]?.text;

        let topicIdea;
        try {
          topicIdea = JSON.parse(topicIdeaText);
          if (!Array.isArray(topicIdea)) {
            topicIdea = [topicIdea]; // Ensure it's an array
          }
        } catch (error) {
          console.error("Error parsing AI response:", error);
          topicIdea = []; // Fallback to an empty array
        }

        setTopics(topicIdea);

        console.log("topicIdea", topicIdea);
      } else {
        console.error("Unexpected AI response format:", aiResponse);
      }
    } catch (error) {
      console.error("Error generating topic:", error);
    } finally {
      setLoading(false);
    }
  };

  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopic.find((item) => item === topic);
    if (!isAlreadyExist) {
      setSelectedTopic((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopic.filter((item) => item !== topic);
      setSelectedTopic(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selection = selectedTopic.find((item) => item === topic);
    return selection ? true : false;
  };

  const onGenerateCourse = async () => {
    setLoading(true);
    try {
      const PROMPT = selectedTopic + Prompt.COURSE;
      // console.log("PROMPT", PROMPT);

      const aiResponse = await generateTopicsAiModel.sendMessage(PROMPT);
      const courses = JSON.parse(aiResponse?.response?.text());
      console.log("courses :", courses);
      const courseList = courses?.courses; // Extract the array
      if (!Array.isArray(courseList)) {
        throw new Error("Parsed courses is not an array");
      }
      // console.log("Parsed Courses:", JSON.stringify(courses, null, 2));
      for (const course of courseList) {
        const docId = Date.now().toString();
        await setDoc(doc(db, "Courses", docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetails?.email ?? "",
          docId: docId,
        });
      }
      console.log("Final Parsed Courses:", courses);

      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error generating topic:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={{ padding: 25, backgroundColor: Colors.WHITE, flex: 1 }}>
      
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Create New Course
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 25 }}>
        What you want to learn today
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What course you want to create (ex. Learn Python, Digital Marketing,
        etc...)
      </Text>
      <TextInput
        style={styles.textInput}
        numberOfLines={2}
        multiline={true}
        onChangeText={(value) => setUserInput(value)}
        placeholder="(ex. Learn Python, Digital Marketing, etc...)"
      />
      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
      <View style={{ marginTop: 15, marginBottom: 15 }}>
        <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
          Select the topic that you want to add in the course
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 10,
        }}
      >
        {topics &&
          topics?.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 7,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
      </View>
      {selectedTopic?.length > 0 && (
        <Button
          text="Generate Course"
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    height: 80,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 15,
  },
});
