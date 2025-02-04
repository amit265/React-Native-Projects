import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import { userDetailsContext } from "../../context/userDetailsContext";

export default function LeaderBoardScreen() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDetails } = useContext(userDetailsContext); // ✅ Get user details from context

  useEffect(() => {
    getLeaderBoard();
  }, []);

  const getLeaderBoard = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "triviaUsers");
      const leaderboardQuery = query(usersRef, orderBy("totalScore", "desc"));
      const leaderboardSnapshot = await getDocs(leaderboardQuery);

      const leaderboardData = leaderboardSnapshot.docs.map((doc, index) => ({
        name: doc.data().name || "Unknown",
        email: doc.id,
        totalQuiz: doc.data().scoreHistory?.length || 0,
        totalScore: doc.data().totalScore || 0,
        rank: index + 1, // ✅ Store rank directly
      }));

      setLeaderboard(leaderboardData);

      // ✅ Find logged-in user's rank using context email
      const userEntry = leaderboardData.find(
        (user) => user.email === userDetails.email
      );
      setUserRank(userEntry || null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
      </View>

      {/* Leaderboard List */}
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ padding: 26 }}
        />
      ) : (
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.email}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View>
              <View style={[styles.card, item.rank === 1 && styles.firstPlace]}>
                <Text style={styles.rank}>#{item.rank}</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.detail}>
                    Quizzes Taken: {item.totalQuiz}
                  </Text>
                </View>
                <Text style={styles.totalScore}>{item.totalScore}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Logged-in User's Rank (Always at Bottom) */}
      {userRank && !loading && (
        <View style={[styles.card, styles.currentUserCard]}>
          <Text style={styles.rank}>#{userRank.rank}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userRank.name} (You)</Text>
            <Text style={styles.detail}>
              Quizzes Taken: {userRank.totalQuiz}
            </Text>
          </View>
          <Text style={styles.totalScore}>{userRank.totalScore}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 400,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 15,
  },
  headerTitle: {
    fontFamily: "outfit-bold",
    fontSize: 24,
    color: Colors.WHITE,
    marginLeft: 40,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  firstPlace: {
    backgroundColor: "#FFD700",
  },
  currentUserCard: {
    backgroundColor: "#E0F7FA",
    borderWidth: 1,
    borderColor: "#00ACC1",
  },
  rank: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#444",
    width: 40,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    color: "#222",
  },
  detail: {
    fontSize: 14,
    fontFamily: "outfit",
    color: "#666",
  },
  totalScore: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    textAlign: "right",
    minWidth: 60,
  },
});
