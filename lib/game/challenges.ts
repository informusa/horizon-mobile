/**
 * Daily challenges system
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DailyChallenge } from "./types";

const CHALLENGES_KEY = "@rumble_daily_challenges";

const CHALLENGE_TEMPLATES = [
  {
    id: "no_powerups",
    title: "Pure Skill",
    description: "Complete Level 1 without collecting any power-ups",
    objective: "no_powerups" as const,
    targetValue: 1,
    reward: 500,
  },
  {
    id: "speed_run",
    title: "Speed Demon",
    description: "Complete Level 1 in under 60 seconds",
    objective: "speed_run" as const,
    targetValue: 60000, // 60 seconds in milliseconds
    reward: 750,
  },
  {
    id: "no_damage",
    title: "Untouchable",
    description: "Complete Level 1 without losing any lives",
    objective: "no_damage" as const,
    targetValue: 3, // Must finish with 3 lives
    reward: 600,
  },
  {
    id: "collect_all",
    title: "Collector",
    description: "Collect 5 power-ups in a single game",
    objective: "collect_all" as const,
    targetValue: 5,
    reward: 400,
  },
];

export async function getDailyChallenges(): Promise<DailyChallenge[]> {
  try {
    const stored = await AsyncStorage.getItem(CHALLENGES_KEY);
    if (stored) {
      const challenges: DailyChallenge[] = JSON.parse(stored);
      // Check if challenges are from today
      const today = new Date().toDateString();
      if (challenges.length > 0 && challenges[0].date === today) {
        return challenges;
      }
    }
  } catch (error) {
    console.error("Error loading challenges:", error);
  }

  // Generate new daily challenges
  return generateDailyChallenges();
}

function generateDailyChallenges(): DailyChallenge[] {
  const today = new Date().toDateString();
  
  // Select 3 random challenges
  const shuffled = [...CHALLENGE_TEMPLATES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  const challenges: DailyChallenge[] = selected.map((template) => ({
    ...template,
    id: `${template.id}_${Date.now()}`,
    completed: false,
    date: today,
  }));

  saveChallenges(challenges);
  return challenges;
}

export async function saveChallenges(challenges: DailyChallenge[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CHALLENGES_KEY, JSON.stringify(challenges));
  } catch (error) {
    console.error("Error saving challenges:", error);
  }
}

export async function completeChallenge(challengeId: string): Promise<number> {
  const challenges = await getDailyChallenges();
  const challenge = challenges.find((c) => c.id === challengeId);
  
  if (challenge && !challenge.completed) {
    challenge.completed = true;
    await saveChallenges(challenges);
    return challenge.reward;
  }
  
  return 0;
}

export function checkChallengeProgress(
  challenge: DailyChallenge,
  gameData: {
    level: number;
    powerUpsCollected: number;
    livesRemaining: number;
    timeElapsed: number;
  }
): boolean {
  if (challenge.completed) return false;

  switch (challenge.objective) {
    case "no_powerups":
      return gameData.level >= 1 && gameData.powerUpsCollected === 0;
    case "speed_run":
      return gameData.level >= 1 && gameData.timeElapsed < challenge.targetValue;
    case "no_damage":
      return gameData.level >= 1 && gameData.livesRemaining === challenge.targetValue;
    case "collect_all":
      return gameData.powerUpsCollected >= challenge.targetValue;
    default:
      return false;
  }
}
