import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { Component } from 'react';

export class Categories extends Component {
    render() {
        const category = [
            { icon: require("../../assets/images/quiz/science.png"), name: "Science" },
            { icon: require("../../assets/images/quiz/history.png"), name: "History" },
            { icon: require("../../assets/images/quiz/geography.png"), name: "Geography" },
            { icon: require("../../assets/images/quiz/art.png"), name: "Art" },
            { icon: require("../../assets/images/quiz/sports.png"), name: "Sports" },
            { icon: require("../../assets/images/quiz/science.png"), name: "Science" },
            { icon: require("../../assets/images/quiz/history.png"), name: "History" },
            { icon: require("../../assets/images/quiz/geography.png"), name: "Geography" },
            { icon: require("../../assets/images/quiz/art.png"), name: "Art" },
            { icon: require("../../assets/images/quiz/sports.png"), name: "Sports" },
            { icon: require("../../assets/images/quiz/science.png"), name: "Science" },
            { icon: require("../../assets/images/quiz/history.png"), name: "History" },
            { icon: require("../../assets/images/quiz/geography.png"), name: "Geography" },
            { icon: require("../../assets/images/quiz/art.png"), name: "Art" },
            { icon: require("../../assets/images/quiz/sports.png"), name: "Sports" },
        ];

        return (
            <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-4 mx-auto">Select a Category</Text>
                <FlatList
                    data={category}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 10 }} // Padding for the content inside FlatList
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.name + Date.now()} // Unique key for each item
                            className="bg-white rounded-xl m-2 p-4 w-full items-center justify-center"
                            onPress={() => console.log(`Selected category: ${item.name}`)}
                            style={{ flex: 1, alignItems: 'center', width: '48%' }} // Ensures each item takes up about half of the width
                        >
                            <Image source={item.icon} style={{ width: 40, height: 40 }} />
                            <Text className="text-xl text-center mt-2">{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

export default Categories;
