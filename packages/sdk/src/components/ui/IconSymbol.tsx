// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];
type IconMapping = Record<string, MaterialIconName>;

/**
 * SF Symbol to Material Icon mapping.
 * Add additional mappings as needed.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'message.fill': 'message',
  'heart.fill': 'favorite',
  'list.bullet': 'list',
  'info.circle.fill': 'info',
  'gearshape.fill': 'settings',
  'mic.fill': 'mic',
  'person.fill': 'person',
  'person.circle.fill': 'account-circle',
  'xmark': 'close',
  'plus': 'add',
  'minus': 'remove',
  'checkmark': 'check',
  'magnifyingglass': 'search',
  'bell.fill': 'notifications',
  'calendar': 'calendar-today',
  'photo.fill': 'photo',
  'camera.fill': 'camera-alt',
  'lock.fill': 'lock',
  'envelope.fill': 'email',
  'phone.fill': 'phone',
  'location.fill': 'location-on',
  'star.fill': 'star',
  'trash.fill': 'delete',
  'pencil': 'edit',
  'square.and.arrow.up': 'share',
  'arrow.right': 'arrow-forward',
  'arrow.left': 'arrow-back',
};

export type IconSymbolName = keyof typeof MAPPING | SymbolViewProps['name'];

export interface IconSymbolProps {
  /** Icon name (SF Symbol name) */
  name: IconSymbolName;
  /** Icon size in pixels (default: 24) */
  size?: number;
  /** Icon color */
  color: string | OpaqueColorValue;
  /** Additional styles */
  style?: StyleProp<TextStyle>;
  /** Icon weight (iOS only) */
  weight?: SymbolWeight;
}

/**
 * Cross-platform icon component.
 *
 * Uses SF Symbols on iOS and Material Icons on Android/web.
 * Icon names are based on SF Symbols and are mapped to Material Icons.
 *
 * @example
 * ```tsx
 * <IconSymbol name="house.fill" size={24} color="#000" />
 * <IconSymbol name="gearshape.fill" size={20} color={colors.icon} />
 * ```
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: IconSymbolProps) {
  const materialName = MAPPING[name as string] ?? 'help-outline';
  return <MaterialIcons color={color} size={size} name={materialName} style={style} />;
}
