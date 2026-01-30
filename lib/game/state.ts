/**
 * Game state management
 */

import type { Player, Barrel, PowerUp, GameState, GameSettings, HighScore, Level } from "./types";
import { LEVELS } from "./levels";

export interface GameStateData {
  gameState: GameState;
  currentLevel: number;
  player: Player;
  barrels: Barrel[];
  powerUps: PowerUp[];
  level: Level;
  lastBarrelSpawn: number;
  settings: GameSettings;
  highScores: HighScore[];
}

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  hapticEnabled: true,
  controlSensitivity: 1.0,
};

export function createInitialPlayer(): Player {
  return {
    id: "player",
    position: { x: 50, y: 550 },
    velocity: { x: 0, y: 0 },
    width: 30,
    height: 40,
    active: true,
    lives: 3,
    score: 0,
    isJumping: false,
    isClimbing: false,
    direction: "right",
    invincible: false,
    invincibleTimer: 0,
  };
}

export function createInitialState(levelIndex: number = 0): GameStateData {
  return {
    gameState: "menu",
    currentLevel: levelIndex,
    player: createInitialPlayer(),
    barrels: [],
    powerUps: [],
    level: LEVELS[levelIndex] || LEVELS[0],
    lastBarrelSpawn: 0,
    settings: DEFAULT_SETTINGS,
    highScores: [],
  };
}

export function resetPlayerPosition(player: Player): void {
  player.position = { x: 50, y: 550 };
  player.velocity = { x: 0, y: 0 };
  player.isJumping = false;
  player.isClimbing = false;
  player.invincible = false;
  player.invincibleTimer = 0;
}

export function spawnBarrel(gameState: GameStateData, currentTime: number): void {
  if (currentTime - gameState.lastBarrelSpawn > gameState.level.barrelSpawnRate) {
    const barrel: Barrel = {
      id: `barrel-${currentTime}`,
      position: { x: Math.random() * 300 + 37, y: 50 },
      velocity: { x: Math.random() > 0.5 ? 2 : -2, y: 0 },
      width: 25,
      height: 25,
      active: true,
      rotation: 0,
      speed: 3 + Math.random() * 2,
    };
    gameState.barrels.push(barrel);
    gameState.lastBarrelSpawn = currentTime;
  }
}

export function updateInvincibility(player: Player, deltaTime: number): void {
  if (player.invincible) {
    player.invincibleTimer -= deltaTime;
    if (player.invincibleTimer <= 0) {
      player.invincible = false;
      player.invincibleTimer = 0;
    }
  }
}

export function handlePlayerHit(player: Player): void {
  if (player.invincible) return;

  player.lives -= 1;
  player.invincible = true;
  player.invincibleTimer = 2000; // 2 seconds of invincibility

  if (player.lives <= 0) {
    // Game over will be handled by the game loop
  } else {
    resetPlayerPosition(player);
  }
}

export function calculateScore(player: Player, timeBonus: number = 0): number {
  return player.score + timeBonus;
}

export function addHighScore(highScores: HighScore[], newScore: HighScore): HighScore[] {
  const updated = [...highScores, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
  return updated;
}

export function nextLevel(gameState: GameStateData): void {
  const nextLevelIndex = gameState.currentLevel + 1;
  if (nextLevelIndex < LEVELS.length) {
    gameState.currentLevel = nextLevelIndex;
    gameState.level = LEVELS[nextLevelIndex];
    gameState.barrels = [];
    gameState.powerUps = [];
    resetPlayerPosition(gameState.player);
    gameState.gameState = "playing";
  } else {
    // All levels completed
    gameState.gameState = "levelComplete";
  }
}
