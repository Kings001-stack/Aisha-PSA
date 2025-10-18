import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const logoScale = useSharedValue(0);
  const logoRotate = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);
  const sparkle3 = useSharedValue(0);
  const gradientPosition = useSharedValue(0);

  useEffect(() => {
    // Logo animation
    logoScale.value = withSequence(
      withSpring(1.2, { damping: 10 }),
      withSpring(1, { damping: 15 })
    );

    logoRotate.value = withSequence(
      withTiming(360, { duration: 1000 }),
      withTiming(0, { duration: 0 })
    );

    // Text animation
    textOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));

    // Sparkles animation
    sparkle1.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0, { duration: 600 })
        ),
        -1,
        false
      )
    );

    sparkle2.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0, { duration: 600 })
        ),
        -1,
        false
      )
    );

    sparkle3.value = withDelay(
      600,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0, { duration: 600 })
        ),
        -1,
        false
      )
    );

    // Gradient animation
    gradientPosition.value = withRepeat(
      withTiming(1, { duration: 2000 }),
      -1,
      true
    );

    // Complete animation
    setTimeout(() => {
      onComplete();
    }, 3000);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: logoScale.value },
        { rotate: `${logoRotate.value}deg` },
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        {
          translateY: interpolate(
            textOpacity.value,
            [0, 1],
            [20, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const sparkle1Style = useAnimatedStyle(() => {
    return {
      opacity: sparkle1.value,
      transform: [
        { scale: sparkle1.value },
        { rotate: `${sparkle1.value * 360}deg` },
      ],
    };
  });

  const sparkle2Style = useAnimatedStyle(() => {
    return {
      opacity: sparkle2.value,
      transform: [
        { scale: sparkle2.value },
        { rotate: `${sparkle2.value * -360}deg` },
      ],
    };
  });

  const sparkle3Style = useAnimatedStyle(() => {
    return {
      opacity: sparkle3.value,
      transform: [
        { scale: sparkle3.value },
        { rotate: `${sparkle3.value * 360}deg` },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedLinearGradient
        colors={['#D4AF37', '#F4D03F', '#D4AF37']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        
        {/* Sparkles */}
        <Animated.View style={[styles.sparkle, styles.sparkle1, sparkle1Style]}>
          <Sparkles size={32} color="#FFFFFF" strokeWidth={1.5} />
        </Animated.View>
        
        <Animated.View style={[styles.sparkle, styles.sparkle2, sparkle2Style]}>
          <Sparkles size={24} color="#FFFFFF" strokeWidth={1.5} />
        </Animated.View>
        
        <Animated.View style={[styles.sparkle, styles.sparkle3, sparkle3Style]}>
          <Sparkles size={28} color="#FFFFFF" strokeWidth={1.5} />
        </Animated.View>

        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logo}>
            <Animated.Text style={styles.logoText}>💎</Animated.Text>
          </View>
        </Animated.View>

        {/* Brand Name */}
        <Animated.View style={textAnimatedStyle}>
          <Animated.Text style={styles.brandText}>
            Shop with Tima
          </Animated.Text>
          <Animated.Text style={styles.tagline}>
            Luxury Jewelry Collection
          </Animated.Text>
        </Animated.View>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingFill,
                {
                  width: `${100}%`,
                },
              ]} 
            />
          </View>
        </View>
      </AnimatedLinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: '20%',
    left: '15%',
  },
  sparkle2: {
    top: '30%',
    right: '20%',
  },
  sparkle3: {
    bottom: '25%',
    left: '25%',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logoText: {
    fontSize: 64,
  },
  brandText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.95,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 60,
    width: width * 0.6,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});
