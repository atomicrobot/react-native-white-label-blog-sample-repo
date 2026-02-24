# Acme Health - Basic Example

This example demonstrates the simplest way to use the Bot SDK.

## Features Shown

- **Preset Screens**: All screens use the zero-config preset pattern
- **Minimal Configuration**: Just brand colors and basic URLs
- **Demo Auth**: Auth always succeeds (no backend required)

## Key Files

- `config/bot.config.ts` - SDK configuration
- `app/_layout.tsx` - Root layout with BotProvider
- `app/(tabs)/*.tsx` - Tab screens using preset pattern

## Running

```bash
npm install
npx expo start
```

## Customizing

1. Edit `config/bot.config.ts` to change brand colors
2. Update `app.json` with your app metadata
3. Replace assets in `assets/` folder

## Next Steps

See the `acme-health-advanced` example for:
- Base screen customization
- Render slots pattern
- Custom components
- Production auth handlers
