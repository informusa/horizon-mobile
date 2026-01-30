/**
 * Home Screen - Main menu
 */

import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";

interface HomeScreenProps {
  onPlay: () => void;
  onHighScores: () => void;
  onSettings: () => void;
  currentLevel: number;
}

export function HomeScreen({ onPlay, onHighScores, onSettings, currentLevel }: HomeScreenProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>RUMBLE</Text>
        <Text style={styles.subtitle}>Battle to the Top</Text>
      </View>

      {/* Level indicator */}
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level {currentLevel + 1}</Text>
      </View>

      {/* Menu buttons */}
      <View style={styles.menuContainer}>
        <Pressable
          onPress={() => {
            triggerHaptic();
            onPlay();
          }}
          style={({ pressed }) => [styles.button, styles.playButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>PLAY</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            triggerHaptic();
            onHighScores();
          }}
          style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.secondaryButtonText}>HIGH SCORES</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            triggerHaptic();
            onSettings();
          }}
          style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.secondaryButtonText}>SETTINGS</Text>
        </Pressable>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>Climb to the top and avoid the barrels!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FF6B35",
    letterSpacing: 4,
    textShadowColor: "#4ADE80",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#94A3B8",
    marginTop: 10,
    letterSpacing: 2,
  },
  levelContainer: {
    marginBottom: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#16213E",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EAEAEA",
  },
  menuContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    backgroundColor: "#FF6B35",
    borderWidth: 3,
    borderColor: "#EAEAEA",
  },
  secondaryButton: {
    backgroundColor: "#16213E",
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A2E",
    letterSpacing: 2,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EAEAEA",
    letterSpacing: 1,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  instructionsContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  instructionsText: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 20,
  },
});
