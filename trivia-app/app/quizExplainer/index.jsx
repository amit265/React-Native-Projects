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
  const { questionParams } = useLocalSearchParams();

  const questions = JSON.parse(questionParams);

  const router = useRouter();
  useEffect(() => {
    questions && getAiExplainer(questions);
  }, [questions]);

  const getAiExplainer = async (question) => {
    try {
      if (!questions) return;
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
          hint = { hint: hintText }; // Fallback
        }

        setAiHint(hint);
      } else {
        console.error("Unexpected AI response format:", aiResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          top: 20,
          left: 20,
          zIndex: 10
        }}
      >
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
      ) : (
        aiHint && (
          <View style={styles.explanationContainer}>
            <Text style={styles.questionText}>
              {aiHint?.explanation?.question}
            </Text>
            <Text style={styles.answerText}>{aiHint?.explanation?.answer}</Text>
            <Text style={styles.explanationText}>
              {aiHint?.explanation?.detailedExplanation}
            </Text>
          </View>
        )
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
});
