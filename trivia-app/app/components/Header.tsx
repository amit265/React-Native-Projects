import React from 'react';
import { View, Text, Image } from 'react-native';

const Header = () => {
    // Default user details
    const user = {
        image_url: require("../../assets/images/quiz/avatar.png"), // Placeholder image URL
        name: 'John Doe',
    };

    const userScore = 100; // Example total score

    return (
        <View className="w-full rounded-lg shadow-md">
            <View className="flex flex-row justify-between items-center p-4">
                {/* User Info Section */}
                <View className="flex flex-row items-center">

                    <Image source={user.image_url} className="w-12 h-12 rounded-full"
                        resizeMode="cover" />

                    <Text className="text-white text-2xl font-bold ml-2">
                        Hi{user ? `, ${user.name.split(' ')[0]}` : ''}!
                    </Text>
                </View>

                {/* User Score */}
                <Text className="text-white text-lg">Total Score: {userScore}</Text>
            </View>
        </View>
    );
};

export default Header;
