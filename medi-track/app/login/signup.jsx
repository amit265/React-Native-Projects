import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Constant/Colors";
import { useRouter } from "expo-router";
import { setLocalStorage } from "../services/storage";

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !username) {
      alert("Error, Please fill all the fields.");
      return;
    }

    try {
      const response = await signupUser(username, email, password);

      if (response.status === 201) {
        // Handle successful signup (e.g., navigate to login or profile screen)
        alert("Success", "Account created successfully!");
        await setLocalStorage("userDetail", response?.user);
        router.push("login/signin");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error", "Signup failed. Please try again.");
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Create New Account</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full name"
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={{ fontSize: 17, color: "white", textAlign: "center" }}>
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signin")}
      >
        <Text
          style={{ fontSize: 17, color: Colors.PRIMARY, textAlign: "center" }}
        >
          Already account, Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonCreate: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 35,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
