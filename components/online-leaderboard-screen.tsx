/**
 * Online Leaderboard Screen - Global high scores
 */

import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Platform, ActivityIndicator } from "react-native";
import * as Haptics from "expo-haptics";
import { trpc } from "@/lib/trpc";

interface OnlineLeaderboardScreenProps {
  onBack: () => void;
}

export function OnlineLeaderboardScreen({ onBack }: OnlineLeaderboardScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: leaderboardData, isLoading, refetch } = trpc.leaderboard.getTop.useQuery({ limit: 100 });

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GLOBAL LEADERBOARD</Text>
        <Text style={styles.subtitle}>Top players worldwide</Text>
      </View>

      {/* Leaderboard list */}
      <ScrollView style={styles.scoresContainer} contentContainerStyle={styles.scoresContent}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <Text style={styles.loadingText}>Loading leaderboard...</Text>
          </View>
        ) : !leaderboardData || leaderboardData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No scores yet!</Text>
            <Text style={styles.emptySubtext}>Be the first to set a record.</Text>
          </View>
        ) : (
          leaderboardData.map((entry, index) => (
            <View
              key={entry.id}
              style={[
                styles.scoreRow,
                index === 0 && styles.firstPlace,
                index === 1 && styles.secondPlace,
                index === 2 && styles.thirdPlace,
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={[styles.rankText, index < 3 && styles.topRankText]}>
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                </Text>
              </View>
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreName}>{entry.playerName}</Text>
                <Text style={styles.scoreDetails}>
                  Level {entry.level} • {new Date(entry.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.scoreValueContainer}>
                <Text style={styles.scoreValue}>{entry.score.toLocaleString()}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            triggerHaptic();
            handleRefresh();
          }}
          style={({ pressed }) => [styles.refreshButton, pressed && styles.buttonPressed]}
          disabled={refreshing}
        >
          <Text style={styles.buttonText}>{refreshing ? "REFRESHING..." : "REFRESH"}</Text>
        </Pressable>

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
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B35",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
  },
  scoresContainer: {
    flex: 1,
    marginBottom: 20,
  },
  scoresContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#94A3B8",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E2E8F0",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94A3B8",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16213E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  firstPlace: {
    borderColor: "#FFD700",
    backgroundColor: "#2A2416",
  },
  secondPlace: {
    borderColor: "#C0C0C0",
    backgroundColor: "#1F2428",
  },
  thirdPlace: {
    borderColor: "#CD7F32",
    backgroundColor: "#241F1A",
  },
  rankContainer: {
    width: 50,
    alignItems: "center",
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#94A3B8",
  },
  topRankText: {
    fontSize: 24,
  },
  scoreInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scoreName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E2E8F0",
    marginBottom: 4,
  },
  scoreDetails: {
    fontSize: 12,
    color: "#94A3B8",
  },
  scoreValueContainer: {
    marginLeft: 12,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4ADE80",
  },
  buttonContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#0F3460",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  refreshButton: {
    backgroundColor: "#4ADE80",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#22C55E",
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#EAEAEA",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
