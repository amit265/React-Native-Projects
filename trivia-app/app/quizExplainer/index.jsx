import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { generateAiHint } from "../../config/aiModel";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Prompt from "../../constant/Prompt";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function QuizExplainer() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState(null);
  const router = useRouter();

  // Safely parse question parameters
  const { questionParams } = useLocalSearchParams();
  let questions = null;
  try {
    questions = questionParams ? JSON.parse(questionParams) : null;
  } catch (error) {
    console.error("Invalid questionParams:", questionParams);
  }

  useEffect(() => {
    if (questions) {
      getAiExplainer(questions);
    }
  }, [questions]);

  const getAiExplainer = async (question) => {
    try {
      setAiLoading(true);
      const prompt = Prompt.EXPLAIN + question;
      const aiResponse = await generateAiHint.sendMessage(prompt);

      if (aiResponse?.response?.candidates) {
        const hintText =
          aiResponse.response.candidates[0]?.content?.parts[0]?.text;

        let hint;
        try {
          hint = JSON.parse(hintText);
        } catch (error) {
          console.error("Failed to parse hint text:", hintText);
          hint = { explanation: hintText }; // Ensure it always has a valid format
        }

        setAiHint(hint);
      } else {
        console.error("Unexpected AI response format:", aiResponse);
      }
    } catch (error) {
      console.error("AI explainer error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </Pressable>
      </View>
      <Text style={styles.heading}>Question Explainer</Text>

      {aiLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={styles.loader}
        />
      ) : aiHint ? (
        <View style={styles.explanationContainer}>
          <Text style={styles.questionText}>{aiHint?.explanation?.question}</Text>
          <Text style={styles.answerText}>{aiHint?.explanation?.answer}</Text>
          <Text style={styles.explanationText}>
            {aiHint?.explanation?.detailedExplanation}
          </Text>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>AI Request Limit Reached</Text>
          <Text style={styles.errorMessage}>
            You have reached the maximum number of AI requests for now. Please
            come again tomorrow or explore other quizzes.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    top: 20,
    left: 20,
    zIndex: 10,
  },
  heading: {
    fontSize: 22,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginBottom: 15,
    color: Colors.PRIMARY,
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
  explanationContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  questionText: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#333",
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.SECONDARY,
    fontFamily: "outfit",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    fontFamily: "outfit",
  },
  errorContainer: {
    padding: 20,
    backgroundColor: "#FFEAEA",
    borderRadius: 10,
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#D32F2F",
  },
  errorMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#D32F2F",
    marginTop: 5,
  },
});
