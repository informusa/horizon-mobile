# Horizon Mobile 🎮

A vertical platformer game inspired by Donkey Kong, built with React Native and Expo.

![Horizon Mobile](https://files.manuscdn.com/user_upload_by_module/session_file/310519663326120815/iKLbNgLNarPpUiQF.png)

## 🎯 Game Features

- **Vertical Platforming**: Climb from bottom to top across 3 challenging levels
- **Obstacle Avoidance**: Dodge rolling barrels with physics-based movement
- **Touch Controls**: Intuitive on-screen controls optimized for mobile
- **Progressive Difficulty**: Each level increases in complexity
- **High Score System**: Persistent score tracking with AsyncStorage
- **Haptic Feedback**: Tactile response on all interactions
- **Lives System**: 3 lives with invincibility frames after hits

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Expo Go app (for mobile testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/horizon-mobile.git
cd horizon-mobile

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Run on Mobile Device

1. Install **Expo Go** on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code displayed in your terminal with Expo Go

3. The game will load on your device

### Run on Web

```bash
pnpm dev:metro
```

Visit `http://localhost:8081` in your browser.

## 🎮 How to Play

- **Move Left/Right**: Use the on-screen arrow buttons
- **Jump**: Tap the orange jump button on the right
- **Climb Ladders**: Walk into ladders to climb automatically
- **Pause**: Tap the pause button in the top-right corner

**Objective**: Reach the glowing green goal at the top of each level while avoiding barrels!

## 📱 Platform Support

- ✅ iOS (iPhone/iPad)
- ✅ Android
- ✅ Web (desktop and mobile browsers)

## 🛠️ Tech Stack

- **React Native** 0.81
- **Expo SDK** 54
- **TypeScript** 5.9
- **React Native Reanimated** 4.x (animations)
- **NativeWind** 4 (Tailwind CSS for React Native)
- **AsyncStorage** (persistent storage)
- **Expo Haptics** (tactile feedback)

## 📦 Project Structure

```
horizon-mobile/
├── app/                    # Expo Router screens
│   └── (tabs)/            # Tab navigation
├── components/            # Reusable UI components
│   ├── game-canvas.tsx   # Main game rendering
│   ├── game-controls.tsx # Touch controls
│   ├── game-screen.tsx   # Game integration
│   └── *-screen.tsx      # UI screens
├── lib/                   # Game logic
│   └── game/
│       ├── engine.ts     # Physics engine
│       ├── state.ts      # Game state management
│       ├── levels.ts     # Level definitions
│       ├── types.ts      # TypeScript types
│       └── audio.ts      # Audio manager
├── assets/               # Images and icons
└── app.config.ts        # Expo configuration
```

## 🎨 Game Design

The game features a retro-inspired aesthetic with:
- **Color Palette**: Dark navy background (#1A1A2E) with vibrant orange (#FF6B35) and green (#4ADE80) accents
- **Visual Style**: Geometric shapes with glowing effects
- **Animation**: Smooth 60 FPS gameplay with rotation and pulse effects

See `design.md` for detailed design documentation.

## 🚢 Deployment

### Mobile App Stores

See `DEPLOYMENT.md` for complete instructions on:
- Building with Expo EAS
- Submitting to iOS App Store
- Submitting to Google Play Store

### Web Deployment (Vercel)

The web version is automatically deployed to Vercel:

**Live Demo**: [Your Vercel URL will appear here]

To deploy your own:

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

## 📝 Development

### Available Scripts

```bash
pnpm dev          # Start dev server (both Metro and backend)
pnpm dev:metro    # Start Metro bundler only
pnpm dev:server   # Start backend server only
pnpm check        # TypeScript type checking
pnpm lint         # ESLint
pnpm test         # Run tests
pnpm build        # Build for production
```

### Adding New Levels

Edit `lib/game/levels.ts` to add new level configurations:

```typescript
{
  id: 4,
  platforms: [...],
  ladders: [...],
  barrelSpawnRate: 800,
  goalPosition: { x: 187, y: 60 }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the classic Donkey Kong arcade game
- Built with Expo and React Native
- Game assets generated with AI

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ using Manus AI**
