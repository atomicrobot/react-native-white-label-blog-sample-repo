# React Native White-Label SDK — Sample Repository

This is a sample repository accompanying the **React Native White Labeling** blog series. It demonstrates how to build production-ready white-label apps with React Native Expo using a complete SDK architecture.

## Blog Series

This repository contains working code examples for each part of the series:

- [Part 1: The Big Picture](./docs/blog-series/react-native-white-labeling-part-1/index.mdx) — Architecture overview and the three pillars of a successful SDK
- [Part 2: Deep Dive into Theming](./docs/blog-series/react-native-white-labeling-part-2/index.mdx) — Design tokens, color schemes, and automatic dark mode
- [Part 3: Building Reusable Components](./docs/blog-series/react-native-white-labeling-part-3/index.mdx) — Themed primitives, override patterns, and composition
- [Part 4: Configuration Architecture](./docs/blog-series/react-native-white-labeling-part-4/index.mdx) — Type-safe config, two-tier screens, and render slots

## Repository Structure

```
sample-repository/
├── packages/
│   └── sdk/                  # The white-label SDK (bot-sdk)
│       ├── src/
│       │   ├── components/   # Themed UI components
│       │   ├── contexts/     # Auth context
│       │   ├── hooks/        # Theme and color hooks
│       │   ├── provider/     # BotProvider
│       │   ├── screens/      # Base and preset screens
│       │   ├── tokens/       # Design tokens
│       │   └── types/        # TypeScript interfaces
│       └── package.json
│
├── examples/
│   ├── acme-health/          # Basic example implementation
│   └── acme-health-advanced/ # Advanced example with customizations
│
└── docs/
    └── blog-series/          # Blog post series
```

## Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install example app dependencies
cd examples/acme-health
npm install
```

### 2. Run the Example App

```bash
cd examples/acme-health

# iOS
npx expo run:ios

# Android
npx expo run:android

# Web
npx expo start --web
```

### Switching Between Examples

This monorepo contains two example apps. Because they share the same `expo-router` package from root `node_modules`, Metro's transform cache can cause the wrong app to load. Each example has a unique `cacheVersion` in its `metro.config.js` to prevent this, but you must stop the previous Metro instance before starting a new one:

```bash
# 1. Stop the running Metro process (Ctrl+C in its terminal), or kill it:
lsof -ti:8081 | xargs kill -9 2>/dev/null

# 2. If this is your first time switching, clear existing Metro caches:
rm -rf $TMPDIR/metro-* /tmp/metro-*

# 3. Navigate to the example you want and run it:
cd examples/acme-health
npx expo run:ios
```

After the initial cache clear, switching only requires stopping Metro (step 1) and running from the other directory (step 3).

### 3. Customize for Your Brand

Edit `examples/acme-health/config/bot.config.ts`:

```typescript
const botConfig: BotConfig = {
  appName: "Your App Name",
  theme: {
    brandColors: {
      primary: "#YOUR_COLOR", // Change this!
    },
  },
  // ... rest of config
};
```

## SDK Features

### Theming System

The SDK provides a complete theming system:

- **Brand Colors**: Primary, secondary, accent, destructive, warning, success
- **Semantic Colors**: Automatic light/dark mode colors for text, background, surface, etc.
- **Design Tokens**: Spacing, border radius, typography scales

```typescript
import { useTheme } from 'bot-sdk';

function MyComponent() {
  const { colors, brandColors, spacing, isDark } = useTheme();

  return (
    <View style={{
      backgroundColor: colors.surface,
      padding: spacing.lg
    }}>
      <Text style={{ color: colors.text }}>Hello!</Text>
    </View>
  );
}
```

### Themed Components

Pre-built components that adapt to any brand:

```typescript
import { ThemedText, ThemedView } from 'bot-sdk';

<ThemedView style={styles.container}>
  <ThemedText type="title">Welcome</ThemedText>
  <ThemedText type="link" onPress={handlePress}>Learn more</ThemedText>
</ThemedView>
```

### Two-Tier Screens

**Preset Screens** - Zero configuration needed:

```typescript
// One-liner screen setup
export { ChatScreen as default } from "bot-sdk/screens";
```

**Base Screens** - Full customization:

```typescript
import { BaseChatScreen } from 'bot-sdk/screens';

export default function CustomChatScreen() {
  return (
    <BaseChatScreen
      onSubmitQuestion={handleQuestion}
      headerContent={<BrandedHeader />}
      footerContent={<Disclaimer />}
    />
  );
}
```

### Authentication

Demo mode out-of-the-box, production-ready with custom handlers:

```typescript
<BotProvider
  config={botConfig}
  authHandlers={{
    onLogin: async (email, password) => {
      const result = await yourAPI.login(email, password);
      return result.success ? { token: result.token, user: result.user } : null;
    },
    onSignup: async (email, password, name) => {
      const result = await yourAPI.signup(email, password, name);
      return result.success ? { token: result.token, user: result.user } : null;
    },
    onLogout: async () => {
      await yourAPI.logout();
    },
  }}
>
  <App />
</BotProvider>
```

## Configuration Reference

See `examples/acme-health/config/bot.config.ts` for a complete configuration example.

| Section             | Description                           |
| ------------------- | ------------------------------------- |
| `appName`           | App name displayed in UI              |
| `theme.brandColors` | Primary, secondary, accent colors     |
| `theme.colors`      | Light/dark semantic color overrides   |
| `urls`              | API, webview, legal, social URLs      |
| `features`          | Feature flags (chat, donations, etc.) |
| `screens`           | Screen-specific configuration         |

## Creating a New Client App

1. Copy `examples/acme-health` to a new directory
2. Update `config/bot.config.ts` with client's branding
3. Replace assets (icons, splash screens)
4. Update `app.json` with client's app metadata
5. Deploy!

## Requirements

- Node.js 18+
- Expo SDK 50+
- React Native 0.73+

## License

MIT
