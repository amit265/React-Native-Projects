import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; // Add isSupported here
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5eF-t57cvShie5Vljvv7JPmzpVmQvUjY",
  authDomain: "trivia-app-c6c59.firebaseapp.com",
  projectId: "trivia-app-c6c59",
  storageBucket: "trivia-app-c6c59.firebasestorage.app",
  messagingSenderId: "673643559487",
  appId: "1:673643559487:web:2aca6a8537e9248538d68a",
  measurementId: "G-ZQN75DEGZR",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Platform-specific persistence
if (Platform.OS === "web") {
  // For web, use browserLocalPersistence
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
  // For React Native, use getReactNativePersistence with AsyncStorage

  setPersistence(auth, getReactNativePersistence(ReactNativeAsyncStorage))
    .then(() => {
      console.log("Persistence set for React Native!");
    })
    .catch((error) => {
      console.log("Error setting persistence for React Native:", error);
    });
}

export const db = getFirestore(app);
