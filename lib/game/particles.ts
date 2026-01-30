/**
 * Particle system for visual effects
 */

import type { Particle } from "./types";

export function createExplosion(x: number, y: number, color: string, count: number = 8): Particle[] {
  const particles: Particle[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 2 + Math.random() * 3;
    
    particles.push({
      id: `particle-${Date.now()}-${i}`,
      x,
      y,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed,
      size: 4 + Math.random() * 4,
      color,
      life: 1,
      maxLife: 1,
    });
  }
  
  return particles;
}

export function updateParticles(particles: Particle[], deltaTime: number): Particle[] {
  return particles
    .map((particle) => {
      // Update position
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      
      // Apply gravity
      particle.velocityY += 0.2;
      
      // Fade out
      particle.life -= deltaTime / 1000;
      
      return particle;
    })
    .filter((particle) => particle.life > 0);
}
