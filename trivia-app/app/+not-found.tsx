import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! wrong address' }} />
      <View>
        <Text>The page you're trying to access doesn't exist.</Text>
        <Button
          title="Go to Home"
          onPress={() => router.push('/')} // This will navigate to the home screen
        />

        <Text className='text-white font-bold text-2xl p-4 text-center'>Go to home screen</Text>
        <Link className='text-blue-100 font-bold text-xl text-center' href="/">Go to Home</Link>

    </View >
    </>
  );
}
