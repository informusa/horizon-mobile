import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";
import { HomeScreen } from "@/components/home-screen";
import { GameScreen } from "@/components/game-screen";
import { LevelCompleteScreen } from "@/components/level-complete-screen";
import { GameOverScreen } from "@/components/game-over-screen";
import { SettingsScreen } from "@/components/settings-screen";
import { HighScoresScreen } from "@/components/high-scores-screen";
import { DEFAULT_SETTINGS, addHighScore } from "@/lib/game/state";
import type { GameSettings, HighScore, GameState } from "@/lib/game/types";

const SETTINGS_KEY = "@horizon_settings";
const HIGH_SCORES_KEY = "@horizon_high_scores";

export default function HomeScreenTab() {
  const [screen, setScreen] = useState<GameState>("menu");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  // Load settings and high scores on mount
  useEffect(() => {
    loadSettings();
    loadHighScores();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const saveSettings = async (newSettings: GameSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const loadHighScores = async () => {
    try {
      const saved = await AsyncStorage.getItem(HIGH_SCORES_KEY);
      if (saved) {
        setHighScores(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load high scores:", error);
    }
  };

  const saveHighScore = async (score: number, level: number) => {
    try {
      const newScore: HighScore = {
        name: "Player",
        score,
        level,
        date: new Date().toISOString(),
      };
      const updated = addHighScore(highScores, newScore);
      await AsyncStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updated));
      setHighScores(updated);
    } catch (error) {
      console.error("Failed to save high score:", error);
    }
  };

  const handlePlay = () => {
    setScreen("playing");
    setCurrentScore(0);
  };

  const handleGameOver = (score: number) => {
    setCurrentScore(score);
    saveHighScore(score, currentLevel + 1);
    setScreen("gameOver");
  };

  const handleLevelComplete = (score: number, level: number) => {
    setCurrentScore(score);
    saveHighScore(score, level);
    setScreen("levelComplete");
  };

  const handleNextLevel = () => {
    setCurrentLevel((prev) => Math.min(prev + 1, 2)); // Max 3 levels (0, 1, 2)
    setScreen("playing");
  };

  const handleReplay = () => {
    setScreen("playing");
  };

  const handleMainMenu = () => {
    setScreen("menu");
    setCurrentLevel(0);
    setCurrentScore(0);
  };

  const handlePause = () => {
    // Pause is handled within GameScreen
  };

  const getHighScore = () => {
    if (highScores.length === 0) return 0;
    return highScores[0].score;
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]}>
      <View style={styles.container}>
        {screen === "menu" && (
          <HomeScreen
            onPlay={handlePlay}
            onHighScores={() => setScreen("paused")} // Reusing paused state for high scores
            onSettings={() => setScreen("paused")} // Reusing paused state for settings
            currentLevel={currentLevel}
          />
        )}

        {screen === "playing" && (
          <GameScreen
            onGameOver={handleGameOver}
            onLevelComplete={handleLevelComplete}
            onPause={handlePause}
            currentLevel={currentLevel}
            settings={settings}
          />
        )}

        {screen === "levelComplete" && (
          <LevelCompleteScreen
            score={currentScore}
            level={currentLevel + 1}
            onNextLevel={handleNextLevel}
            onReplay={handleReplay}
            onMainMenu={handleMainMenu}
          />
        )}

        {screen === "gameOver" && (
          <GameOverScreen
            score={currentScore}
            highScore={getHighScore()}
            onRetry={handleReplay}
            onMainMenu={handleMainMenu}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
});
