# Horizon Mobile - Deployment Guide

This guide provides instructions for deploying Horizon Mobile to GitHub and preparing for app store submission.

## Prerequisites

Before deploying, ensure you have the following installed and configured on your local machine:

- **Node.js** (v18 or later)
- **Git** (for version control)
- **GitHub account** (for repository hosting)
- **Expo account** (for building and publishing)
- **Xcode** (for iOS builds, macOS only)
- **Android Studio** (for Android builds)

## Step 1: Deploy to GitHub

### Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the **+** icon in the top-right corner and select **New repository**
3. Name your repository `horizon-mobile`
4. Choose **Public** or **Private** visibility
5. Do **not** initialize with README, .gitignore, or license (the project already has these)
6. Click **Create repository**

### Push Code to GitHub

From your local machine where you have the project files:

```bash
cd horizon-mobile

# Initialize git repository (if not already initialized)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Horizon Mobile game"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/horizon-mobile.git

# Push to GitHub
git push -u origin main
```

If you encounter authentication issues, you may need to use a personal access token instead of your password. Generate one at: https://github.com/settings/tokens

## Step 2: Prepare for App Store Submission

### iOS App Store

#### Requirements

- **Apple Developer Account** ($99/year)
- **macOS** with Xcode installed
- **App Store Connect** access

#### Build Process

1. **Install EAS CLI** (Expo Application Services):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure EAS Build**:
   ```bash
   eas build:configure
   ```

4. **Build for iOS**:
   ```bash
   eas build --platform ios
   ```

5. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

#### App Store Connect Setup

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create a new app with the following details:
   - **Name**: Horizon
   - **Primary Language**: English
   - **Bundle ID**: Use the bundle ID from `app.config.ts`
   - **SKU**: A unique identifier (e.g., `horizon-mobile-001`)

3. Fill in app information:
   - **Category**: Games > Action
   - **Subtitle**: Climb to Victory
   - **Description**: A vertical platformer inspired by classic arcade games. Climb platforms, dodge rolling barrels, and reach the top to complete each level. Features three challenging levels with increasing difficulty.

4. Upload screenshots (1290x2796 for iPhone 14 Pro Max):
   - Take screenshots from the game using Expo Go or simulator
   - Include Home Screen, Gameplay, and Level Complete screens

5. Set **Age Rating**: 4+ (no objectionable content)

6. Submit for review

### Google Play Store

#### Requirements

- **Google Play Developer Account** ($25 one-time fee)
- **Android Studio** (for testing)

#### Build Process

1. **Build for Android**:
   ```bash
   eas build --platform android
   ```

2. **Submit to Google Play**:
   ```bash
   eas submit --platform android
   ```

#### Google Play Console Setup

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app with the following details:
   - **App name**: Horizon
   - **Default language**: English (United States)
   - **App or game**: Game
   - **Free or paid**: Free

3. Fill in store listing:
   - **Short description**: Climb to victory in this retro platformer!
   - **Full description**: Horizon is a vertical platformer inspired by classic arcade games like Donkey Kong. Climb platforms, dodge rolling barrels, and reach the top to complete each level. Features three challenging levels with increasing difficulty, intuitive touch controls, and retro-inspired visuals.
   - **Category**: Action
   - **Tags**: Platformer, Arcade, Retro

4. Upload assets:
   - **Icon**: 512x512 PNG (use the generated app icon)
   - **Feature graphic**: 1024x500 PNG
   - **Screenshots**: At least 2 phone screenshots (1080x1920 or higher)

5. Set **Content rating**: Complete the questionnaire (likely ESRB: Everyone)

6. Submit for review

## Step 3: Testing Before Submission

### Test on Physical Devices

1. **iOS Testing**:
   ```bash
   # Start Expo development server
   pnpm dev

   # Open Expo Go app on your iPhone
   # Scan the QR code displayed in terminal
   ```

2. **Android Testing**:
   ```bash
   # Start Expo development server
   pnpm dev

   # Open Expo Go app on your Android device
   # Scan the QR code displayed in terminal
   ```

### Test Checklist

- [ ] All buttons and controls respond correctly
- [ ] Player movement (left, right, jump) works smoothly
- [ ] Barrel obstacles spawn and move correctly
- [ ] Platform and ladder collisions work properly
- [ ] Level completion triggers correctly
- [ ] Game over triggers when lives reach zero
- [ ] High scores save and display correctly
- [ ] Settings persist after app restart
- [ ] Haptic feedback works on supported devices
- [ ] App icon displays correctly on device home screen

## Step 4: Continuous Deployment

### Automated Builds with GitHub Actions

Create `.github/workflows/build.yml` for automated builds:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm check
      - run: pnpm test
```

## App Store Submission Tips

### Common Rejection Reasons

1. **Incomplete functionality**: Ensure all features work correctly
2. **Crashes**: Test thoroughly on multiple devices
3. **Privacy policy**: Add a privacy policy URL if collecting user data
4. **Metadata**: Ensure screenshots and descriptions accurately represent the app
5. **Age rating**: Set appropriate content rating

### Review Timeline

- **iOS**: Typically 1-3 days
- **Android**: Typically a few hours to 1 day

### Post-Submission

After approval, your app will be available on the respective app stores. Monitor user reviews and ratings, and prepare updates to fix bugs and add new features.

## Support and Updates

For questions or issues, please open an issue on the GitHub repository:
https://github.com/YOUR_USERNAME/horizon-mobile/issues

## License

This project is licensed under the MIT License. See the LICENSE file for details.
