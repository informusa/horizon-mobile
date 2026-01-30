/**
 * Game Canvas Component - Main game rendering and loop
 */

import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GameEngine } from "@/lib/game/engine";
import { GameRenderer } from "@/lib/game/renderer";
import { createInitialState, spawnBarrel, updateInvincibility, handlePlayerHit, nextLevel } from "@/lib/game/state";
import type { GameStateData } from "@/lib/game/state";

interface GameCanvasProps {
  onGameOver: (score: number) => void;
  onLevelComplete: (score: number, level: number) => void;
  onPause: () => void;
  isPaused: boolean;
  currentLevel: number;
}

const CANVAS_WIDTH = 375;
const CANVAS_HEIGHT = 667;

export function GameCanvas({ onGameOver, onLevelComplete, onPause, isPaused, currentLevel }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameStateData>(createInitialState(currentLevel));
  const engineRef = useRef(new GameEngine({ canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT }));
  const rendererRef = useRef<GameRenderer | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    rendererRef.current = new GameRenderer(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameStateRef.current.gameState = "playing";

    const gameLoop = (currentTime: number) => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const gameState = gameStateRef.current;
      const engine = engineRef.current;
      const renderer = rendererRef.current;

      if (!renderer || gameState.gameState !== "playing") {
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
      if (ladderCollision && gameState.player.isClimbing) {
        // Player is on ladder, no gravity
      } else {
        gameState.player.isClimbing = false;
      }

      // Spawn barrels
      spawnBarrel(gameState, currentTime);

      // Update barrels
      gameState.barrels.forEach((barrel) => {
        engine.updateBarrel(barrel, gameState.level.platforms);
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

      // Update invincibility
      updateInvincibility(gameState.player, deltaTime);

      // Check goal reached
      if (engine.checkGoalReached(gameState.player, gameState.level.goalPosition)) {
        gameState.player.score += 1000;
        gameState.gameState = "levelComplete";
        onLevelComplete(gameState.player.score, gameState.currentLevel + 1);
        return;
      }

      // Render
      renderer.clear();

      // Draw platforms
      gameState.level.platforms.forEach((platform) => {
        renderer.drawPlatform(platform);
      });

      // Draw ladders
      gameState.level.ladders.forEach((ladder) => {
        renderer.drawLadder(ladder);
      });

      // Draw goal
      renderer.drawGoal(gameState.level.goalPosition);

      // Draw barrels
      gameState.barrels.forEach((barrel) => {
        if (barrel.active) {
          renderer.drawBarrel(barrel);
        }
      });

      // Draw player
      renderer.drawPlayer(gameState.player);

      // Draw HUD
      renderer.drawHUD(gameState.player.lives, gameState.player.score);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, currentLevel, onGameOver, onLevelComplete]);

  return (
    <View style={styles.container}>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={styles.canvas} />
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
  canvas: {},
});
