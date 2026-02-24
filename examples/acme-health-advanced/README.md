# Acme Health Pro - Advanced Example

This example demonstrates advanced SDK usage patterns for production apps.

## Features Shown

### Base Screen Customization
- `app/(tabs)/chat.tsx` - Uses `BaseChatScreen` with custom header/footer
- `app/(tabs)/settings.tsx` - Uses `BaseSettingsScreen` with render slots

### Custom Components
- `components/HealthHeader.tsx` - Custom branded header
- `components/HealthDisclaimer.tsx` - Custom disclaimer component

### Production Auth
- `app/_layout.tsx` - Shows how to implement custom auth handlers

### Full Theme Control
- `config/bot.config.ts` - Complete semantic color customization

## Key Patterns

### Render Slots
```typescript
<BaseSettingsScreen
  beforeLogout={<DangerZone />}
  additionalSections={[
    { id: 'notifications', title: 'Notifications', render: () => <NotificationPreferences /> },
  ]}
/>
```

### Custom Auth Handlers
```typescript
<BotProvider
  config={botConfig}
  authHandlers={{
    onLogin: async (email, password) => {
      const result = await yourAPI.login(email, password);
      return result.success ? { token: result.token, user: result.user } : null;
    },
  }}
>
```

### Using Theme Hooks
```typescript
const { colors, brandColors, spacing, borderRadius, isDark } = useTheme();
```

## Running

```bash
npm install
npx expo start
```

## Production Checklist

- [ ] Replace mock API with real backend
- [ ] Configure proper auth handlers
- [ ] Update all URLs in config
- [ ] Replace placeholder assets
- [ ] Configure push notifications
- [ ] Set up analytics
