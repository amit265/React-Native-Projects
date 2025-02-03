import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import { userDetailsContext } from "../../context/userDetailsContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function SubscriptionWall() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const [loading, setLoading] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [userInput, setUserInput] = useState("");
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);
  const correctAnswer = "hello"; // Set your verification code here

  useEffect(() => {
    if (userDetails?.member == true) {
      router.replace("/");
    }
  }, [userDetails]);

  // Function to show a custom modal before subscription
  const handleSubscribe = () => {
    setConfirmationModalVisible(true); // Open the subscription confirmation modal
  };

  // Function to verify input and upgrade user
  const getPremium = async () => {
    if (userInput !== correctAnswer) {
      alert("Incorrect, The input you provided is incorrect.");
      return;
    }

    setLoading(true);
    try {
      if (!userDetails) {
        alert("Error, No user is signed in.");
        return;
      }

      const userRef = doc(db, "users", userDetails?.email);
      await updateDoc(userRef, {
        member: true,
      });

      alert("Now, you are a premium member, keep learning and growing.");
      setPremiumModalVisible(false);
      setUserInput(""); // Clear input
      setUserDetails({ ...userDetails, member: true }); // Update local state
      router.replace("/");
    } catch (error) {
      alert("Error, Failed to upgrade membership.");
      console.error(error);
    }
    setLoading(false);
  };

  const plans = [
    {
      id: "monthly",
      title: "Full Access Monthly",
      price: "$10/month",
      description: "Billed every month. Cancel anytime.",
    },
    {
      id: "yearly",
      title: "Full Access Annually",
      price: "$100/year",
      description: "Save 20%! Billed annually.",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/wave.png")}
        style={{ position: "absolute", width: "100%", height: 800 }}
      />
      <View style={{ flex: 1, padding: 20, marginTop: 100 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.title}>Features of Full Access Plan</Text>
          <Text style={styles.feature}>✅ Generate unlimited AI courses</Text>
          <Text style={styles.feature}>✅ Track your progress</Text>
          <Text style={styles.feature}>✅ Access premium materials</Text>
          <Text style={styles.feature}>✅ Save and store courses</Text>
          <Text style={styles.feature}>
            ✅ Explore and interact with the community
          </Text>
        </View>

        {/* Subscription Plan Options */}
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            onPress={() => setSelectedPlan(plan.id)}
            style={[
              styles.planContainer,
              {
                backgroundColor:
                  selectedPlan === plan.id ? Colors.PRIMARY : Colors.WHITE,
              },
            ]}
          >
            <Text
              style={[
                styles.planTitle,
                {
                  color: selectedPlan === plan.id ? Colors.WHITE : Colors.BLACK,
                },
              ]}
            >
              {plan.title}
            </Text>
            <Text
              style={[
                styles.planPrice,
                {
                  color: selectedPlan === plan.id ? Colors.WHITE : Colors.GRAY,
                },
              ]}
            >
              {plan.price}
            </Text>
            <Text
              style={[
                styles.planDescription,
                {
                  color: selectedPlan === plan.id ? Colors.WHITE : Colors.GRAY,
                },
              ]}
            >
              {plan.description}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Subscribe Button */}
        <TouchableOpacity
          onPress={handleSubscribe}
          style={styles.subscribeButton}
        >
          <Text style={styles.subscribeText}>
            {loading ? "Processing..." : "Subscribe Now"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Subscription Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you want to upgrade to premium?
            </Text>
            <TouchableOpacity
              onPress={() => {
                setConfirmationModalVisible(false); // Close the confirmation modal
                setPremiumModalVisible(true); // Show the secret code modal
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConfirmationModalVisible(false)} // Close the confirmation modal
              style={[styles.modalButton, { backgroundColor: "red" }]}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Secret Code Input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={premiumModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>say, hello</Text>
            <TextInput
              style={styles.input}
              placeholder="hello"
              value={userInput}
              onChangeText={setUserInput}
            />
            <TouchableOpacity onPress={getPremium} style={styles.modalButton}>
              {loading ? (
                <ActivityIndicator size={"large"} color={Colors.WHITE} />
              ) : (
                <Text style={styles.modalButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPremiumModalVisible(false)}
              style={[styles.modalButton, { backgroundColor: "red" }]}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginBottom: 20,
    color: Colors.WHITE,
  },
  feature: {
    fontSize: 16,
    fontFamily: "outfit",
    marginBottom: 10,
    color: Colors.WHITE,
  },
  planContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  planPrice: {
    fontSize: 16,
    fontFamily: "outfit",
  },
  planDescription: {
    fontSize: 14,
    fontFamily: "outfit",
  },
  subscribeButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 60,
    elevation: 3,
  },
  subscribeText: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});
