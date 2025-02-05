import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Your Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "trivia-app-c6c59.firebaseapp.com",
  projectId: "trivia-app-c6c59",
  storageBucket: "trivia-app-c6c59.firebasestorage.app",
  messagingSenderId: "673643559487",
  appId: "1:673643559487:web:2aca6a8537e9248538d68a",
  measurementId: "G-ZQN75DEGZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth only once
let auth;
if (!global._firebaseAuth) {
  if (Platform.OS === "web") {
    // For web, use browserLocalPersistence
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistence set for web!");
      })
      .catch((error) => {
        console.log("Error setting persistence for web:", error);
      });

    // Check if Analytics is supported in the web environment
    isSupported().then((supported) => {
      if (supported) {
        const analytics = getAnalytics(app);
        console.log("Analytics initialized for web!");
      } else {
        console.log("Firebase Analytics is not supported in this environment.");
      }
    });
  } else {
    // For React Native, use initializeAuth with getReactNativePersistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    console.log("Persistence set for React Native!");
  }

  // Mark auth as initialized
  global._firebaseAuth = auth;
} else {
  auth = global._firebaseAuth;
}

export const db = getFirestore(app);
export { auth };
