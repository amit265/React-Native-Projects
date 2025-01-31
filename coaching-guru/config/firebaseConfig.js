// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfHkTSg9egcvVPRVgX7mYhabU-zNIpcFc",
  authDomain: "project-2025-de91f.firebaseapp.com",
  projectId: "project-2025-de91f",
  storageBucket: "project-2025-de91f.firebasestorage.app",
  messagingSenderId: "774567410692",
  appId: "1:774567410692:web:61ace1c12b6d27583dc951",
  measurementId: "G-10DGTBBZWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);
