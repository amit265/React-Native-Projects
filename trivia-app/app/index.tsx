import { Text, View, Image, TouchableOpacity } from "react-native";
import "../global.css"
import { Link } from "expo-router";
import useFetchQuestions from "./services/useFetchQuestions";

export default function Index() {
  useFetchQuestions();

  return (
    <View className="bg-[#132f94] flex-1 flex-col gap-3 items-center justify-center">
      <Text className="text-white pt-10 text-3xl text-center font-semibold leading-snug" style={{ fontFamily: "HomemadeApple" }}>
        TriviaQuest
      </Text>

      <View className="mt-4">
        <Image
          source={require("../assets/images/quiz/trivia_logo.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <Text className="text-white text-3xl text-center font-semibold mt-4 leading-snug">
        Discover Facts, Conquer Challenges!
      </Text>

      <Text className="text-white text-lg text-center mt-4 leading-relaxed">
        Join the ultimate trivia adventure with TriviaQuest! Dive into engaging
        quizzes, challenge your brain, and win amazing rewards.
      </Text>

      {/* Google Login Button */}

      <TouchableOpacity
        className="mt-6 bg-[#ffcc01] px-6 py-3 rounded-xl hover:bg-yellow-600 hover:text-white transition duration-300"
      // onPress={() => {
      //   promptAsync(); // Trigger Google login
      // }}
      >
        <Link href={"/(tabs)/category"}>
          <Text className="text-black font-bold text-xl text-center">
            Go to Quiz
          </Text>
        </Link>

      </TouchableOpacity>
    </View >
  );
}
