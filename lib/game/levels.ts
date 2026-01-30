/**
 * Level definitions for Horizon Mobile
 */

import type { Level } from "./types";

export const LEVELS: Level[] = [
  {
    id: 1,
    platforms: [
      // Bottom platform
      { id: "p1-1", x: 0, y: 600, width: 375, height: 20 },
      // Second level
      { id: "p1-2", x: 50, y: 500, width: 150, height: 15 },
      { id: "p1-3", x: 225, y: 500, width: 150, height: 15 },
      // Third level
      { id: "p1-4", x: 0, y: 400, width: 150, height: 15 },
      { id: "p1-5", x: 225, y: 400, width: 150, height: 15 },
      // Fourth level
      { id: "p1-6", x: 50, y: 300, width: 150, height: 15 },
      { id: "p1-7", x: 225, y: 300, width: 150, height: 15 },
      // Fifth level
      { id: "p1-8", x: 0, y: 200, width: 150, height: 15 },
      { id: "p1-9", x: 225, y: 200, width: 150, height: 15 },
      // Top platform (goal)
      { id: "p1-10", x: 125, y: 100, width: 125, height: 15 },
    ],
    ladders: [
      // Bottom to second
      { id: "l1-1", x: 180, y: 500, width: 30, height: 100 },
      // Second to third
      { id: "l1-2", x: 30, y: 400, width: 30, height: 100 },
      { id: "l1-3", x: 320, y: 400, width: 30, height: 100 },
      // Third to fourth
      { id: "l1-4", x: 180, y: 300, width: 30, height: 100 },
      // Fourth to fifth
      { id: "l1-5", x: 30, y: 200, width: 30, height: 100 },
      { id: "l1-6", x: 320, y: 200, width: 30, height: 100 },
      // Fifth to top
      { id: "l1-7", x: 180, y: 100, width: 30, height: 100 },
    ],
    barrelSpawnRate: 2000, // milliseconds
    goalPosition: { x: 187, y: 80 },
  },
  {
    id: 2,
    platforms: [
      // Bottom platform
      { id: "p2-1", x: 0, y: 600, width: 375, height: 20 },
      // Zigzag pattern
      { id: "p2-2", x: 0, y: 520, width: 180, height: 15 },
      { id: "p2-3", x: 195, y: 460, width: 180, height: 15 },
      { id: "p2-4", x: 0, y: 400, width: 180, height: 15 },
      { id: "p2-5", x: 195, y: 340, width: 180, height: 15 },
      { id: "p2-6", x: 0, y: 280, width: 180, height: 15 },
      { id: "p2-7", x: 195, y: 220, width: 180, height: 15 },
      { id: "p2-8", x: 0, y: 160, width: 180, height: 15 },
      // Top platform
      { id: "p2-9", x: 125, y: 80, width: 125, height: 15 },
    ],
    ladders: [
      { id: "l2-1", x: 150, y: 520, width: 30, height: 80 },
      { id: "l2-2", x: 195, y: 400, width: 30, height: 60 },
      { id: "l2-3", x: 150, y: 340, width: 30, height: 60 },
      { id: "l2-4", x: 195, y: 220, width: 30, height: 60 },
      { id: "l2-5", x: 150, y: 160, width: 30, height: 60 },
      { id: "l2-6", x: 180, y: 80, width: 30, height: 80 },
    ],
    barrelSpawnRate: 1500,
    goalPosition: { x: 187, y: 60 },
  },
  {
    id: 3,
    platforms: [
      // Bottom
      { id: "p3-1", x: 0, y: 600, width: 375, height: 20 },
      // Narrow platforms
      { id: "p3-2", x: 20, y: 530, width: 100, height: 15 },
      { id: "p3-3", x: 255, y: 530, width: 100, height: 15 },
      { id: "p3-4", x: 137, y: 460, width: 100, height: 15 },
      { id: "p3-5", x: 20, y: 390, width: 100, height: 15 },
      { id: "p3-6", x: 255, y: 390, width: 100, height: 15 },
      { id: "p3-7", x: 137, y: 320, width: 100, height: 15 },
      { id: "p3-8", x: 20, y: 250, width: 100, height: 15 },
      { id: "p3-9", x: 255, y: 250, width: 100, height: 15 },
      { id: "p3-10", x: 137, y: 180, width: 100, height: 15 },
      // Top
      { id: "p3-11", x: 125, y: 80, width: 125, height: 15 },
    ],
    ladders: [
      { id: "l3-1", x: 100, y: 530, width: 25, height: 70 },
      { id: "l3-2", x: 255, y: 460, width: 25, height: 70 },
      { id: "l3-3", x: 100, y: 390, width: 25, height: 70 },
      { id: "l3-4", x: 255, y: 320, width: 25, height: 70 },
      { id: "l3-5", x: 100, y: 250, width: 25, height: 70 },
      { id: "l3-6", x: 255, y: 180, width: 25, height: 70 },
      { id: "l3-7", x: 180, y: 80, width: 25, height: 100 },
    ],
    barrelSpawnRate: 1000,
    goalPosition: { x: 187, y: 60 },
  },
];
