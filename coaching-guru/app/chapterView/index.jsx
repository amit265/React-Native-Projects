import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function ChapterView() {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getProgress = (currentPage) => {
    const percentage = currentPage / chapters?.content?.length;
    return percentage;
  };

  const onChapterComplete = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "Courses", docId), {
        completedChapter: arrayUnion(chapterIndex),
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    router.back();
  };
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
        marginTop: 10,
      }}
    >
      <Progress.Bar
        progress={getProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 20, marginTop: 5 }}>
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <Text
            style={[
              styles.codeExampleText,
              { backgroundColor: Colors.BLACK, color: Colors.WHITE },
            ]}
          >
            {chapters?.content[currentPage]?.code}
          </Text>
        )}
        {chapters?.content[currentPage]?.example && (
          <Text style={styles.codeExampleText}>
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
      </View>

      <View
        style={{ position: "absolute", bottom: 15, width: "100%", left: 25 }}
      >
        {chapters?.content?.length - 1 != currentPage ? (
          <Button
            text={"Next"}
            onPress={() => setCurrentPage(currentPage + 1)}
          />
        ) : (
          <Button
            text={"Finish"}
            onPress={() => onChapterComplete()}
            loading={loading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: 18,
    marginTop: 15,
  },
});
