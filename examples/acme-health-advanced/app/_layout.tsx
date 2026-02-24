/**
 * Root Layout - Acme Health Advanced Example
 *
 * Demonstrates production-ready setup with custom auth handlers.
 */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { BotProvider, useAuth, useColorScheme } from 'bot-sdk';
import botConfig from '../config/bot.config';

// Set the root view background to the brand color so the status bar area matches
SystemUI.setBackgroundColorAsync(botConfig.theme?.brandColors?.primary ?? '#007AFF');

export const unstable_settings = {
  anchor: '(tabs)',
};

// Simulated API calls - replace with your actual API
const mockAPI = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, validate credentials with your backend
    const demoEmail = email || 'demo@example.com';
    return {
      success: true,
      token: `token_${Date.now()}`,
      user: {
        email: demoEmail,
        name: demoEmail.split('@')[0],
        memberSince: new Date().toISOString(),
      },
    };
  },

  signup: async (email: string, password: string, name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const demoEmail = email || 'demo@example.com';
    const demoName = name || 'Demo User';
    return {
      success: true,
      token: `token_${Date.now()}`,
      user: {
        email: demoEmail,
        name: demoName,
        memberSince: new Date().toISOString(),
      },
    };
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Clear any server-side sessions
  },
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={botConfig.theme?.brandColors?.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  // Production auth handlers - connect to your actual API
  const authHandlers = {
    onLogin: async (email: string, password: string) => {
      const result = await mockAPI.login(email, password);
      if (!result.success) return null;
      return { token: result.token!, user: result.user! };
    },
    onSignup: async (email: string, password: string, name: string) => {
      const result = await mockAPI.signup(email, password, name);
      if (!result.success) return null;
      return { token: result.token!, user: result.user! };
    },
    onLogout: mockAPI.logout,
  };

  return (
    <BotProvider config={botConfig} authHandlers={authHandlers}>
      <RootLayoutNav />
    </BotProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
