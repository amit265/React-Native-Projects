import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const Feedback = () => {
    const feedback = useSelector((store: { ui: { feedback: string } }) => store.ui.feedback);
    console.log("feedback", feedback);

    if (!feedback) return null; // Return nothing if there is no feedback

    return (
        <View className="p-4">
            <Text className="text-base text-green-600 font-semibold">{String(feedback)}</Text>
        </View>
    );
};

export default Feedback;
