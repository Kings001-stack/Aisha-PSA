import { 
  withTiming, 
  withSpring, 
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

// Animation configurations
export const ANIMATION_CONFIGS = {
  FAST: { duration: 200, easing: Easing.out(Easing.ease) },
  NORMAL: { duration: 300, easing: Easing.out(Easing.ease) },
  SLOW: { duration: 500, easing: Easing.out(Easing.ease) },
  BOUNCE: { 
    damping: 15, 
    stiffness: 150,
    mass: 1,
  },
  GENTLE_BOUNCE: {
    damping: 20,
    stiffness: 100,
    mass: 1,
  },
};

// Fade animations
export const fadeIn = (duration = 300) => {
  return withTiming(1, { duration, easing: Easing.out(Easing.ease) });
};

export const fadeOut = (duration = 300) => {
  return withTiming(0, { duration, easing: Easing.in(Easing.ease) });
};

// Scale animations
export const scaleIn = (toValue = 1, config = ANIMATION_CONFIGS.NORMAL) => {
  return withSpring(toValue, ANIMATION_CONFIGS.BOUNCE);
};

export const scaleOut = (config = ANIMATION_CONFIGS.FAST) => {
  return withTiming(0, config);
};

export const pulseAnimation = () => {
  return withSequence(
    withTiming(1.05, { duration: 150 }),
    withTiming(1, { duration: 150 })
  );
};

// Slide animations
export const slideInFromBottom = (toValue = 0, duration = 400) => {
  return withSpring(toValue, ANIMATION_CONFIGS.GENTLE_BOUNCE);
};

export const slideInFromRight = (toValue = 0, duration = 400) => {
  return withSpring(toValue, ANIMATION_CONFIGS.GENTLE_BOUNCE);
};

export const slideInFromLeft = (toValue = 0, duration = 400) => {
  return withSpring(toValue, ANIMATION_CONFIGS.GENTLE_BOUNCE);
};

// Rotate animations
export const rotateIn = (toValue = 0, duration = 300) => {
  return withTiming(toValue, { duration, easing: Easing.out(Easing.ease) });
};

// Shake animation
export const shakeAnimation = () => {
  return withSequence(
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(-10, { duration: 50 }),
    withTiming(10, { duration: 50 }),
    withTiming(0, { duration: 50 })
  );
};

// Stagger animation helper
export const staggerAnimation = (index: number, delay = 100) => {
  return withDelay(index * delay, withSpring(1, ANIMATION_CONFIGS.GENTLE_BOUNCE));
};

// Button press animation
export const buttonPressAnimation = () => {
  return withSequence(
    withTiming(0.95, { duration: 100 }),
    withTiming(1, { duration: 100 })
  );
};

// Wiggle animation
export const wiggleAnimation = () => {
  return withSequence(
    withTiming(5, { duration: 100 }),
    withTiming(-5, { duration: 100 }),
    withTiming(5, { duration: 100 }),
    withTiming(0, { duration: 100 })
  );
};

// Elastic animation
export const elasticAnimation = (toValue: number) => {
  return withSpring(toValue, {
    damping: 10,
    stiffness: 100,
    mass: 0.5,
  });
};

// Heart beat animation
export const heartBeatAnimation = () => {
  return withSequence(
    withTiming(1.2, { duration: 150 }),
    withTiming(1, { duration: 150 }),
    withTiming(1.2, { duration: 150 }),
    withTiming(1, { duration: 150 })
  );
};
