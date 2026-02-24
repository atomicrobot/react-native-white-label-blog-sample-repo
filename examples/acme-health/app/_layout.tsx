/**
 * Root Layout - Acme Health Example
 *
 * Wraps the app with BotProvider and sets up navigation.
 * Demonstrates the minimal setup required to use the SDK.
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

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();

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
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="profile" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  // For demo mode, no auth handlers are needed - login always succeeds.
  // For production, uncomment and implement the authHandlers:
  //
  // const authHandlers = {
  //   onLogin: async (email: string, password: string) => {
  //     const response = await yourAPI.login(email, password);
  //     if (!response.success) return null;
  //     return { token: response.token, user: response.user };
  //   },
  //   onSignup: async (email: string, password: string, name: string) => {
  //     const response = await yourAPI.signup(email, password, name);
  //     if (!response.success) return null;
  //     return { token: response.token, user: response.user };
  //   },
  //   onLogout: async () => {
  //     await yourAPI.logout();
  //   },
  // };

  return (
    <BotProvider config={botConfig}>
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
