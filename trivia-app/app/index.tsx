import { Text, View, Image } from "react-native";
import "../global.css"
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="bg-[#132f94] marker:flex flex-col gap-8 items-center justify-center min-h-screen">
      <Text style={{ fontFamily: "HomemadeApple" }} className="text-white text-2xl font-semibold">TriviaQuest
      </Text>
      <View>
        <Image
          source={require('../assets/images/quiz/trivia_logo.png')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <Text className="text-white text-4xl text-center font-bold">Discover Facts, Conquer Challenges!</Text>
      <Text className="text-white w-2/3 text-center">Join the ultimate trivia adventure with TriviaQuest! Dive into engaging quizzes, challenge your brain, and win amazing rewards</Text>
      <Link href="/(tabs)/home">
      <Text className="text-red-400 font-bold text-xl">Go to Home screen</Text></Link>

    </View >
  );
}
