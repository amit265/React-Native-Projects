import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import Entypo from "@expo/vector-icons/Entypo";
export default function SpinWheel() {
  const [segments, setSegments] = useState([
    "Yes",
    "No",
    "Maybe",
    "Try Again",
    "Lucky!",
  ]);
  const [inputText, setInputText] = useState("");
  const spinValue = useRef(new Animated.Value(0)).current;
  const [winner, setWinner] = useState("");
  const [winningIndex, setWinningIndex] = useState(null);
  const glowAnim = useRef(new Animated.Value(0)).current;
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
  ];
  const numberOfSegments = segments.length;
  const segmentAngle = 360 / numberOfSegments;
  console.log(segmentAngle, numberOfSegments);
  //   Math.floor(Math.random() * 360);
  const spinWheel = () => {
    setWinningIndex(null); // Remove highlight before spinning
    setWinner("");
    const randomSpins = 15 * 360; // 5 full spins
    let landingAngle = Math.floor(Math.random() * 360); // Random stopping angle

    const bufferAngle = 5; // Avoids landing on segment boundaries

    // Ensure landing angle does NOT fall on a boundary
    for (let i = 0; i < numberOfSegments; i++) {
      let boundary = i * segmentAngle;
      if (Math.abs(landingAngle - boundary) < bufferAngle) {
        landingAngle += bufferAngle; // Shift slightly inward
        break;
      }
    }

    const finalAngle = randomSpins + landingAngle;

    // Reset spin value before starting a new spin
    spinValue.setValue(0);

    Animated.timing(spinValue, {
      toValue: finalAngle,
      duration: 8000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      // Normalize angle within 0-360 degrees
      let normalizedAngle = finalAngle % 360;

      // Adjust for downward arrow (pointing at 270°)
      let adjustedAngle = (360 - normalizedAngle + 270) % 360;

      // Determine the correct segment index
      let index = Math.floor(adjustedAngle / segmentAngle);

      // Ensure index stays within bounds
      if (index >= numberOfSegments) index = 0;

      let finalWinner = segments[index];

      console.log(
        "Landing Angle:",
        landingAngle,
        "Normalized Angle:",
        normalizedAngle,
        "Adjusted Angle:",
        adjustedAngle,
        "Index:",
        index,
        "Final Winner:",
        finalWinner
      );

      setWinner(finalWinner);
      setWinningIndex(index); // Highlight the winning section
      // Start glow animation
      glowAnim.setValue(0);
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 1000, // Glow duration
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        // Fade out after 3 seconds
        setTimeout(() => {
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(() => setWinningIndex(null));
        }, 2000);
      });
    });
  };

  const addSegment = () => {
    if (inputText.trim() !== "") {
      setSegments([...segments, inputText.trim()]);
      setInputText("");
    }
  };

  const spinInterpolation = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Fixed Arrow Pointer */}

      {/* Wheel */}
      <View style={styles.wheelContainer}>
        <Fontisto
          name="arrow-up-l"
          size={20}
          color="blue"
          style={styles.pointerContainer}
        />
        <Animated.View
          style={[styles.wheel, { transform: [{ rotate: spinInterpolation }] }]}
        >
          <Svg height="300" width="300" viewBox="0 0 300 300">
            <G>
              {segments.map((label, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                const x1 = 150 + 120 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 150 + 120 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 150 + 120 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 150 + 120 * Math.sin((endAngle * Math.PI) / 180);

                const textAngle = (startAngle + endAngle) / 2;
                const textX = 150 + 80 * Math.cos((textAngle * Math.PI) / 180);
                const textY = 150 + 80 * Math.sin((textAngle * Math.PI) / 180);

                // Animated glow values
                const glowWidth = glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [2, 8], // Stroke width change
                });

                const glowOpacity = glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1], // Opacity change
                });

                return (
                  <G key={index}>
                    <Path
                      d={`M150,150 L${x1},${y1} A120,120 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={
                        winningIndex === index
                          ? "#00FF00"
                          : segColors[index % segColors.length]
                      }
                      stroke={winningIndex === index ? "red" : "black"}
                      strokeWidth={winningIndex === index ? 5 : 2} // Thicker border when highlighted
                      opacity={winningIndex === index ? 1 : 0.8} // Glow effect
                    />
                    <SvgText
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      transform={`rotate(${
                        textAngle + 90
                      }, ${textX}, ${textY})`}
                    >
                      {label}
                    </SvgText>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>

      {/* Input for Adding Segments */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter option..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={addSegment} style={styles.addButton}>
          <Text style={styles.addButtonText}>➕ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Spin Button */}
      <TouchableOpacity onPress={spinWheel} style={styles.button}>
        <Text style={styles.buttonText}>🎯 Spin the Wheel</Text>
      </TouchableOpacity>

      {/* Display Winner */}
      {winner ? (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>Winner: {winner}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  pointerContainer: {
    position: "absolute",
    zIndex: 10,
    paddingBottom: 20,
  },
  wheelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  wheel: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#34A24F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2E86C1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  winnerContainer: {
    position: "absolute",
    top: 50, // Adjust to position the winner text above the arrow
    zIndex: 20, // Ensure it is above the arrow
  },
  winnerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});
