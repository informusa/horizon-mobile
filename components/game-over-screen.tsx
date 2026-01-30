/**
 * Game Over Screen
 */

import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRetry: () => void;
  onMainMenu: () => void;
}

export function GameOverScreen({ score, highScore, onRetry, onMainMenu }: GameOverScreenProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const isNewHighScore = score > highScore;

  return (
    <View style={styles.container}>
      {/* Game Over message */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>GAME OVER</Text>
        {isNewHighScore && <Text style={styles.newHighScore}>NEW HIGH SCORE!</Text>}
      </View>

      {/* Score */}
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Your Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>High Score</Text>
          <Text style={[styles.scoreValue, styles.highScoreValue]}>{isNewHighScore ? score : highScore}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.menuContainer}>
        <Pressable
          onPress={() => {
            triggerHaptic();
            onRetry();
          }}
          style={({ pressed }) => [styles.button, styles.primaryButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.primaryButtonText}>RETRY</Text>
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
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#F87171",
    letterSpacing: 2,
    textAlign: "center",
  },
  newHighScore: {
    fontSize: 20,
    color: "#FBBF24",
    marginTop: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 50,
  },
  scoreBox: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#16213E",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#94A3B8",
    minWidth: 140,
  },
  scoreLabel: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#EAEAEA",
  },
  highScoreValue: {
    color: "#FBBF24",
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
    backgroundColor: "#FF6B35",
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
