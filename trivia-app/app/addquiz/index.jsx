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
  generateQuizAiModel,
  generateTopicsAiModel,
} from "../../config/aiModel";
import Prompt from "../../constant/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { userDetailsContext } from "../../context/userDetailsContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

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
      // if (userDetails?.member == false) {
      //   router.push("/subscription");
      //   return;
      // }
      if (!userInput) {
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

  const onGenerateQuiz = async () => {
    setLoading(true);
    try {
      const PROMPT = selectedTopic + Prompt.QUIZ;
      console.log("PROMPT", PROMPT);

      const aiResponse = await generateQuizAiModel.sendMessage(PROMPT);
      const quizList = JSON.parse(aiResponse?.response?.text());

      // console.log("Parsed Courses:", JSON.stringify(quizList, null, 2));
      // console.log("type of ", typeof quizList);

      for (const quiz of quizList?.quizzes) {
        const docId = Date.now().toString();
        await setDoc(doc(db, "Quizzes", docId), {
          ...quiz,
          createdOn: new Date(),
          createdBy: userDetails?.email ?? "",
          docId: docId,
        });
      }

      router.push("/(tabs)/quiz");
    } catch (error) {
      console.error("Error generating topic:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE, flex: 1 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30, marginLeft: 40 }}>
        Create New Quiz
      </Text>

      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          top: 8,
          gap: 10,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
      </View>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What topic you want quiz on (ex. General Knowledge, History, Python,
        Digital Marketing, etc...)
      </Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={2}
        onChangeText={(value) => setUserInput(value)}
        placeholder="(ex. History, sports, fashion, etc...)"
      />
      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
      {topics && (
        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontFamily: "outfit", fontSize: 20 }}>
            Select the topic that you want quiz on
          </Text>
        </View>
      )}
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
          text="Generate Quiz"
          onPress={() => onGenerateQuiz()}
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
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 15,
  },
});
