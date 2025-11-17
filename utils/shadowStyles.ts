import { Platform, ViewStyle } from 'react-native';

/**
 * Creates shadow styles compatible with both web and native
 * On web, uses boxShadow; on native, uses shadow* props
 */
export function createShadowStyle(
  shadowColor: string = '#000',
  shadowOffset: { width: number; height: number } = { width: 0, height: 2 },
  shadowOpacity: number = 0.1,
  shadowRadius: number = 4,
  elevation: number = 3
): ViewStyle {
  if (Platform.OS === 'web') {
    const { width, height } = shadowOffset;
    const blur = shadowRadius;
    const spread = 0;
    const color = shadowColor + Math.round(shadowOpacity * 255).toString(16).padStart(2, '0');
    
    return {
      boxShadow: `${width}px ${height}px ${blur}px ${spread}px ${color}`,
    };
  }
  
  return {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
  };
}

