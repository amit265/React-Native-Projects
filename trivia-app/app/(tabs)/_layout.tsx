import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { Colors } from '../constants/Colors';

export default function TabLayout() {
  const showLeaderboard = false;  // Set to `true` to show the leaderboard tab

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            borderTopColor: 'transparent',
          },
        }),
      }}>
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          headerShown: false, // Hides the header
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/quiz/magic.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : '#888', // Optional: Change color when focused
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Category',
          headerShown: false, // Hides the header
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/quiz/single_user.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? color : '#888', // Optional: Change color when focused
              }}
              resizeMode="contain"
            />
          ),
        }}
      />


    </Tabs>
  );
}
