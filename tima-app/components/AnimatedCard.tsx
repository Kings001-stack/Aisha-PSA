import React, { useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  onPress?: () => void;
  style?: any;
  index?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  onPress,
  style,
  index = 0,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const pressed = useSharedValue(0);

  useEffect(() => {
    const animationDelay = index * 100 + delay;
    
    setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    }, animationDelay);
  }, [index, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(
      pressed.value,
      [0, 1],
      [scale.value, scale.value * 0.95],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity.value,
      transform: [
        { scale: scaleValue },
        { translateY: translateY.value },
      ],
    };
  });

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 100 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 100 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onPress) onPress();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={!onPress}>
      <Animated.View style={[styles.card, animatedStyle, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
