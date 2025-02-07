import { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  const [segments, setSegments] = useState([Yes, No]);
  const [segmentsFrequency, setSegmentsFrequency] = useState("5");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSegments = await AsyncStorage.getItem("segments");
  
    if (savedSegments) setSegments(JSON.parse(savedSegments));

    const savedSegmentsFrequency = await AsyncStorage.getItem("segmentsFrequency");
    if(savedSegmentsFrequency) setSegmentsFrequency(savedSegmentsFrequency);
    };

  const updateSegment = (index, field, value) => {
    const updatedSegments = [...segments];
    updatedSegments[index][field] = value;
    setSegments(updatedSegments);
  };

  const addSegment = () => {
    setSegments([...segments, { name: `Option ${segments.length + 1}`, frequency: 1 }]);
  };

  const removeSegment = (index) => {
    const updatedSegments = segments.filter((_, i) => i !== index);
    setSegments(updatedSegments);
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem("segments", JSON.stringify(segments));
    await AsyncStorage.setItem("spinDuration", spinDuration);
    await AsyncStorage.setItem("spinFrequency", spinFrequency);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin Wheel Settings</Text>

      <Text style={styles.label}>Spin Duration (ms):</Text>
      <TextInput value={spinDuration} onChangeText={setSpinDuration} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Spin Frequency (times):</Text>
      <TextInput value={spinFrequency} onChangeText={setSpinFrequency} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Edit Segments:</Text>
      <FlatList
        data={segments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.segmentRow}>
            <TextInput
              value={item.name}
              onChangeText={(text) => updateSegment(index, "name", text)}
              style={styles.segmentInput}
            />
            <TextInput
              value={String(item.frequency)}
              onChangeText={(text) => updateSegment(index, "frequency", text.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              style={styles.freqInput}
            />
            <TouchableOpacity onPress={() => removeSegment(index)} style={styles.removeButton}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={addSegment} style={styles.addButton}>
        <Text style={styles.addText}>+ Add Segment</Text>
      </TouchableOpacity>

      <Button title="Save & Apply" onPress={saveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 5, marginVertical: 5 },
  segmentRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  segmentInput: { flex: 2, borderWidth: 1, padding: 5 },
  freqInput: { flex: 1, borderWidth: 1, padding: 5, marginLeft: 5 },
  removeButton: { marginLeft: 5, backgroundColor: "red", padding: 5, borderRadius: 5 },
  removeText: { color: "white", fontWeight: "bold" },
  addButton: { marginTop: 10, padding: 10, backgroundColor: "#2E86C1", borderRadius: 5, alignItems: "center" },
  addText: { color: "white", fontWeight: "bold" },
});
