/**
 * Modal Screen Example
 *
 * Demonstrates using SDK components (ThemedView, ThemedText)
 * to build custom screens that automatically adapt to the theme.
 */
import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText, ThemedView, useTheme } from 'bot-sdk';

export default function ModalScreen() {
  const { brandColors, spacing } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Acme Health Modal</ThemedText>

      <ThemedText style={{ marginTop: spacing.lg, textAlign: 'center' }}>
        This modal demonstrates using SDK themed components.
        The text and background colors automatically adapt to
        light/dark mode.
      </ThemedText>

      <ThemedView
        lightColor="#F5F5F5"
        darkColor="#2D2D2D"
        style={[styles.card, { marginTop: spacing.xl }]}
      >
        <ThemedText type="defaultSemiBold">Themed Card</ThemedText>
        <ThemedText style={{ marginTop: spacing.sm }}>
          This card uses lightColor/darkColor overrides for
          a slightly different background than the default.
        </ThemedText>
      </ThemedView>

      <Link href="/(tabs)/chat" dismissTo style={[styles.link, { marginTop: spacing.xl }]}>
        <ThemedText type="link" style={{ color: brandColors.primary }}>
          Return to Chat
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
    maxWidth: 300,
  },
  link: {
    paddingVertical: 15,
  },
});
