import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Userboard = () => {
    // Dummy leaderboard data
    const leaderboard = [
        { rank: 1, name: 'Alice', score: 150 },
        { rank: 2, name: 'Bob', score: 120 },
        { rank: 3, name: 'Charlie', score: 100 },
        { rank: 4, name: 'Dave', score: 80 },
        { rank: 5, name: 'Eve', score: 60 },
        { rank: 6, name: 'Alice', score: 150 },
        { rank: 7, name: 'Bob', score: 120 },
        { rank: 8, name: 'Charlie', score: 100 },
        { rank: 9, name: 'Dave', score: 80 },
        { rank: 10, name: 'Eve', score: 60 },
    ];

    return (
        <View className="flex-1">
            <View className="w-full rounded-lg shadow-md">

                <Text className="text-3xl font-bold text-center text-white p-4">Leaderboard</Text>
            </View>
            {/* Leaderboard List */}
            <View className="space-y-4">
                {leaderboard.map((player) => (
                    <View key={player.rank} className="flex-row items-center justify-between bg-white p-4 my-2 rounded-lg shadow-md">
                        <Text className="text-lg font-semibold text-gray-800">{player.rank}. {player.name}</Text>
                        <Text className="text-xl font-bold text-blue-600">{player.score} pts</Text>
                    </View>
                ))}
            </View>

            {/* Refresh Button */}
            <TouchableOpacity
                className="mt-6 bg-blue-600 p-3 rounded-lg text-white text-center"
                onPress={() => alert('Leaderboard refreshed!')}
            >
                <Text className="text-white font-semibold">Refresh Leaderboard</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Userboard;
