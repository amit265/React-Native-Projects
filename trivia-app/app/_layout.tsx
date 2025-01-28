import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Provider } from 'react-redux';
import appStore from './store/appStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    HomemadeApple: require('../assets/fonts/HomemadeApple-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {

    return null;
  }





  return (
    <Provider store={appStore}>
    {/* Use the correct theme based on the color scheme */}
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Configure screens using `expo-router`'s Stack */}
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Hide the header for the home screen
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* Configure status bar style */}
      
      <StatusBar style="auto" />
    </ThemeProvider>
  </Provider>

  );
}
