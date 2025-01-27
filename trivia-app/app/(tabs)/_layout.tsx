import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/quiz/home.png')}
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
        name="profile"
        options={{
          title: 'Profile',
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
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/quiz/leaderboard.png')}
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
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('../../assets/images/quiz/setting.png')}
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
