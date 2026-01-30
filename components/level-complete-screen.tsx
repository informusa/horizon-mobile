/**
 * Level Complete Screen
 */

import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";

interface LevelCompleteScreenProps {
  score: number;
  level: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onMainMenu: () => void;
}

export function LevelCompleteScreen({ score, level, onNextLevel, onReplay, onMainMenu }: LevelCompleteScreenProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const stars = Math.min(3, Math.floor(score / 1000) + 1);

  return (
    <View style={styles.container}>
      {/* Victory message */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>LEVEL COMPLETE!</Text>
        <Text style={styles.subtitle}>Level {level}</Text>
      </View>

      {/* Stars */}
      <View style={styles.starsContainer}>
        {[1, 2, 3].map((star) => (
          <Text key={star} style={[styles.star, star <= stars && styles.starActive]}>
            ★
          </Text>
        ))}
      </View>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.menuContainer}>
        <Pressable
          onPress={() => {
            triggerHaptic();
            onNextLevel();
          }}
          style={({ pressed }) => [styles.button, styles.primaryButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.primaryButtonText}>NEXT LEVEL</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            triggerHaptic();
            onReplay();
          }}
          style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.secondaryButtonText}>REPLAY</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            triggerHaptic();
            onMainMenu();
          }}
          style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.secondaryButtonText}>MAIN MENU</Text>
        </Pressable>
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
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#4ADE80",
    letterSpacing: 2,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#94A3B8",
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 40,
  },
  star: {
    fontSize: 48,
    color: "#334155",
  },
  starActive: {
    color: "#FBBF24",
    textShadowColor: "#FF6B35",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  scoreContainer: {
    marginBottom: 50,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#16213E",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4ADE80",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#94A3B8",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#EAEAEA",
  },
  menuContainer: {
    width: "100%",
    maxWidth: 300,
    gap: 14,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#4ADE80",
    borderWidth: 3,
    borderColor: "#EAEAEA",
  },
  secondaryButton: {
    backgroundColor: "#16213E",
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A2E",
    letterSpacing: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EAEAEA",
    letterSpacing: 1,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
