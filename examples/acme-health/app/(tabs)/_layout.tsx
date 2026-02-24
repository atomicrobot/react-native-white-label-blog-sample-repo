/**
 * Tab Layout - Acme Health Example
 *
 * Configures the bottom tab navigation using SDK components.
 * Demonstrates using useTheme and useAuth hooks.
 */
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import { HapticTab, IconSymbol, useTheme, useAuth } from 'bot-sdk';

export default function TabLayout() {
  const { colors } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to onboarding if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/onboarding');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="message.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="donations"
        options={{
          title: 'Donate',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="showcase"
        options={{
          title: 'Showcase',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paintpalette.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
