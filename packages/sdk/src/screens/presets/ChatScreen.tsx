import React from 'react';
import { BaseChatScreen, BaseChatScreenProps } from '../base/BaseChatScreen';

/**
 * ChatScreen - Pre-configured video chat screen
 *
 * Uses SDK configuration for video source and placeholder text.
 * Ready to use out of the box.
 *
 * @example
 * ```tsx
 * // In your app/(tabs)/chat.tsx
 * export { ChatScreen as default } from 'bot-sdk/screens';
 * ```
 */
export function ChatScreen(props: Partial<BaseChatScreenProps>) {
  return (
    <BaseChatScreen
      enableVoiceInput={true}
      autoPlay={true}
      loopVideo={true}
      {...props}
    />
  );
}

export default ChatScreen;
