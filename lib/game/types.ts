/**
 * Core game types and interfaces
 */

export interface Vector2 {
  x: number;
  y: number;
}

export interface GameObject {
  id: string;
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  active: boolean;
}

export interface Player extends GameObject {
  lives: number;
  score: number;
  isJumping: boolean;
  isClimbing: boolean;
  direction: "left" | "right";
  invincible: boolean;
  invincibleTimer: number;
  combo: number;
  comboTimer: number;
  lastComboAction: "powerup" | "dodge" | null;
}

export interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Ladder {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Barrel extends GameObject {
  rotation: number;
  speed: number;
}

export interface PowerUp extends GameObject {
  type: "invincibility" | "extraLife" | "speedBoost";
  duration: number;
}

export interface Level {
  id: number;
  platforms: Platform[];
  ladders: Ladder[];
  barrelSpawnRate: number;
  goalPosition: Vector2;
}

export type GameState = "menu" | "playing" | "paused" | "levelComplete" | "gameOver";

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  gravity: number;
  playerSpeed: number;
  jumpForce: number;
  barrelSpeed: number;
  fps: number;
}

export interface HighScore {
  name: string;
  score: number;
  level: number;
  date: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  hapticEnabled: boolean;
  controlSensitivity: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  objective: "no_powerups" | "speed_run" | "no_damage" | "collect_all";
  targetValue: number;
  reward: number;
  completed: boolean;
  date: string;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}
