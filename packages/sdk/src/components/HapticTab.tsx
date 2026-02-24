import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export type HapticTabProps = BottomTabBarButtonProps & {
  /** Whether haptic feedback is enabled (default: true) */
  enableHaptics?: boolean;
};

/**
 * A tab bar button with haptic feedback on iOS.
 *
 * Use this as the `tabBarButton` prop in your tab navigator options.
 *
 * @example
 * ```tsx
 * <Tabs.Screen
 *   name="home"
 *   options={{
 *     tabBarButton: (props) => <HapticTab {...props} />,
 *   }}
 * />
 * ```
 */
export function HapticTab({ enableHaptics = true, ...props }: HapticTabProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (enableHaptics && Platform.OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
