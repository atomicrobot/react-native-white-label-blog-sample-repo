import { BaseWebViewScreen, BaseWebViewScreenProps } from '../base/BaseWebViewScreen';
import { useBotUrls } from '../../provider/BotProvider';

export type VolunteerScreenProps = Omit<BaseWebViewScreenProps, 'url'> & {
  /** Override the volunteer URL */
  url?: string;
};

/**
 * Pre-configured volunteer screen using the configured volunteer URL.
 *
 * @example
 * ```tsx
 * // In your app/(tabs)/volunteer.tsx
 * import { VolunteerScreen } from 'bot-sdk/screens';
 * export default VolunteerScreen;
 * ```
 */
export function VolunteerScreen({ url, ...props }: VolunteerScreenProps) {
  const urls = useBotUrls();
  const volunteerUrl = url ?? urls.webView.volunteer;

  return <BaseWebViewScreen url={volunteerUrl} {...props} />;
}
