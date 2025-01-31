import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// You can replace this mock data with an API call to fetch the leaderboard data
const leaderboardData = [
  { rank: 1, name: "Alice", score: 1500 },
  { rank: 2, name: "Bob", score: 1400 },
  { rank: 3, name: "Charlie", score: 1350 },
  { rank: 4, name: "David", score: 1300 },
  { rank: 5, name: "Eve", score: 1250 },
  // Add more entries as needed
];

const LeaderboardScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // You can replace this with an API call
    const fetchLeaderboard = () => {
      setLoading(true);
      setTimeout(() => {
        setData(leaderboardData); // Simulate API response
        setLoading(false);
      }, 2000); // Simulating loading time
    };

    fetchLeaderboard();
  }, []);

  // If data is still loading, show loading spinner
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render each leaderboard item
  const renderItem = ({ item }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <Text className="text-lg font-bold text-gray-800">{item.rank}</Text>
      <Text className="text-lg text-gray-800">{item.name}</Text>
      <Text className="text-lg font-semibold text-gray-800">{item.score}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold text-center mt-5 mb-5">Leaderboard</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank.toString()}
      />
    </View>
  );
};

export default LeaderboardScreen;
