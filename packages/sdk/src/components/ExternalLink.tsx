import { Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type LinkProps = ComponentProps<typeof Link>;

export type ExternalLinkProps = Omit<LinkProps, 'href'> & {
  /** The URL to open */
  href: string;
};

/**
 * A link component for opening external URLs.
 *
 * On web, opens in a new tab. On native, opens in an in-app browser.
 *
 * @example
 * ```tsx
 * <ExternalLink href="https://example.com">
 *   Visit Example
 * </ExternalLink>
 * ```
 */
export function ExternalLink({ href, ...rest }: ExternalLinkProps) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as LinkProps['href']}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
