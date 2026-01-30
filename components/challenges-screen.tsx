/**
 * Daily Challenges Screen
 */

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getDailyChallenges } from "@/lib/game/challenges";
import type { DailyChallenge } from "@/lib/game/types";

interface ChallengesScreenProps {
  onBack: () => void;
}

export function ChallengesScreen({ onBack }: ChallengesScreenProps) {
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    const dailyChallenges = await getDailyChallenges();
    setChallenges(dailyChallenges);
  };

  const getObjectiveIcon = (objective: string) => {
    switch (objective) {
      case "no_powerups":
        return "🎯";
      case "speed_run":
        return "⚡";
      case "no_damage":
        return "🛡️";
      case "collect_all":
        return "💎";
      default:
        return "🏆";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DAILY CHALLENGES</Text>
        <Text style={styles.subtitle}>Complete challenges for bonus rewards!</Text>
      </View>

      <ScrollView style={styles.challengesList} contentContainerStyle={styles.challengesContent}>
        {challenges.map((challenge) => (
          <View
            key={challenge.id}
            style={[
              styles.challengeCard,
              challenge.completed && styles.challengeCardCompleted,
            ]}
          >
            <View style={styles.challengeIcon}>
              <Text style={styles.iconText}>{getObjectiveIcon(challenge.objective)}</Text>
            </View>
            
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
              <Text style={styles.challengeDescription}>{challenge.description}</Text>
              
              <View style={styles.rewardContainer}>
                <Text style={styles.rewardText}>
                  {challenge.completed ? "✓ COMPLETED" : `🏆 ${challenge.reward} pts`}
                </Text>
              </View>
            </View>

            {challenge.completed && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>✓</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Challenges reset daily at midnight</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>BACK TO MENU</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 8,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
  },
  challengesList: {
    flex: 1,
  },
  challengesContent: {
    gap: 16,
  },
  challengeCard: {
    backgroundColor: "#16213E",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B35",
    position: "relative",
  },
  challengeCardCompleted: {
    backgroundColor: "#1E3A20",
    borderColor: "#4ADE80",
    opacity: 0.7,
  },
  challengeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0F3460",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 32,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 8,
  },
  rewardContainer: {
    alignSelf: "flex-start",
  },
  rewardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
  },
  completedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4ADE80",
    justifyContent: "center",
    alignItems: "center",
  },
  completedBadgeText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
  },
  backButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
