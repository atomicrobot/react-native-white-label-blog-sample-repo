/**
 * Feed Screen - Custom implementation with additional themed components
 *
 * Demonstrates how brand colors flow through a variety of UI elements:
 * header banner, category chips, stats cards, and post cards.
 */
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText, ThemedView, IconSymbol, useTheme } from 'bot-sdk';
import { BaseFeedScreen } from 'bot-sdk/screens';

const categories = ['All', 'Wellness', 'Nutrition', 'Fitness', 'Mental Health'];

const stats = [
  { label: 'Articles', value: '128', icon: 'list.bullet' as const },
  { label: 'Following', value: '24', icon: 'heart.fill' as const },
  { label: 'Saved', value: '16', icon: 'star.fill' as const },
];

export default function FeedScreen() {
  const { colors, brandColors, spacing, borderRadius, isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const headerContent = (
    <View>
      {/* Branded Hero Banner */}
      <View style={[styles.heroBanner, { backgroundColor: brandColors.primary, padding: spacing.lg }]}>
        <ThemedText type="title" style={{ color: '#FFFFFF', marginBottom: spacing.xs }}>
          Health Feed
        </ThemedText>
        <ThemedText style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>
          Stay informed with the latest health insights
        </ThemedText>
      </View>

      {/* Stats Row */}
      <View style={[styles.statsRow, { padding: spacing.md, gap: spacing.sm }]}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[styles.statCard, {
              backgroundColor: colors.surface,
              borderRadius: borderRadius.md,
              borderWidth: 1,
              borderColor: colors.border,
              padding: spacing.md,
            }]}>
            <IconSymbol name={stat.icon} size={20} color={brandColors.primary} />
            <ThemedText type="defaultSemiBold" style={{ fontSize: 18, marginTop: spacing.xs }}>
              {stat.value}
            </ThemedText>
            <ThemedText style={{ color: colors.textSecondary, fontSize: 12 }}>
              {stat.label}
            </ThemedText>
          </View>
        ))}
      </View>

      {/* Category Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.chipRow, { paddingHorizontal: spacing.lg, gap: spacing.sm }]}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.chip, {
                backgroundColor: isActive ? brandColors.primary : colors.surfaceSecondary,
                borderRadius: borderRadius.full,
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.lg,
                borderWidth: 1,
                borderColor: isActive ? brandColors.primary : colors.border,
              }]}>
              <ThemedText style={{
                color: isActive ? '#FFFFFF' : colors.text,
                fontWeight: isActive ? '600' : '400',
                fontSize: 14,
              }}>
                {cat}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Featured Card */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm }}>
        <View style={[styles.featuredCard, {
          backgroundColor: isDark ? brandColors.primary + '20' : brandColors.primary + '10',
          borderRadius: borderRadius.md,
          padding: spacing.lg,
          borderLeftWidth: 4,
          borderLeftColor: brandColors.primary,
        }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            <IconSymbol name="star.fill" size={16} color={brandColors.primary} />
            <ThemedText style={{ color: brandColors.primary, fontWeight: '600', fontSize: 13, marginLeft: spacing.xs }}>
              FEATURED
            </ThemedText>
          </View>
          <ThemedText type="defaultSemiBold" style={{ marginBottom: spacing.xs }}>
            5 Simple Habits for Better Sleep
          </ThemedText>
          <ThemedText style={{ color: colors.textSecondary, fontSize: 14 }}>
            Research-backed tips from our wellness team to improve your nightly routine.
          </ThemedText>
          <TouchableOpacity style={{ marginTop: spacing.md }}>
            <ThemedText type="link">Read more</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section Divider */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }}>
        <ThemedText type="defaultSemiBold" style={{ color: colors.textSecondary, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
          Latest Posts
        </ThemedText>
      </View>
    </View>
  );

  return (
    <BaseFeedScreen
      hideHeader
      headerContent={headerContent}
      enablePolls={true}
      enableComments={true}
      enableSharing={true}
      enableLikes={true}
    />
  );
}

const styles = StyleSheet.create({
  heroBanner: {
    paddingTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  chipRow: {
    paddingVertical: 4,
  },
  chip: {},
  featuredCard: {},
});
