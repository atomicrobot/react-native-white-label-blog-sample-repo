import React from 'react';
import { BaseFeedScreen, BaseFeedScreenProps } from '../base/BaseFeedScreen';

/**
 * FeedScreen - Pre-configured social feed screen
 *
 * Uses SDK configuration for polls, comments, and sharing settings.
 * Ready to use out of the box with demo data.
 *
 * @example
 * ```tsx
 * // In your app/(tabs)/feed.tsx
 * export { FeedScreen as default } from 'bot-sdk/screens';
 * ```
 */
export function FeedScreen(props: Partial<BaseFeedScreenProps>) {
  return (
    <BaseFeedScreen
      title="Feed"
      enablePolls={true}
      enableComments={true}
      enableSharing={true}
      enableLikes={true}
      {...props}
    />
  );
}

export default FeedScreen;
