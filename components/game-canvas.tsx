/**
 * Game Canvas Component - React Native compatible rendering
 */

import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from "react-native-reanimated";
import { GameEngine } from "@/lib/game/engine";
import { createInitialState, spawnBarrel, spawnPowerUp, updateInvincibility, handlePlayerHit, collectPowerUp, cleanupInactivePowerUps } from "@/lib/game/state";
import type { GameStateData } from "@/lib/game/state";
import type { Platform, Ladder, Barrel, PowerUp, Particle } from "@/lib/game/types";
import { updateComboTimer, getComboText } from "@/lib/game/combo";
import { createExplosion, updateParticles } from "@/lib/game/particles";

interface GameCanvasProps {
  onGameOver: (score: number) => void;
  onLevelComplete: (score: number, level: number) => void;
  onPause: () => void;
  isPaused: boolean;
  currentLevel: number;
  onControlsReady?: (controls: GameControls) => void;
}

export interface GameControls {
  moveLeft: () => void;
  moveRight: () => void;
  stopMove: () => void;
  jump: () => void;
}

const CANVAS_WIDTH = 375;
const CANVAS_HEIGHT = 667;

// Platform component
function PlatformView({ platform }: { platform: Platform }) {
  return (
    <View
      style={[
        styles.platform,
        {
          left: platform.x,
          top: platform.y,
          width: platform.width,
          height: platform.height,
        },
      ]}
    />
  );
}

// Ladder component
function LadderView({ ladder }: { ladder: Ladder }) {
  return (
    <View
      style={[
        styles.ladder,
        {
          left: ladder.x,
          top: ladder.y,
          width: ladder.width,
          height: ladder.height,
        },
      ]}
    />
  );
}

// Barrel component with rotation animation
function BarrelView({ barrel }: { barrel: Barrel }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (!barrel.active) return null;

  return (
    <Animated.View
      style={[
        styles.barrel,
        {
          left: barrel.position.x,
          top: barrel.position.y,
          width: barrel.width,
          height: barrel.height,
        },
        animatedStyle,
      ]}
    />
  );
}

// Power-up component with pulse and glow animation
function PowerUpView({ powerUp }: { powerUp: PowerUp }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.15, { duration: 600 }), -1, true);
    opacity.value = withRepeat(withTiming(0.7, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!powerUp.active) return null;

  // Different colors for different power-up types
  const colors = {
    invincibility: "#A78BFA", // Purple
    speedBoost: "#FBBF24", // Yellow
    extraLife: "#F87171", // Red
  };

  return (
    <Animated.View
      style={[
        styles.powerUp,
        {
          left: powerUp.position.x,
          top: powerUp.position.y,
          width: powerUp.width,
          height: powerUp.height,
          backgroundColor: colors[powerUp.type],
        },
        animatedStyle,
      ]}
    />
  );
}

// Goal component with pulse animation
function GoalView({ x, y }: { x: number; y: number }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.goal,
        {
          left: x - 20,
          top: y - 20,
        },
        animatedStyle,
      ]}
    />
  );
}

// Player component
function PlayerView({
  x,
  y,
  width,
  height,
  invincible,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  invincible: boolean;
}) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (invincible) {
      opacity.value = withRepeat(withTiming(0.3, { duration: 200 }), -1, true);
    } else {
      opacity.value = 1;
    }
  }, [invincible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.player,
        {
          left: x,
          top: y,
          width,
          height,
        },
        animatedStyle,
      ]}
    />
  );
}

