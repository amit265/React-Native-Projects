import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { userDetailsContext } from "../../context/userDetailsContext";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { userDetails, setUserDetails } = useContext(userDetailsContext);

  const onSignInClick = async () => {
    setLoading(true);
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      const user = resp.user;

      // ✅ Pass user's email to getUserDetails
      await getUserDetails(user.email);
      router.replace("/(tabs)/home");
    } catch (e) {
      setLoading(false);

      console.log("Login error:", e);
      ToastAndroid.show("Incorrect email or password", ToastAndroid.BOTTOM);
    }

    setLoading(false);
  };

  const getUserDetails = async (userEmail) => {
    try {
      if (!userEmail) {
        console.log("Email is undefined");
        return;
      }

      const docRef = doc(db, "triviaUsers", userEmail);
      const result = await getDoc(docRef);
      setUserDetails(result.data());
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  return (
    <View style={{ padding: 25, marginTop: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed</Text>

      <View style={{ marginTop: 25 }}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={{ marginTop: 25 }}>{error && <Text>{error}</Text>}</View>
      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={onSignInClick}
      >
        {!loading ? (
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 17,
              color: "white",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        ) : (
          <ActivityIndicator size={"large"} color={"white"} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("auth/signUp")}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 17,
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  subText: {
    fontSize: 30,
    fontFamily: "outfit-bold",
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
