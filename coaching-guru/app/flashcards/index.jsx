import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import FlipCard from "react-native-flip-card";
import * as Progress from "react-native-progress";

export default function FlashCards() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcard = course?.flashcards;
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const width = Dimensions.get("screen").width;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Detect when 50% of the card is visible
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index);
    }
  };

  const getProgress = (currentPage) => {
    if (flashcard?.length <= 1) return 1; // Prevent division by zero
    return currentPage / (flashcard.length - 1);
  };

  return (
    <View>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{ height: 500, width: "100%" }}
      />

      <View style={{ position: "absolute", padding: 25, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} / {flashcard?.length}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get("window").width * 0.85}
            color={Colors.WHITE}
            height={8}
          />
        </View>
        <FlatList
          data={flashcard}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 500,
                marginTop: 60,
              }}
            >
              <FlipCard
                style={styles.card}
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                // flip={true}
                clickable={true}
              >
                {/* Face Side */}
                <View style={styles.face}>
                  <Text style={{ fontFamily: "outfit-bold", fontSize: 28 }}>
                    {item?.front}
                  </Text>
                </View>
                {/* Back Side */}
                <View style={styles.back}>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 28,
                      padding: 20,
                      width: Dimensions.get("screen").width * 0.78,
                      textAlign: "center",
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("screen").width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
  },
  face: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,

    backgroundColor: Colors.WHITE,
  },
  back: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,

    backgroundColor: Colors.PRIMARY,
  },
});
