/**
 * Acme Health - SDK Configuration
 *
 * This is an example configuration for the "Acme Health" brand.
 * Demonstrates how a client would configure their white-labeled app.
 *
 * Referenced in the blog series:
 * - Part 1: The Big Picture
 * - Part 4: Configuration Architecture
 */

import { BotConfig } from 'bot-sdk';

const botConfig: BotConfig = {
  // Required: Your app's name
  appName: 'Acme Health',

  // Theme customization - Acme Health uses a teal color palette
  theme: {
    brandColors: {
      // Primary vibrant pink - used for main actions, links, active states
      primary: '#E91E63',
      // Secondary deep purple
      secondary: '#9C27B0',
      // Accent color for highlights
      accent: '#FF5722',
      // Standard destructive red
      destructive: '#D32F2F',
      // Warning amber
      warning: '#FF8F00',
      // Success green
      success: '#2E7D32',
    },
    colors: {
      light: {
        text: '#1A1A2E',
        textSecondary: '#4A4A68',
        textTertiary: '#8888A0',
      },
      dark: {
        text: '#F0E6F6',
        textSecondary: '#B8A9C8',
        textTertiary: '#7A6B8A',
      },
    },
  },

  // URL configuration
  urls: {
    base: {
      website: 'https://acmehealth.example.com',
      api: 'https://api.acmehealth.example.com',
    },
    webView: {
      donations: 'https://acmehealth.example.com/donate',
      volunteer: 'https://acmehealth.example.com/volunteer',
    },
    legal: {
      privacyPolicy: 'https://acmehealth.example.com/privacy',
      termsAndConditions: 'https://acmehealth.example.com/terms',
    },
    media: {
      // Demo video stream for the chat screen
      defaultVideoStream: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    },
    social: {
      facebook: 'https://facebook.com/acmehealth',
      twitter: 'https://twitter.com/acmehealth',
      instagram: 'https://instagram.com/acmehealth',
      linkedin: 'https://linkedin.com/company/acmehealth',
      youtube: '',
    },
    support: {
      helpCenter: 'https://acmehealth.example.com/help',
      contactUs: 'https://acmehealth.example.com/contact',
      supportEmail: 'mailto:support@acmehealth.example.com',
    },
    appStore: {
      appStore: '',
      playStore: '',
    },
  },

  // Feature flags - enable/disable app features
  features: {
    enableHaptics: true,
    enableChat: true,
    enableDonations: true,
    enableVolunteer: true,
    enableFeed: true,
    enableProfile: true,
  },

  // Auth configuration
  auth: {
    storageKeyPrefix: '@acmehealth',
  },

  // Screen-specific configuration
  screens: {
    onboarding: {
      loginTitle: 'Welcome to Acme Health',
      loginSubtitle: 'Sign in to access your health dashboard',
      signupTitle: 'Join Acme Health',
      signupSubtitle: 'Create your account to get started',
    },
    settings: {
      showProfile: true,
      showLegal: true,
      showLogout: true,
    },
    chat: {
      placeholder: 'Ask a health question...',
      enableVoiceInput: true,
    },
    feed: {
      enablePolls: true,
      enableComments: true,
      enableSharing: true,
    },
  },
};

export default botConfig;
