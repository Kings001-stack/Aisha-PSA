import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  gradient?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  fullWidth = false,
  loading = false,
  gradient = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 200,
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });
  };

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!disabled && !loading) {
      onPress();
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`]];
    
    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (disabled) baseStyle.push(styles.disabled);
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryButton];
      case 'secondary':
        return [...baseStyle, styles.secondaryButton];
      case 'outline':
        return [...baseStyle, styles.outlineButton];
      case 'ghost':
        return [...baseStyle, styles.ghostButton];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText, styles[`buttonText${size.charAt(0).toUpperCase() + size.slice(1)}`]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryText];
      case 'secondary':
        return [...baseStyle, styles.secondaryText];
      case 'outline':
        return [...baseStyle, styles.outlineText];
      case 'ghost':
        return [...baseStyle, styles.ghostText];
      default:
        return baseStyle;
    }
  };

  const buttonContent = (
    <View style={styles.buttonContent}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={getTextStyle()}>{loading ? 'Loading...' : title}</Text>
    </View>
  );

  if (gradient && variant === 'primary' && !disabled) {
    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[animatedStyle, fullWidth && styles.fullWidth]}
        disabled={disabled || loading}>
        <LinearGradient
          colors={['#D4AF37', '#F4D03F', '#D4AF37']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={getButtonStyle()}>
          {buttonContent}
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[getButtonStyle(), animatedStyle]}
      disabled={disabled || loading}>
      {buttonContent}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  primaryButton: {
    backgroundColor: '#D4AF37',
  },
  secondaryButton: {
    backgroundColor: '#1A1A1A',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: '600',
  },
  buttonTextSmall: {
    fontSize: 14,
  },
  buttonTextMedium: {
    fontSize: 16,
  },
  buttonTextLarge: {
    fontSize: 18,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#D4AF37',
  },
  ghostText: {
    color: '#1A1A1A',
  },
});