export function GameCanvas({ onGameOver, onLevelComplete, onPause, isPaused, currentLevel, onControlsReady }: GameCanvasProps) {
  const gameStateRef = useRef<GameStateData>(createInitialState(currentLevel));
  const engineRef = useRef(new GameEngine({ canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT }));
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [, forceUpdate] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Screen shake effect
  const shakeX = useSharedValue(0);
  const shakeY = useSharedValue(0);
  
  const triggerShake = () => {
    shakeX.value = withTiming(0, { duration: 0 });
    shakeY.value = withTiming(0, { duration: 0 });
    shakeX.value = withTiming(5, { duration: 50 });
    shakeY.value = withTiming(5, { duration: 50 });
    setTimeout(() => {
      shakeX.value = withTiming(-5, { duration: 50 });
      shakeY.value = withTiming(-5, { duration: 50 });
    }, 50);
    setTimeout(() => {
      shakeX.value = withTiming(0, { duration: 100 });
      shakeY.value = withTiming(0, { duration: 100 });
    }, 100);
  };
  
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }, { translateY: shakeY.value }],
  }));

  // Control methods
  const controlMethods: GameControls = {
    moveLeft: () => {
      if (gameStateRef.current) {
        gameStateRef.current.player.velocity.x = -5;
        gameStateRef.current.player.direction = "left";
      }
    },
    moveRight: () => {
      if (gameStateRef.current) {
        gameStateRef.current.player.velocity.x = 5;
        gameStateRef.current.player.direction = "right";
      }
    },
    stopMove: () => {
      if (gameStateRef.current && !gameStateRef.current.player.isClimbing) {
        gameStateRef.current.player.velocity.x = 0;
      }
    },
    jump: () => {
      if (gameStateRef.current) {
        const player = gameStateRef.current.player;
        if (!player.isJumping && !player.isClimbing) {
          player.velocity.y = -15;
          player.isJumping = true;
        }
      }
    },
  };

  useEffect(() => {
    gameStateRef.current = createInitialState(currentLevel);
    gameStateRef.current.gameState = "playing";
    
    // Expose controls to parent
    if (onControlsReady) {
      onControlsReady(controlMethods);
    }
  }, [currentLevel]);

  useEffect(() => {
    const gameLoop = (currentTime: number) => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const gameState = gameStateRef.current;
      const engine = engineRef.current;

      if (gameState.gameState !== "playing") {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Update player physics
      if (!gameState.player.isClimbing) {
        engine.applyGravity(gameState.player);
      }
      engine.updatePosition(gameState.player);
      engine.constrainToBounds(gameState.player);

      // Check platform collisions
      const platformCollision = engine.checkPlatformCollision(gameState.player, gameState.level.platforms);
      if (platformCollision) {
        engine.landOnPlatform(gameState.player, platformCollision);
      }

      // Check ladder collisions
      const ladderCollision = engine.checkLadderCollision(gameState.player, gameState.level.ladders);
      if (!ladderCollision) {
        gameState.player.isClimbing = false;
      }

      // Spawn barrels
      spawnBarrel(gameState, currentTime);

      // Spawn power-ups
      spawnPowerUp(gameState, currentTime);

      // Update barrels
      gameState.barrels.forEach((barrel) => {
        const previousY = barrel.position.y;
        const previousVelocity = barrel.velocity.y;
        engine.updateBarrel(barrel, gameState.level.platforms);
        // Trigger shake and particles when barrel hits platform
        if (previousVelocity > 0 && barrel.velocity.y === 0) {
          triggerShake();
          setParticles((prev) => [...prev, ...createExplosion(barrel.position.x + barrel.width / 2, barrel.position.y + barrel.height, "#FBBF24", 6)]);
        }
      });

      // Check barrel collisions
      const barrelHit = engine.checkBarrelCollision(gameState.player, gameState.barrels);
      if (barrelHit) {
        handlePlayerHit(gameState.player);
        barrelHit.active = false;

        if (gameState.player.lives <= 0) {
          gameState.gameState = "gameOver";
          onGameOver(gameState.player.score);
          return;
        }
      }

      // Check power-up collisions
      const powerUpHit = engine.checkPowerUpCollision(gameState.player, gameState.powerUps);
      if (powerUpHit) {
        collectPowerUp(gameState.player, powerUpHit);
        // Create particle effect
        const color = powerUpHit.type === "invincibility" ? "#FFD700" : powerUpHit.type === "extraLife" ? "#4ADE80" : "#60A5FA";
        setParticles((prev) => [...prev, ...createExplosion(powerUpHit.position.x + 15, powerUpHit.position.y + 15, color, 12)]);
      }

      // Cleanup inactive power-ups
      cleanupInactivePowerUps(gameState);

      // Update invincibility
      updateInvincibility(gameState.player, deltaTime);

      // Update combo timer
      updateComboTimer(gameState.player, deltaTime);

      // Update particles
      setParticles((prev) => updateParticles(prev, deltaTime));

      // Check goal reached
      if (engine.checkGoalReached(gameState.player, gameState.level.goalPosition)) {
        gameState.player.score += 1000;
        gameState.gameState = "levelComplete";
        onLevelComplete(gameState.player.score, gameState.currentLevel + 1);
        return;
      }

      // Force re-render
      forceUpdate((n) => n + 1);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, currentLevel, onGameOver, onLevelComplete]);

  const gameState = gameStateRef.current;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gameArea, shakeStyle]}>
        {/* Platforms */}
        {gameState.level.platforms.map((platform) => (
          <PlatformView key={platform.id} platform={platform} />
        ))}

        {/* Ladders */}
        {gameState.level.ladders.map((ladder) => (
          <LadderView key={ladder.id} ladder={ladder} />
        ))}

        {/* Goal */}
        <GoalView x={gameState.level.goalPosition.x} y={gameState.level.goalPosition.y} />

        {/* Power-ups */}
        {gameState.powerUps.map((powerUp) => (
          <PowerUpView key={powerUp.id} powerUp={powerUp} />
        ))}

        {/* Barrels */}
        {gameState.barrels.map((barrel) => (
          <BarrelView key={barrel.id} barrel={barrel} />
        ))}

        {/* Player */}
        <PlayerView
          x={gameState.player.position.x}
          y={gameState.player.position.y}
          width={gameState.player.width}
          height={gameState.player.height}
          invincible={gameState.player.invincible}
        />

        {/* Particles */}
        {particles.map((particle) => (
          <View
            key={particle.id}
            style={[
              styles.particle,
              {
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.life,
              },
            ]}
          />
        ))}

        {/* Combo Display */}
        {gameState.player.combo > 0 && (
          <View style={styles.comboDisplay}>
            <Text style={styles.comboText}>{getComboText(gameState.player.combo)}</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
  },
  gameArea: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: "#0F3460",
    position: "relative",
  },
  platform: {
    position: "absolute",
    backgroundColor: "#16213E",
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  ladder: {
    position: "absolute",
    backgroundColor: "transparent",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#94A3B8",
  },
  barrel: {
    position: "absolute",
    backgroundColor: "#FBBF24",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#92400E",
  },
  goal: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "#4ADE80",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#22C55E",
  },
  powerUp: {
    position: "absolute",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  player: {
    position: "absolute",
    backgroundColor: "#FF6B35",
    borderRadius: 4,
  },
  comboDisplay: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  comboText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  particle: {
    position: "absolute",
    borderRadius: 4,
  },
});
