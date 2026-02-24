import { BaseWebViewScreen, BaseWebViewScreenProps } from '../base/BaseWebViewScreen';
import { useBotUrls } from '../../provider/BotProvider';

export type DonationsScreenProps = Omit<BaseWebViewScreenProps, 'url'> & {
  /** Override the donations URL */
  url?: string;
};

/**
 * Pre-configured donations screen using the configured donations URL.
 *
 * @example
 * ```tsx
 * // In your app/(tabs)/donations.tsx
 * import { DonationsScreen } from 'bot-sdk/screens';
 * export default DonationsScreen;
 *
 * // Or with customization
 * export default function Donations() {
 *   return <DonationsScreen renderHeader={() => <Header title="Support Us" />} />;
 * }
 * ```
 */
export function DonationsScreen({ url, ...props }: DonationsScreenProps) {
  const urls = useBotUrls();
  const donationUrl = url ?? urls.webView.donations;

  return <BaseWebViewScreen url={donationUrl} {...props} />;
}
