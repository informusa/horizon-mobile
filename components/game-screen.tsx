/**
 * Main Game Screen - Integrates canvas and controls
 */

import { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GameCanvas, type GameControls as GameControlMethods } from "./game-canvas";
import { GameControls } from "./game-controls";

interface GameScreenProps {
  onGameOver: (score: number) => void;
  onLevelComplete: (score: number, level: number) => void;
  onPause: () => void;
  currentLevel: number;
  settings: { hapticEnabled: boolean };
}

export function GameScreen({ onGameOver, onLevelComplete, onPause, currentLevel, settings }: GameScreenProps) {
  const [isPaused, setIsPaused] = useState(false);
  const controlMethodsRef = useRef<GameControlMethods | null>(null);

  const handleControlsReady = (controls: GameControlMethods) => {
    controlMethodsRef.current = controls;
  };

  const handleMoveLeft = () => {
    controlMethodsRef.current?.moveLeft();
  };

  const handleMoveRight = () => {
    controlMethodsRef.current?.moveRight();
  };

  const handleStopMove = () => {
    controlMethodsRef.current?.stopMove();
  };

  const handleJump = () => {
    controlMethodsRef.current?.jump();
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
    onPause();
  };



  return (
    <View style={styles.container}>
      <GameCanvas
        onGameOver={onGameOver}
        onLevelComplete={onLevelComplete}
        onPause={handlePause}
        isPaused={isPaused}
        currentLevel={currentLevel}
        onControlsReady={handleControlsReady}
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
