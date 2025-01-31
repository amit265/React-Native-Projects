import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { userDetailsContext } from "../../context/userDetailsContext";
export default function SignUp() {
  const router = useRouter();
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const user = resp.user;

      console.log("User created:", user);

      // ✅ Pass the user object to saveUser
      await saveUser(user);
      console.log("User saved to Firestore");
    } catch (e) {
      console.log("Error creating user:", e.message);
    }
  };
  const saveUser = async (user) => {
    if (!user) {
      console.log("No user found!");
      return;
    }
    const data = {
      name: username,
      email: user.email,
      member: false,
      uid: user.uid,
    };

    try {
      await setDoc(doc(db, "users", user.email), data);
      setUserDetails(data);
      console.log("User data saved successfully!");
    } catch (e) {
      console.log("Error saving user:", e.message);
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 180, height: 180 }}
        />
      </View>
      <Text style={styles.textHeader}>Create New Account</Text>

      <View style={{ marginTop: 25 }}>
        <TextInput
          placeholder="Full name"
          style={styles.textInput}
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text
          style={{
            fontSize: 17,
            color: "white",
            textAlign: "center",
            fontFamily: "outfit",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("auth/signIn")}
      >
        <Text
          style={{
            fontSize: 17,
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit",
          }}
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
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 30,
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
