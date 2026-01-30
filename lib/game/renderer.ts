/**
 * Game renderer - Canvas drawing functions
 */

import type { Player, Barrel, Platform, Ladder, Vector2 } from "./types";

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  clear(): void {
    // Draw gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, "#1A1A2E");
    gradient.addColorStop(1, "#0F3460");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawPlayer(player: Player): void {
    this.ctx.save();

    // Flashing effect when invincible
    if (player.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
      this.ctx.globalAlpha = 0.5;
    }

    // Draw player as a simple rectangle with color
    this.ctx.fillStyle = "#FF6B35";
    this.ctx.fillRect(player.position.x, player.position.y, player.width, player.height);

    // Draw player eyes
    this.ctx.fillStyle = "#FFFFFF";
    const eyeY = player.position.y + 12;
    if (player.direction === "right") {
      this.ctx.fillRect(player.position.x + 18, eyeY, 6, 6);
    } else {
      this.ctx.fillRect(player.position.x + 6, eyeY, 6, 6);
    }

    this.ctx.restore();
  }

  drawPlatform(platform: Platform): void {
    // Platform base
    this.ctx.fillStyle = "#16213E";
    this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    // Platform highlight
    this.ctx.strokeStyle = "#FF6B35";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
  }

  drawLadder(ladder: Ladder): void {
    this.ctx.strokeStyle = "#94A3B8";
    this.ctx.lineWidth = 3;

    // Draw ladder sides
    this.ctx.beginPath();
    this.ctx.moveTo(ladder.x + 5, ladder.y);
    this.ctx.lineTo(ladder.x + 5, ladder.y + ladder.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(ladder.x + ladder.width - 5, ladder.y);
    this.ctx.lineTo(ladder.x + ladder.width - 5, ladder.y + ladder.height);
    this.ctx.stroke();

    // Draw ladder rungs
    const rungCount = Math.floor(ladder.height / 20);
    for (let i = 0; i <= rungCount; i++) {
      const rungY = ladder.y + (i * ladder.height) / rungCount;
      this.ctx.beginPath();
      this.ctx.moveTo(ladder.x + 5, rungY);
      this.ctx.lineTo(ladder.x + ladder.width - 5, rungY);
      this.ctx.stroke();
    }
  }

  drawBarrel(barrel: Barrel): void {
    this.ctx.save();
    this.ctx.translate(barrel.position.x + barrel.width / 2, barrel.position.y + barrel.height / 2);
    this.ctx.rotate(barrel.rotation);

    // Draw barrel
    this.ctx.fillStyle = "#FBBF24";
    this.ctx.fillRect(-barrel.width / 2, -barrel.height / 2, barrel.width, barrel.height);

    // Draw barrel stripes
    this.ctx.strokeStyle = "#92400E";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(-barrel.width / 2, -2);
    this.ctx.lineTo(barrel.width / 2, -2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(-barrel.width / 2, 2);
    this.ctx.lineTo(barrel.width / 2, 2);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawGoal(position: Vector2): void {
    // Draw goal as a star/target
    this.ctx.fillStyle = "#4ADE80";
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw inner circle
    this.ctx.fillStyle = "#22C55E";
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, 12, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw pulsing effect
    const pulseSize = 25 + Math.sin(Date.now() / 200) * 5;
    this.ctx.strokeStyle = "#4ADE80";
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.5;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, pulseSize, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }

  drawHUD(lives: number, score: number): void {
    this.ctx.fillStyle = "#EAEAEA";
    this.ctx.font = "bold 18px Arial";

    // Draw score
    this.ctx.fillText(`Score: ${score}`, 10, 30);

    // Draw lives
    this.ctx.fillText(`Lives: ${lives}`, this.width - 100, 30);
  }

  drawParticle(x: number, y: number, color: string, size: number): void {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
