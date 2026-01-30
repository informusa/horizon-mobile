# GitHub Deployment Instructions

Follow these steps to deploy Horizon Mobile to your GitHub repository:

## Quick Setup

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `horizon-mobile`
   - Description: "Vertical platformer game inspired by Donkey Kong"
   - Choose Public or Private
   - **Do NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Push your code** (run these commands in your terminal):

```bash
cd horizon-mobile

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/horizon-mobile.git

# Push to GitHub
git push -u origin main
```

3. **Verify deployment**:
   - Visit your repository at `https://github.com/YOUR_USERNAME/horizon-mobile`
   - You should see all project files

## Authentication

If you encounter authentication issues:

1. Generate a Personal Access Token at: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (all)
4. Copy the token
5. Use the token as your password when pushing

## Next Steps

After pushing to GitHub, see `DEPLOYMENT.md` for:
- Building the app with Expo EAS
- Submitting to iOS App Store
- Submitting to Google Play Store
- Testing on physical devices

## Repository Structure

Your repository will include:
- `/app` - React Native screens and navigation
- `/components` - Reusable UI components
- `/lib/game` - Game engine, physics, and state management
- `/assets` - Images, icons, and branding
- `app.config.ts` - Expo configuration
- `package.json` - Dependencies
- `DEPLOYMENT.md` - Full deployment guide

## Support

For issues or questions, open an issue on your GitHub repository.
