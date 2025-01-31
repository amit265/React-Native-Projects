import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Colors from "../../Constant/Colors";
import { TypeList, WhenToTake } from "../../Constant/Options";
import { Picker } from "@react-native-picker/picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  formatDate,
  formatDateForText,
  formatTime,
} from "../services/formatDate";
import { router, useRouter } from "expo-router";
export default function AddMedicationForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMedication = () => {
    const docId = Date.now().toString();
    setLoading(true);
    if (
      !(
        formData?.name ||
        formData?.type ||
        formData?.dose ||
        formData?.startDate ||
        formData?.endDate ||
        formData?.reminder
      )
    ) {
      alert("Enter all fields");
      return;
    }

    try {
      //ssend data to database
      console.log("formData before saving", formData);
      console.log("Form saved");
      setLoading(false);
      console.log(router);
      console.log("Navigating to tabs...");

      Alert.alert("New medication added successfully", [
        {
          text: "Okay",
          onPress: () => {
            console.log("Redirecting to tabs...");
            router.push("/(tabs)");
          },
        },
      ]);
      console.log("Navigating to tabs later...");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.inputGroup}>
        <FontAwesome5
          name="briefcase-medical"
          size={24}
          color="black"
          style={styles.icon}
        />

        <TextInput
          placeholder="Medicine Name"
          style={styles.textInput}
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      {/* Type List */}
      <FlatList
        data={TypeList}
        horizontal
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputGroup}>
        <FontAwesome6
          name="eye-dropper"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="Dose Ex. 2, 5ml"
          style={styles.textInput}
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* When to take drop down */}

      <View style={styles.inputGroup}>
        <Feather name="clock" size={24} color="black" style={styles.icon} />
        //picker
        <Picker
          selectedValue={formData?.when}
          style={{ width: "90%" }}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start and end date */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <FontAwesome
            name="calendar-plus-o"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
          {showStartDate && (
            <RNDateTimePicker
              minimumDate={new Date()}
              onChange={(event) => {
                onHandleInputChange(
                  "startDate",
                  formatDate(event.nativeEvent.timestamp)
                );
                setShowStartDate(false);
              }}
              value={new Date(formData?.startDate) ?? new Date()}
            ></RNDateTimePicker>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <FontAwesome
            name="calendar-plus-o"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
          {showEndDate && (
            <RNDateTimePicker
              minimumDate={new Date()}
              onChange={(event) => {
                onHandleInputChange(
                  "endDate",
                  formatDate(event.nativeEvent.timestamp)
                );
                setShowEndDate(false);
              }}
              value={new Date(formData?.endDate) ?? new Date()}
            ></RNDateTimePicker>
          )}
        </TouchableOpacity>
      </View>

      {/* set reminder */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <MaterialCommunityIcons
            name="reminder"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
          {showTimePicker && (
            <RNDateTimePicker
              mode="time"
              onChange={(event) => {
                onHandleInputChange(
                  "reminder",
                  formatTime(event.nativeEvent.timestamp)
                );
                setShowTimePicker(false);
              }}
              value={formData?.reminder ?? new Date()}
            />
          )}
          )
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveMedication}>
        {loading && <ActivityIndicator size={"large"} color={"white"} />}
        <Text style={styles.buttonText}>Add New Medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    width: "100%",
  },

  icon: {
    color: Colors.PRIMARY,
    paddingRight: 12,
    borderRightWidth: 1,
    borderColor: Colors.GRAY,
  },

  typeText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },

  text: {
    fontSize: 16,
    padding: 5,
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});
