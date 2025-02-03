import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { useRouter } from "expo-router";
import {
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";

export default function MainScreen() {
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList, setUserQuizList } = useContext(userQuizDataContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userDetails) getQuizList();
  }, [userDetails]);

  const getQuizList = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "Quizzes"),
        where("createdBy", "==", userDetails?.email),
        orderBy("createdOn", "desc")
      );
      const querySnapshot = await getDocs(q);

      const quizzes = querySnapshot.docs.map((doc) => doc.data());
      setUserQuizList(quizzes);
    } catch (error) {
      console.log("Error fetching quizzes:", error);
    }
    setLoading(false);
  };

  const randomQuizIndex = Math.round(Math.random() * userQuizList?.length);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Image */}
      {loading && <ActivityIndicator size={"large"} />}
      <Image
        source={require("../../assets/images/wave.png")}
        style={styles.backgroundImage}
      />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to Trivia AI!</Text>
        <Text style={styles.heroSubtitle}>
          Test your knowledge with AI-powered personalized trivia.
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            text={"Create Your Own Quiz"}
            type="outline"
            onPress={() => router.push("/addquiz")}
          />
          <Button
            text={"Explore Existing Quizzes"}
            type="outline"
            onPress={() => router.push("/quiz")}
          />
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>Why You'll Love This App</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>🤖 AI-Powered Questions</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>📝 Create Custom Quizzes</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>🏆 Real-Time Leaderboards</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>🎁 Daily Challenges & Rewards</Text>
        </View>
      </View>

      {/* Quiz Categories Section */}
      <View style={styles.startQuizSection}>
        {userQuizList && userQuizList.length > 0 && (
          <Button
            text={"Start Quiz"}
            onPress={() => {
              const randomIndex = Math.floor(Math.random() * userQuizList.length);
              const randomQuiz = userQuizList[randomIndex];

              if (!randomQuiz?.docId) {
                console.warn("Quiz docId not found");
                return;
              }

              router.push({
                pathname: "/quizView/" + randomQuiz.docId,
                params: {
                  courseParams: JSON.stringify(randomQuiz),
                },
              });
            }}
            style={styles.startQuizButton}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: Colors.BACKGROUND,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 800,
  },
  headerContainer: {
    padding: 25,
    paddingTop: Platform.OS === "ios" ? 45 : 25,
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    color: Colors.WHITE,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "normal",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "80%"
  },
  button: {
    marginBottom: 10,
  },
  featuresSection: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
    marginBottom: 20,
  },
  featureItem: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 18,
    color: Colors.BLACK,
    fontFamily: "outfit"
  },
  startQuizSection: {
    marginTop: 30,
    paddingHorizontal: 16,
  
  },
  startQuizButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
});
