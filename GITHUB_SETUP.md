# GitHub & Vercel Deployment Guide

Complete guide to deploy Horizon Mobile to GitHub and Vercel.

---

## Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `horizon-mobile` (or your preferred name)
3. Description: "Donkey Kong-inspired mobile platformer game"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Push Code to GitHub

The repository is already initialized with git. Run these commands on your computer:

```bash
cd horizon-mobile

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/horizon-mobile.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you get an authentication error:**
- GitHub requires a Personal Access Token (PAT) instead of password
- Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` scope
- Use the token as your password when pushing

---

## Part 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your `horizon-mobile` repository
5. Vercel will auto-detect Expo configuration
6. **Environment Variables** (Important!):
   - Click **Environment Variables**
   - Add `DATABASE_URL` if you want online leaderboard to work
   - Get database URL from Manus Management UI → Database → Settings
7. Click **Deploy**
8. Wait 2-3 minutes for build to complete
9. Your app will be live at `https://horizon-mobile-xxx.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd horizon-mobile
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: horizon-mobile
# - Directory: ./
# - Override settings? No

# Production deployment
vercel --prod
```

---

## Part 3: Configure Environment Variables

### For Online Leaderboard to Work

The online leaderboard requires a database connection. Add this environment variable in Vercel:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: Your MySQL connection string
   - **Environments**: Production, Preview, Development

**Get DATABASE_URL:**
- Open Manus Management UI (right panel)
- Go to Database → Settings (bottom-left)
- Copy the connection string
- Format: `mysql://user:password@host:port/database?ssl={"rejectUnauthorized":true}`

### Optional: Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

---

## Part 4: Verify Deployment

### Test Web Version

1. Visit your Vercel URL
2. Click **PLAY** to start the game
3. Test touch controls or keyboard (arrow keys + space)
4. Complete a level and check if score is saved

### Test Online Leaderboard

1. Play the game and get a score
2. Go back to main menu
3. Click **HIGH SCORES**
4. Your score should appear in the local list
5. Check database in Manus Management UI → Database
6. Look for `leaderboard` table with your entry

---

## Part 5: Mobile App Deployment

The web version is now live on Vercel, but for native mobile apps:

### iOS & Android (via Expo)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

### Share via Expo Go (Testing)

The QR code URL is already available:
```
exps://8081-i09z0wfazje676yhvogvz-20be741b.us2.manus.computer
```

Testers can scan this in Expo Go app while your dev server is running.

---

## Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
- Solution: Run `pnpm install` locally and commit `pnpm-lock.yaml`

**Error: "Build exceeded time limit"**
- Solution: Vercel free tier has 45-second build limit for Hobby plan
- Upgrade to Pro plan or optimize build

### Database Connection Fails

**Error: "Cannot connect to database"**
- Check `DATABASE_URL` is set correctly in Vercel
- Ensure SSL is enabled: `?ssl={"rejectUnauthorized":true}`
- Verify database is accessible from external IPs

### Game Not Loading

**Blank screen on Vercel**
- Check browser console for errors (F12)
- Ensure all assets are committed to git
- Verify `vercel.json` is present

---

## Features Summary

Your deployed app includes:

✅ **Core Gameplay**
- Vertical platforming with 3 levels
- Player movement, jumping, climbing
- Rolling barrel obstacles
- Collision detection
- Lives and scoring system

✅ **Power-ups**
- Invincibility shield (purple)
- Speed boost (yellow)
- Extra life (red)
- Random spawning on platforms

✅ **Audio Support**
- Audio manager ready for sound effects
- Instructions in `assets/audio/README.md`
- Add MP3 files to enable sounds

✅ **Online Leaderboard**
- Global rankings
- Automatic score submission
- Database backend
- Real-time updates

✅ **Settings**
- Sound toggle
- Music toggle
- Haptic feedback toggle

---

## Next Steps

1. **Add your own sounds**: Download retro sound effects from Pixabay and place in `assets/audio/`
2. **Customize branding**: Update app name and colors in `app.config.ts` and `theme.config.js`
3. **Add more levels**: Edit `lib/game/levels.ts` to create new challenges
4. **Monitor analytics**: Add Vercel Analytics or Google Analytics
5. **Share your game**: Post on social media with your Vercel URL!

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Expo Docs**: https://docs.expo.dev
- **GitHub Issues**: Create issues in your repository

Enjoy your deployed game! 🎮
