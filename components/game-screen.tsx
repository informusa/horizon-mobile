/**
 * Main Game Screen - Integrates canvas and controls
 */

import { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GameCanvas } from "./game-canvas";
import { GameControls } from "./game-controls";
import type { GameStateData } from "@/lib/game/state";

interface GameScreenProps {
  onGameOver: (score: number) => void;
  onLevelComplete: (score: number, level: number) => void;
  onPause: () => void;
  currentLevel: number;
  settings: { hapticEnabled: boolean };
}

export function GameScreen({ onGameOver, onLevelComplete, onPause, currentLevel, settings }: GameScreenProps) {
  const [isPaused, setIsPaused] = useState(false);
  const gameStateRef = useRef<GameStateData | null>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMoveLeft = () => {
    if (gameStateRef.current) {
      gameStateRef.current.player.velocity.x = -5;
      gameStateRef.current.player.direction = "left";
    }
  };

  const handleMoveRight = () => {
    if (gameStateRef.current) {
      gameStateRef.current.player.velocity.x = 5;
      gameStateRef.current.player.direction = "right";
    }
  };

  const handleStopMove = () => {
    if (gameStateRef.current && !gameStateRef.current.player.isClimbing) {
      gameStateRef.current.player.velocity.x = 0;
    }
  };

  const handleJump = () => {
    if (gameStateRef.current) {
      const player = gameStateRef.current.player;
      if (!player.isJumping && !player.isClimbing) {
        player.velocity.y = -15;
        player.isJumping = true;
      }
    }
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
    onPause();
  };

  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <GameCanvas
        onGameOver={onGameOver}
        onLevelComplete={onLevelComplete}
        onPause={handlePause}
        isPaused={isPaused}
        currentLevel={currentLevel}
      />
      <GameControls
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onStopMove={handleStopMove}
        onJump={handleJump}
        onPause={handlePause}
        hapticEnabled={settings.hapticEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A2E",
  },
});
