import 'dotenv/config';

export default {
  expo: {
    name: "Threadist",
    slug: "threadist",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo/logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/logo/logo.png",
      resizeMode: "contain",
      backgroundColor: "#032330"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.threadist.app",
      buildNumber: "1"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo/logo.png",
        backgroundColor: "#032330"
      },
      package: "com.threadist.app",
      versionCode: 1,
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/logo/logo.png",
      bundler: "metro"
    },
    scheme: "threadist",
    plugins: [
      "expo-av",
      "expo-linear-gradient"
    ],
    extra: {
      eas: {
        projectId: process.env.EXPO_PROJECT_ID || "your-project-id-here"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      apiUrl: process.env.EXPO_PUBLIC_API_URL
    },
    updates: {
      url: "https://u.expo.dev/your-project-id-here"
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
  }
};