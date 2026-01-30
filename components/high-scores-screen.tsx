/**
 * High Scores Screen
 */

import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import type { HighScore } from "@/lib/game/types";

interface HighScoresScreenProps {
  highScores: HighScore[];
  onBack: () => void;
}

export function HighScoresScreen({ highScores, onBack }: HighScoresScreenProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>HIGH SCORES</Text>
      </View>

      {/* Scores list */}
      <ScrollView style={styles.scoresContainer} contentContainerStyle={styles.scoresContent}>
        {highScores.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No high scores yet!</Text>
            <Text style={styles.emptySubtext}>Play the game to set your first record.</Text>
          </View>
        ) : (
          highScores.map((score, index) => (
            <View key={`${score.date}-${index}`} style={styles.scoreRow}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreName}>{score.name}</Text>
                <Text style={styles.scoreDetails}>
                  Level {score.level} • {new Date(score.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.scoreValueContainer}>
                <Text style={styles.scoreValue}>{score.score}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Back button */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            triggerHaptic();
            onBack();
          }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FF6B35",
    letterSpacing: 2,
  },
  scoresContainer: {
    flex: 1,
    marginBottom: 20,
  },
  scoresContent: {
    gap: 12,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    color: "#94A3B8",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#687076",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#16213E",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#94A3B8",
    gap: 15,
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FBBF24",
  },
  scoreInfo: {
    flex: 1,
  },
  scoreName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EAEAEA",
    marginBottom: 4,
  },
  scoreDetails: {
    fontSize: 12,
    color: "#94A3B8",
  },
  scoreValueContainer: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#1A1A2E",
    borderRadius: 10,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4ADE80",
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16213E",
    borderWidth: 2,
    borderColor: "#94A3B8",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#EAEAEA",
    letterSpacing: 1,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});
