/**
 * Combo system for rewarding consecutive actions
 */

import type { Player } from "./types";

const COMBO_TIMEOUT = 3000; // 3 seconds to maintain combo
const COMBO_MULTIPLIERS = [1, 1.5, 2, 2.5, 3, 4, 5]; // Multipliers for combo levels

export function updateComboTimer(player: Player, deltaTime: number) {
  if (player.comboTimer > 0) {
    player.comboTimer -= deltaTime;
    if (player.comboTimer <= 0) {
      resetCombo(player);
    }
  }
}

export function resetCombo(player: Player) {
  player.combo = 0;
  player.comboTimer = 0;
  player.lastComboAction = null;
}

export function addCombo(player: Player, action: "powerup" | "dodge") {
  // Reset if switching action types
  if (player.lastComboAction && player.lastComboAction !== action) {
    resetCombo(player);
  }

  player.combo++;
  player.comboTimer = COMBO_TIMEOUT;
  player.lastComboAction = action;
}

export function getComboMultiplier(combo: number): number {
  const index = Math.min(combo - 1, COMBO_MULTIPLIERS.length - 1);
  return combo > 0 ? COMBO_MULTIPLIERS[index] : 1;
}

export function calculateComboBonus(basePoints: number, combo: number): number {
  if (combo === 0) return basePoints;
  const multiplier = getComboMultiplier(combo);
  return Math.floor(basePoints * multiplier);
}

export function getComboText(combo: number): string {
  if (combo === 0) return "";
  if (combo < 3) return `${combo}x COMBO!`;
  if (combo < 5) return `${combo}x GREAT!`;
  if (combo < 7) return `${combo}x AMAZING!`;
  return `${combo}x LEGENDARY!`;
}
