import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpinWheel from "../components/SpinWheel";
import React from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [segments, setSegments] = useState([
    { name: "Yes", frequency: 1 },
    { name: "No", frequency: 1 },
    { name: "Maybe", frequency: 1 },
    { name: "Try Again", frequency: 1 },
  ]);
  const [spinDuration, setSpinDuration] = useState(4000);
  const [spinFrequency, setSpinFrequency] = useState(5);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSegments = await AsyncStorage.getItem("segments");
    const savedSpinDuration = await AsyncStorage.getItem("spinDuration");
    const savedSpinFrequency = await AsyncStorage.getItem("spinFrequency");

    if (savedSegments) setSegments(JSON.parse(savedSegments));
    if (savedSpinDuration) setSpinDuration(parseInt(savedSpinDuration));
    if (savedSpinFrequency) setSpinFrequency(parseInt(savedSpinFrequency));
  };

  return (
    <View style={styles.container}>
      
      <SpinWheel segments={segments} spinDuration={spinDuration} spinFrequency={spinFrequency} setWinner={setWinner} />
     
      {winner ? <Text style={styles.winnerText}>Winner: {winner}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8F8F8" },
  button: { marginTop: 20, backgroundColor: "#2E86C1", padding: 15, borderRadius: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  winnerText: { fontSize: 20, fontWeight: "bold", marginTop: 20, color: "#333" },
});
