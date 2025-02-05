import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Header from "../../components/Home/Header";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { useRouter } from "expo-router";
import {
  dbUpdateContext,
  quizAttemptsContext,
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import QuizLists from "../../components/Quiz/QuizLists";

export default function MainScreen() {
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList, setUserQuizList } = useContext(userQuizDataContext);
  const { quizAttempts, setQuizAttempts } = useContext(quizAttemptsContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dbUpdate } = useContext(dbUpdateContext);

  useEffect(() => {
    if (userDetails) {
      fetchQuizzes();
      fetchAttemptedQuizzes();
    }
  }, [userDetails, dbUpdate]);

  /** Fetch Quiz List from Firestore */
  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(query(collection(db, "Quizzes")));
      const quizzes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserQuizList(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch Attempted Quizzes from Firestore */
  const fetchAttemptedQuizzes = async () => {
    if (!userDetails?.email) return;
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "quizAttempts"),
          where("userId", "==", userDetails.email)
        )
      );
      const quizzes = querySnapshot.docs.map((doc) => doc.data());
      setQuizAttempts(quizzes);
    } catch (error) {
      console.error("Error fetching attempted quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  /** Start Quiz Function */
  const handleStartQuiz = () => {
    if (!userQuizList || userQuizList.length === 0) {
      console.warn("No quizzes available.");
      return;
    }

    const randomQuiz =
      userQuizList[Math.floor(Math.random() * userQuizList.length)];
    if (!randomQuiz?.id) {
      console.warn("Quiz ID not found.");
      return;
    }

    router.push({
      pathname: `/quizView/${randomQuiz.id}`,
      params: { quizParam: JSON.stringify(randomQuiz.id) },
    });
  };

  /** Get Latest Quizzes */
  const latestQuizzes = useMemo(
    () =>
      [...(userQuizList || [])]
        .sort((a, b) => b.createdOn - a.createdOn)
        .slice(0, 5),
    [userQuizList]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}

      {/* Background Image */}
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

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {userQuizList.length > 0 && (
            <Button
              text="Start Quiz"
              onPress={handleStartQuiz}
              style={styles.startQuizButton}
            />
          )}
          <Button
            text="Explore Existing Quizzes"
            type="outline"
            onPress={() => router.push("/explore")}
          />
        </View>
      </View>

      {/* Features & Trending Quizzes */}
      <View style={styles.featuresSection}>
        <QuizLists quizList={latestQuizzes} heading="Trending Quizzes" />
        <Text style={styles.featuresTitle}>Why You'll Love This App</Text>
        {[
          "🤖 AI-Powered Questions",
          "📝 Create Custom Quizzes",
          "🏆 Real-Time Leaderboards",
          "🎁 Daily Challenges & Rewards",
        ].map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

/** Styles */
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
    resizeMode: "cover", // Ensures the background image scales well
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
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    color: Colors.WHITE,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "outfit",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "80%",
  },
  featuresSection: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  featuresTitle: {
    fontSize: 24,
    fontFamily: "outfit-bold",
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
    fontFamily: "outfit",
  },
  startQuizButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%", // Adjust button width for mobile and web
  },
});

// // Add media queries for web responsiveness
// if (Platform.OS === "web") {
//   const additionalStyles = StyleSheet.create({
//     container: {
//       width: Dimensions.get("window").width * 0.8, // Now takes 80% of the screen width
//       marginHorizontal: "auto", // Centers the container horizontally
//       paddingHorizontal: 20, // Adjusted padding to prevent content from touching edges
//       flex: 1, // Ensure the container takes full height available
//     },
//     backgroundImage: {
//       width: Dimensions.get("window").width, // Full width of the screen
//       height: 800,
//       position: "absolute", // Ensures background stays in place
//       top: 0, // Starts from the top
//       left: 0, // Starts from the left
//       objectFit: "cover", // Ensures the image covers without stretching weirdly
//     },
//     heroTitle: {
//       fontSize: 40, // Larger font size on web
//       textAlign: "center", // Centers the title
//     },
//     heroSubtitle: {
//       fontSize: 20, // Adjusted font size on web
//       textAlign: "center", // Centers the subtitle
//     },
//     featuresTitle: {
//       fontSize: 28, // Larger title on web
//       textAlign: "center", // Centers the feature title
//     },
//   });

//   Object.assign(styles, additionalStyles);
// }
