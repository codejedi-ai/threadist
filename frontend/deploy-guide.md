# Threadist Mobile App Deployment Guide

This guide will help you deploy the Threadist mobile app to Expo and distribute it to users.

## Prerequisites

1. **Expo CLI**: Install the latest Expo CLI
   ```bash
   npm install -g @expo/cli
   ```

2. **EAS CLI**: Install EAS CLI for building and submitting
   ```bash
   npm install -g eas-cli
   ```

3. **Expo Account**: Create an account at [expo.dev](https://expo.dev)

## Step 1: Initial Setup

1. **Login to Expo**:
   ```bash
   cd frontend
   expo login
   ```

2. **Initialize EAS**:
   ```bash
   eas init
   ```
   This will create a project on Expo and update your `app.config.js` with the project ID.

## Step 2: Environment Configuration

1. **Create `.env` file** in the frontend directory:
   ```bash
   cp .env.example .env
   ```

2. **Update environment variables** in `.env`:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_actual_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   EXPO_PUBLIC_API_URL=https://your-backend-api-url.com
   ```

3. **Set up Expo environment secrets** (for sensitive data):
   ```bash
   eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "your_supabase_url"
   eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your_supabase_anon_key"
   eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value "your_backend_url"
   ```

## Step 3: Build Configuration

The `eas.json` file is already configured with three build profiles:

- **development**: For development builds with Expo Dev Client
- **preview**: For internal testing (includes iOS Simulator)
- **production**: For app store releases

## Step 4: Building the App

### For Development/Testing (Expo Go compatible):
```bash
expo publish
```

### For Preview Builds (Internal Distribution):
```bash
# Build for both platforms
eas build --profile preview --platform all

# Or build for specific platform
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

### For Production Builds (App Store/Play Store):
```bash
# Build for both platforms
eas build --profile production --platform all

# Or build for specific platform
eas build --profile production --platform ios
eas build --profile production --platform android
```

## Step 5: Testing Your Build

### Using Expo Go (Development):
1. Install Expo Go on your device
2. Scan the QR code from `expo start`
3. Test the app functionality

### Using Preview Builds:
1. Download the build from the EAS dashboard
2. Install on your device (iOS: TestFlight, Android: APK)
3. Test all features including audio playback

## Step 6: App Store Submission

### iOS App Store:
1. **Build for production**:
   ```bash
   eas build --profile production --platform ios
   ```

2. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

3. **Required iOS setup**:
   - Apple Developer Account ($99/year)
   - App Store Connect access
   - App icons and screenshots
   - App Store listing information

### Google Play Store:
1. **Build for production**:
   ```bash
   eas build --profile production --platform android
   ```

2. **Submit to Play Store**:
   ```bash
   eas submit --platform android
   ```

3. **Required Android setup**:
   - Google Play Developer Account ($25 one-time)
   - Play Console access
   - App icons and screenshots
   - Play Store listing information

## Step 7: Over-the-Air Updates

After your app is published, you can push updates without going through app stores:

```bash
# Push update to all users
eas update --auto

# Push update to specific channel
eas update --channel production --message "Bug fixes and improvements"
```

## Step 8: Monitoring and Analytics

1. **Expo Dashboard**: Monitor builds, updates, and crashes at [expo.dev](https://expo.dev)
2. **EAS Insights**: Track app performance and user engagement
3. **Crash Reporting**: Automatic crash reporting through Expo

## Important Notes

### Backend Deployment
Make sure your FastAPI backend is deployed and accessible before building production apps:
- Deploy to services like Railway, Render, or AWS
- Update `EXPO_PUBLIC_API_URL` with your production backend URL
- Ensure CORS is properly configured for your app

### Audio Playback
- Test audio functionality thoroughly on real devices
- Ensure ElevenLabs API is working in production
- Test background audio playback permissions

### Supabase Configuration
- Verify Supabase project is in production mode
- Check Row Level Security policies
- Ensure authentication flows work correctly

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check `eas.json` configuration
   - Verify all dependencies are compatible
   - Check build logs in EAS dashboard

2. **Environment Variables**:
   - Ensure all required variables are set
   - Use `eas secret:list` to verify secrets
   - Check `app.config.js` extra configuration

3. **Audio Issues**:
   - Test on real devices, not simulators
   - Check audio permissions
   - Verify backend API connectivity

4. **Authentication Issues**:
   - Verify Supabase configuration
   - Check redirect URLs in Supabase dashboard
   - Test OAuth flows on real devices

## Next Steps

1. **Set up CI/CD**: Automate builds using GitHub Actions
2. **Add Analytics**: Integrate analytics for user behavior tracking
3. **Performance Monitoring**: Set up performance monitoring tools
4. **User Feedback**: Implement in-app feedback collection

For more detailed information, visit the [Expo Documentation](https://docs.expo.dev/).