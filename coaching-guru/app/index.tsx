import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { userDetailsContext } from "@/context/userDetailsContext";

export default function Index() {
  const { setUserDetails } = useContext(userDetailsContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay before checking authentication (2 seconds)

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getDoc(doc(db, "users", user?.email));

        if (result.exists()) {
          setUserDetails(result.data());
        } else {
          console.log("No user document found in Firestore");
        }

        router.replace("/(tabs)/home");
      }
      setLoading(false); // Stop loading after checking authentication
    });
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color={Colors.PRIMARY} />
  //       <Text style={styles.loadingText}>Checking authentication...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/landing.png")} style={styles.image} />
      {loading && <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>}

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Coaching Guru</Text>
        <Text style={styles.subtitle}>
          Transform your ideas into engaging educational content, effortlessly with AI
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/signUp")}>
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.WHITE }]}
          onPress={() => router.push("/auth/signIn")}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional overlay
    zIndex: 9999, // Make sure it overlays on top of other components
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 25,
    backgroundColor: Colors.PRIMARY,
    height: "100%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  subtitle: {
    fontSize: 20,
    color: Colors.WHITE,
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
