import { BaseOnboardingScreen, BaseOnboardingScreenProps } from '../base/BaseOnboardingScreen';

export type OnboardingScreenProps = BaseOnboardingScreenProps;

/**
 * Pre-configured onboarding screen with sensible defaults.
 *
 * @example
 * ```tsx
 * // In your app/onboarding.tsx
 * import { OnboardingScreen } from 'bot-sdk/screens';
 * export default OnboardingScreen;
 *
 * // Or with branding
 * export default function Onboarding() {
 *   return (
 *     <OnboardingScreen
 *       headerContent={<Logo />}
 *       loginTitle="Welcome to MyApp"
 *     />
 *   );
 * }
 * ```
 */
export function OnboardingScreen(props: OnboardingScreenProps) {
  return <BaseOnboardingScreen {...props} />;
}
