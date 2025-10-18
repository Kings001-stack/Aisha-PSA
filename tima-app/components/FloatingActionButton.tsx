import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, MessageCircle, Phone, Mail, X } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface FABProps {
  onWhatsApp?: () => void;
  onCall?: () => void;
  onEmail?: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  onWhatsApp,
  onCall,
  onEmail,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const option1 = useSharedValue(0);
  const option2 = useSharedValue(0);
  const option3 = useSharedValue(0);

  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const newState = !isOpen;
    setIsOpen(newState);

    rotation.value = withSpring(newState ? 45 : 0);
    
    if (newState) {
      option1.value = withSpring(1, { damping: 15 });
      option2.value = withSpring(1, { damping: 15 });
      option3.value = withSpring(1, { damping: 15 });
    } else {
      option1.value = withTiming(0, { duration: 200 });
      option2.value = withTiming(0, { duration: 200 });
      option3.value = withTiming(0, { duration: 200 });
    }
  };

  const mainButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const option1Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      option1.value,
      [0, 1],
      [0, -70],
      Extrapolate.CLAMP
    );
    
    return {
      opacity: option1.value,
      transform: [
        { translateY },
        { scale: option1.value },
      ],
    };
  });

  const option2Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      option2.value,
      [0, 1],
      [0, -140],
      Extrapolate.CLAMP
    );
    
    return {
      opacity: option2.value,
      transform: [
        { translateY },
        { scale: option2.value },
      ],
    };
  });

  const option3Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      option3.value,
      [0, 1],
      [0, -210],
      Extrapolate.CLAMP
    );
    
    return {
      opacity: option3.value,
      transform: [
        { translateY },
        { scale: option3.value },
      ],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handleOptionPress = (action?: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (action) action();
    toggleMenu();
  };

  return (
    <View style={styles.container}>
      {/* Backdrop */}
      {isOpen && (
        <Pressable 
          style={styles.backdrop} 
          onPress={toggleMenu} 
        />
      )}

      {/* Email Option */}
      <Animated.View style={[styles.optionButton, option3Style]}>
        <AnimatedPressable
          onPress={() => handleOptionPress(onEmail)}
          style={styles.optionPressable}>
          <LinearGradient
            colors={['#FF9500', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionCircle}>
            <Mail size={24} color="#FFFFFF" strokeWidth={2} />
          </LinearGradient>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Email</Text>
          </View>
        </AnimatedPressable>
      </Animated.View>

      {/* Call Option */}
      <Animated.View style={[styles.optionButton, option2Style]}>
        <AnimatedPressable
          onPress={() => handleOptionPress(onCall)}
          style={styles.optionPressable}>
          <LinearGradient
            colors={['#007AFF', '#0055D4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionCircle}>
            <Phone size={24} color="#FFFFFF" strokeWidth={2} />
          </LinearGradient>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Call Us</Text>
          </View>
        </AnimatedPressable>
      </Animated.View>

      {/* WhatsApp Option */}
      <Animated.View style={[styles.optionButton, option1Style]}>
        <AnimatedPressable
          onPress={() => handleOptionPress(onWhatsApp)}
          style={styles.optionPressable}>
          <LinearGradient
            colors={['#25D366', '#20C659']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionCircle}>
            <MessageCircle size={24} color="#FFFFFF" strokeWidth={2} />
          </LinearGradient>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>WhatsApp</Text>
          </View>
        </AnimatedPressable>
      </Animated.View>

      {/* Main FAB */}
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={toggleMenu}
        style={[styles.mainButton, mainButtonStyle]}>
        <LinearGradient
          colors={['#D4AF37', '#F4D03F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mainButtonGradient}>
          {isOpen ? (
            <X size={28} color="#FFFFFF" strokeWidth={2.5} />
          ) : (
            <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
          )}
        </LinearGradient>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    alignItems: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    elevation: 8,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  mainButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionPressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  labelContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
