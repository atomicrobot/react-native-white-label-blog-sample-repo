import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

export type IconSymbolName = SymbolViewProps['name'];

export interface IconSymbolProps {
  /** Icon name (SF Symbol name) */
  name: IconSymbolName;
  /** Icon size in pixels (default: 24) */
  size?: number;
  /** Icon color */
  color: string;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
  /** Icon weight (default: 'regular') */
  weight?: SymbolWeight;
}

/**
 * Native SF Symbol icon component for iOS.
 *
 * Uses native SF Symbols for optimal rendering and performance.
 *
 * @example
 * ```tsx
 * <IconSymbol name="house.fill" size={24} color="#000" />
 * <IconSymbol name="gearshape.fill" size={20} color={colors.icon} weight="medium" />
 * ```
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: IconSymbolProps) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
