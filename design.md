# Horizon Mobile - Game Design Document

## Design Philosophy
Horizon Mobile is a vertical platformer inspired by Donkey Kong, designed for **mobile portrait orientation (9:16)** with **one-handed gameplay**. The game follows Apple Human Interface Guidelines to feel like a native iOS app with intuitive touch controls.

## Screen List

### 1. Home Screen
**Primary Content:**
- Game logo/title at top
- "Play" button (large, centered)
- "High Scores" button
- "Settings" button
- Current level indicator

**Functionality:**
- Start new game
- View high scores
- Access settings (sound, haptics)
- Resume from last checkpoint

### 2. Game Screen
**Primary Content:**
- Vertical platforming arena (main play area)
- Player character at bottom
- Platforms arranged vertically
- Rolling obstacles (barrels)
- Ladders between platforms
- Goal/rescue target at top
- Score display (top-left)
- Lives/health indicator (top-right)
- Pause button (top-right corner)

**Functionality:**
- Touch controls for movement (left/right)
- Jump button (right side)
- Climb ladders automatically on contact
- Dodge rolling obstacles
- Collect power-ups
- Reach top to complete level

### 3. Pause Screen (Overlay)
**Primary Content:**
- Semi-transparent overlay
- "Resume" button
- "Restart Level" button
- "Main Menu" button
- Current score display

**Functionality:**
- Resume game
- Restart current level
- Return to main menu

### 4. Level Complete Screen
**Primary Content:**
- Victory message
- Stars earned (1-3 based on performance)
- Score breakdown
- "Next Level" button
- "Replay" button
- "Main Menu" button

**Functionality:**
- Progress to next level
- Replay current level
- Return to main menu

### 5. Game Over Screen
**Primary Content:**
- Game over message
- Final score
- High score comparison
- "Retry" button
- "Main Menu" button

**Functionality:**
- Retry current level
- Return to main menu

### 6. High Scores Screen
**Primary Content:**
- List of top 10 scores
- Player name/initials
- Score value
- Level reached
- Date achieved
- "Back" button

**Functionality:**
- View historical high scores
- Return to main menu

### 7. Settings Screen
**Primary Content:**
- Sound effects toggle
- Music toggle
- Haptic feedback toggle
- Control sensitivity slider
- "Back" button

**Functionality:**
- Toggle audio settings
- Adjust haptic feedback
- Adjust control sensitivity
- Return to main menu

## Key User Flows

### Main Game Flow
1. User opens app → Home Screen
2. User taps "Play" → Game Screen (Level 1)
3. User controls character with touch controls
4. User dodges obstacles and climbs platforms
5. User reaches top → Level Complete Screen
6. User taps "Next Level" → Game Screen (Level 2)
7. Repeat until game over or user quits

### Game Over Flow
1. User loses all lives → Game Over Screen
2. User sees final score
3. User taps "Retry" → Game Screen (same level)
OR User taps "Main Menu" → Home Screen

### Pause Flow
1. During gameplay, user taps pause button → Pause Screen overlay
2. User taps "Resume" → Game Screen continues
OR User taps "Restart Level" → Game Screen resets
OR User taps "Main Menu" → Home Screen

## Color Choices

### Primary Palette
- **Primary (Accent):** `#FF6B35` (Vibrant Orange) - Used for buttons, player character, power-ups
- **Background:** `#1A1A2E` (Dark Navy) - Main game background
- **Surface:** `#16213E` (Darker Blue) - Platforms, UI cards
- **Foreground (Text):** `#EAEAEA` (Off-White) - Primary text, score
- **Muted:** `#94A3B8` (Slate Gray) - Secondary text, UI elements
- **Success:** `#4ADE80` (Green) - Level complete, power-ups
- **Warning:** `#FBBF24` (Yellow) - Obstacles, danger indicators
- **Error:** `#F87171` (Red) - Game over, lives lost

### Gradient Accents
- Background gradient: `#1A1A2E` → `#0F3460` (top to bottom)
- Platform highlights: `#16213E` with `#FF6B35` glow

## Visual Style
- **Pixel art aesthetic** with smooth animations
- **High contrast** for visibility on mobile screens
- **Glowing effects** on interactive elements
- **Particle effects** for jumps, collisions, power-ups
- **Smooth transitions** between screens (fade, slide)

## Touch Controls Layout
- **Left side (40% of screen):** Left/Right movement buttons (semi-transparent circles)
- **Right side (bottom-right corner):** Jump button (large, orange circle)
- **Top-right corner:** Pause button (small icon)
- **Gesture support:** Swipe up on ladder to climb faster

## Animation Principles
- **Player movement:** 8-frame walk cycle
- **Jump:** Arc motion with squash/stretch
- **Barrel roll:** Continuous rotation with bounce on platforms
- **Ladder climb:** 4-frame climbing animation
- **Power-up collection:** Scale up + particle burst
- **Level transition:** Fade out + slide up

## Audio Design
- **Background music:** Upbeat chiptune loop
- **Sound effects:**
  - Jump: Short "boing" sound
  - Land: Soft thud
  - Barrel collision: Crash sound
  - Power-up: Chime sound
  - Level complete: Victory fanfare
  - Game over: Descending tone

## Performance Targets
- **60 FPS** on iPhone 12 and newer
- **30 FPS minimum** on older devices
- **Touch response:** < 50ms latency
- **Level load time:** < 1 second

## Accessibility
- **High contrast mode:** Increase color contrast
- **Haptic feedback:** Vibration on collisions, jumps
- **Sound indicators:** Visual cues for audio events
- **Adjustable controls:** Sensitivity slider in settings
