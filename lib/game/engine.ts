/**
 * Game Engine - Core physics and collision detection
 */

import type { Vector2, GameObject, Player, Platform, Ladder, Barrel, PowerUp, GameConfig } from "./types";

export const DEFAULT_CONFIG: GameConfig = {
  canvasWidth: 375,
  canvasHeight: 667,
  gravity: 0.8,
  playerSpeed: 5,
  jumpForce: -15,
  barrelSpeed: 3,
  fps: 60,
};

export class GameEngine {
  config: GameConfig;

  constructor(config: Partial<GameConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Apply gravity to a game object
   */
  applyGravity(obj: GameObject): void {
    if (!obj.active) return;
    obj.velocity.y += this.config.gravity;
  }

  /**
   * Update object position based on velocity
   */
  updatePosition(obj: GameObject): void {
    if (!obj.active) return;
    obj.position.x += obj.velocity.x;
    obj.position.y += obj.velocity.y;
  }

  /**
   * Check collision between two rectangular objects
   */
  checkCollision(
    obj1: GameObject | { position: Vector2; width: number; height: number },
    obj2: { x: number; y: number; width: number; height: number } | GameObject
  ): boolean {
    const x1 = "position" in obj1 ? obj1.position.x : (obj1 as any).x;
    const y1 = "position" in obj1 ? obj1.position.y : (obj1 as any).y;
    const w1 = obj1.width;
    const h1 = obj1.height;

    const x2 = "position" in obj2 ? (obj2 as GameObject).position.x : (obj2 as any).x;
    const y2 = "position" in obj2 ? (obj2 as GameObject).position.y : (obj2 as any).y;
    const w2 = obj2.width;
    const h2 = obj2.height;

    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  /**
   * Check if player is on a platform
   */
  checkPlatformCollision(player: Player, platforms: Platform[]): Platform | null {
    for (const platform of platforms) {
      // Check if player is falling onto platform
      if (
        player.velocity.y >= 0 &&
        player.position.x + player.width > platform.x &&
        player.position.x < platform.x + platform.width &&
        player.position.y + player.height >= platform.y &&
        player.position.y + player.height <= platform.y + 20
      ) {
        return platform;
      }
    }
    return null;
  }

  /**
   * Check if player is touching a ladder
   */
  checkLadderCollision(player: Player, ladders: Ladder[]): Ladder | null {
    for (const ladder of ladders) {
      if (this.checkCollision(player, ladder)) {
        return ladder;
      }
    }
    return null;
  }

  /**
   * Check if player collides with barrel
   */
  checkBarrelCollision(player: Player, barrels: Barrel[]): Barrel | null {
    if (player.invincible) return null;

    for (const barrel of barrels) {
      if (barrel.active && this.checkCollision(player, barrel)) {
        return barrel;
      }
    }
    return null;
  }

  /**
   * Handle player landing on platform
   */
  landOnPlatform(player: Player, platform: Platform): void {
    player.position.y = platform.y - player.height;
    player.velocity.y = 0;
    player.isJumping = false;
  }

  /**
   * Handle player climbing ladder
   */
  climbLadder(player: Player, direction: "up" | "down"): void {
    player.isClimbing = true;
    player.velocity.y = direction === "up" ? -3 : 3;
    player.velocity.x = 0;
  }

  /**
   * Handle player jump
   */
  jump(player: Player): void {
    if (!player.isJumping && !player.isClimbing) {
      player.velocity.y = this.config.jumpForce;
      player.isJumping = true;
    }
  }

  /**
   * Move player horizontally
   */
  movePlayer(player: Player, direction: "left" | "right" | "stop"): void {
    if (player.isClimbing) return;

    if (direction === "left") {
      player.velocity.x = -this.config.playerSpeed;
      player.direction = "left";
    } else if (direction === "right") {
      player.velocity.x = this.config.playerSpeed;
      player.direction = "right";
    } else {
      player.velocity.x = 0;
    }
  }

  /**
   * Update barrel physics
   */
  updateBarrel(barrel: Barrel, platforms: Platform[]): void {
    if (!barrel.active) return;

    // Apply gravity
    this.applyGravity(barrel);

    // Update position
    this.updatePosition(barrel);

    // Update rotation
    barrel.rotation += barrel.speed * 0.1;

    // Check platform collision
    const barrelAsPlayer = {
      ...barrel,
      lives: 0,
      score: 0,
      isJumping: false,
      isClimbing: false,
      direction: "left" as const,
      invincible: false,
      invincibleTimer: 0,
      combo: 0,
      comboTimer: 0,
      lastComboAction: null,
    };
    const platform = this.checkPlatformCollision(barrelAsPlayer, platforms);
    if (platform) {
      barrel.position.y = platform.y - barrel.height;
      barrel.velocity.y = 0;
      // Bounce effect
      barrel.velocity.y = -5;
    }

    // Remove if off screen
    if (barrel.position.y > this.config.canvasHeight + 100) {
      barrel.active = false;
    }
  }

  /**
   * Check if player reached goal
   */
  checkGoalReached(player: Player, goalPosition: Vector2): boolean {
    const distance = Math.sqrt(
      Math.pow(player.position.x - goalPosition.x, 2) + Math.pow(player.position.y - goalPosition.y, 2)
    );
    return distance < 50;
  }

  /**
   * Keep player within bounds
   */
  constrainToBounds(player: Player): void {
    if (player.position.x < 0) player.position.x = 0;
    if (player.position.x + player.width > this.config.canvasWidth) {
      player.position.x = this.config.canvasWidth - player.width;
    }
    if (player.position.y > this.config.canvasHeight) {
      player.position.y = this.config.canvasHeight - player.height;
      player.velocity.y = 0;
    }
  }

  /**
   * Check power-up collision with player
   */
  checkPowerUpCollision(player: Player, powerUps: PowerUp[]): PowerUp | null {
    for (const powerUp of powerUps) {
      if (powerUp.active && this.checkCollision(player, powerUp)) {
        return powerUp;
      }
    }
    return null;
  }

  /**
   * Calculate distance between two points
   */
  distance(p1: Vector2, p2: Vector2): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
}
