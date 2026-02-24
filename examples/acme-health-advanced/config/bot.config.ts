/**
 * Acme Health Advanced - SDK Configuration
 *
 * This example demonstrates full configuration with semantic color overrides.
 * See the basic example (examples/acme-health) for a simpler starting point.
 */

import { BotConfig } from 'bot-sdk';

const botConfig: BotConfig = {
  appName: 'Acme Health Pro',

  theme: {
    // Brand colors - the foundation
    brandColors: {
      primary: '#00796B',
      secondary: '#004D40',
      accent: '#26A69A',
      destructive: '#D32F2F',
      warning: '#F57C00',
      success: '#388E3C',
    },

    // Full semantic color customization
    colors: {
      light: {
        // Text hierarchy
        text: '#1A1A1A',
        textSecondary: '#5C5C5C',
        textTertiary: '#8C8C8C',
        textInverse: '#FFFFFF',

        // Backgrounds with subtle teal tint
        background: '#F8FAFA',
        backgroundSecondary: '#F0F4F4',
        backgroundTertiary: '#E8EEEE',

        // Surfaces
        surface: '#FFFFFF',
        surfaceSecondary: '#F5F8F8',

        // Borders
        border: '#D0D8D8',
        borderSecondary: '#B8C4C4',

        // Input fields
        inputBackground: '#FFFFFF',
        inputBorder: '#C8D4D4',
        placeholder: '#8C9C9C',
      },
      dark: {
        // Text hierarchy
        text: '#F0F4F4',
        textSecondary: '#A8B4B4',
        textTertiary: '#6C7C7C',
        textInverse: '#1A1A1A',

        // Dark backgrounds with subtle teal
        background: '#0A1414',
        backgroundSecondary: '#101C1C',
        backgroundTertiary: '#1C2828',

        // Surfaces
        surface: '#1C2828',
        surfaceSecondary: '#243030',

        // Borders
        border: '#2C3C3C',
        borderSecondary: '#344444',

        // Input fields
        inputBackground: '#1C2828',
        inputBorder: '#2C3C3C',
        placeholder: '#6C7C7C',
      },
    },

    // Custom spacing scale
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
      xxxl: 64,
      huge: 96,
    },

    // Rounded corners for a friendlier feel
    borderRadius: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
      full: 9999,
    },
  },

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
  },

  features: {
    enableHaptics: true,
    enableChat: true,
    enableDonations: true,
    enableVolunteer: true,
    enableFeed: true,
    enableProfile: true,
    // Custom feature flags
    enableTelemedicine: true,
    enableAppointments: true,
  },

  auth: {
    storageKeyPrefix: '@acmehealth_pro',
  },

  screens: {
    onboarding: {
      loginTitle: 'Welcome to Acme Health Pro',
      loginSubtitle: 'Your complete health management platform',
      signupTitle: 'Join Acme Health Pro',
      signupSubtitle: 'Create your account to access all features',
    },
    chat: {
      placeholder: 'Ask your health assistant...',
      enableVoiceInput: true,
    },
    feed: {
      enablePolls: true,
      enableComments: true,
      enableSharing: true,
    },
    settings: {
      showProfile: true,
      showLegal: true,
      showLogout: true,
    },
  },
};

export default botConfig;
