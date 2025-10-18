import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Phone, MessageCircle, Heart, ShoppingBag, Settings, CircleHelp as HelpCircle, Shield, Star, LogOut, ChevronRight, Sparkles, LogIn, UserPlus } from 'lucide-react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  ZoomIn,
  SlideInRight,
  BounceIn,
  FlipInXUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { supabase } from '@/lib/supabase';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function ProfileScreen() {
  const { user, profile, loading } = useAuth();
  const handleCall = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const phoneNumber = '+2348012345678';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const phoneNumber = '+2348012345678';
    const message = 'Hello, I need help with Shop with Tima';
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
  };

  const handleLogout = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: async () => {
          try {
            await authService.signOut();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Signed Out', 'You have been signed out successfully');
          } catch (error) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'Could not sign out. Please try again.');
          }
        }},
      ]
    );
  };

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/auth/login');
  };

  const handleSignup = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/auth/signup');
  };

  const menuItems = [
    {
      title: 'My Orders',
      icon: ShoppingBag,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/orders');
      },
      badge: '3',
      gradient: ['#FF6B6B', '#FF8E53'] as const,
    },
    {
      title: 'My Wishlist',
      icon: Heart,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/(tabs)/wishlist');
      },
      badge: null,
      gradient: ['#FF6B9D', '#C44569'] as const,
    },
    {
      title: 'Account Settings',
      icon: Settings,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/settings');
      },
      badge: null,
      gradient: ['#4FACFE', '#00F2FE'] as const,
    },
    {
      title: 'Help Center',
      icon: HelpCircle,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/help');
      },
      badge: null,
      gradient: ['#43E97B', '#38F9D7'] as const,
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/privacy');
      },
      badge: null,
      gradient: ['#FA709A', '#FEE140'] as const,
    },
    {
      title: 'Rate Us',
      icon: Star,
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
      badge: null,
      gradient: ['#FFD89B', '#19547B'] as const,
    },
  ];

  const AnimatedMenuItem = ({ item, index }: { item: typeof menuItems[0]; index: number }) => {
    return (
      <Animated.View entering={SlideInRight.delay(index * 100).springify().damping(15)}>
        <Pressable
          onPress={item.onPress}
          style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.menuIconContainer}>
            <item.icon size={20} color="#FFFFFF" strokeWidth={1.5} />
          </LinearGradient>
          <Text style={styles.menuItemText}>{item.title}</Text>
        </View>
        <View style={styles.menuItemRight}>
          {item.badge && (
            <Animated.View 
              entering={ZoomIn.delay((index * 100) + 200).springify()}
              style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </Animated.View>
          )}
          <ChevronRight size={20} color="#8E8E93" strokeWidth={1.5} />
        </View>
        </Pressable>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={{ marginTop: 16, color: '#8E8E93' }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Animated Header with Gradient */}
        <Animated.View 
          entering={FadeInDown.duration(800).springify()}
          style={styles.headerWrapper}>
          <LinearGradient
            colors={['#D4AF37', '#F4D03F', '#D4AF37'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}>
            <Animated.View 
              entering={ZoomIn.delay(200).springify().damping(15)}
              style={styles.profileAvatarWrapper}>
              {user && profile?.avatar_url ? (
                <View style={styles.profileAvatarFrame}>
                  <Image 
                    source={{ uri: profile.avatar_url }} 
                    style={styles.profileAvatarImage}
                  />
                </View>
              ) : (
                <View style={styles.profileAvatar}>
                  <User size={36} color="#D4AF37" strokeWidth={1.5} />
                </View>
              )}
            </Animated.View>
            <Animated.View 
              entering={FadeIn.delay(400)}
              style={styles.profileInfo}>
              {user ? (
                <>
                  <Text style={styles.profileName}>{profile?.full_name || 'Welcome Back!'} ✨</Text>
                  <Text style={styles.profileEmail}>{user.email}</Text>
                  <TouchableOpacity 
                    style={styles.editProfileButton}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.push('/edit-profile');
                    }}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                    <Sparkles size={14} color="#FFFFFF" strokeWidth={1.5} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.profileName}>Welcome to Shop with Tima! 💎</Text>
                  <Text style={styles.profileEmail}>Sign in to save your preferences</Text>
                  <View style={styles.authButtonsContainer}>
                    <TouchableOpacity 
                      style={styles.loginButton}
                      onPress={handleLogin}>
                      <LogIn size={18} color="#D4AF37" strokeWidth={2} />
                      <Text style={styles.loginButtonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.signupButton}
                      onPress={handleSignup}>
                      <UserPlus size={18} color="#FFFFFF" strokeWidth={2} />
                      <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Animated.View>
          </LinearGradient>
        </Animated.View>

        {/* Animated Contact Section */}
        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help? 💬</Text>
          <View style={styles.contactButtons}>
            <Pressable
              onPress={handleCall}
              style={styles.contactButtonWrapper}>
              <LinearGradient
                colors={['#1A1A1A', '#3A3A3A'] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.contactButton}>
                <Phone size={24} color="#FFFFFF" strokeWidth={1.5} />
                <Text style={styles.contactButtonText}>Call Us</Text>
              </LinearGradient>
            </Pressable>
            
            <Pressable
              onPress={handleWhatsApp}
              style={styles.contactButtonWrapper}>
              <LinearGradient
                colors={['#25D366', '#20C659'] as const}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.whatsappButton}>
                <MessageCircle size={24} color="#FFFFFF" strokeWidth={1.5} />
                <Text style={styles.contactButtonText}>WhatsApp</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </Animated.View>

        {/* Animated Menu Items */}
        <Animated.View 
          entering={FadeInUp.delay(500).springify()}
          style={styles.section}>
          <Text style={styles.sectionTitle}>Account 👤</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <AnimatedMenuItem key={index} item={item} index={index} />
            ))}
          </View>
        </Animated.View>

        {/* Animated Trust Badge */}
        <Animated.View 
          entering={ZoomIn.delay(1200).springify()}
          style={styles.trustSection}>
          <LinearGradient
            colors={['#FFFFFF', '#FFF8F0'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.trustGradient}>
            <View style={styles.trustIconWrapper}>
              <Shield size={32} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.trustTitle}>Shop with Tima</Text>
            <Text style={styles.trustSubtitle}>✨ Verified Jewelry • Premium Quality ✨</Text>
            <Text style={styles.trustDescription}>
              All products are authenticated and quality-assured by our experts
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Animated Sign Out - Only show when logged in */}
        {user && (
          <Animated.View 
            entering={FadeInUp.delay(1300).springify()}
            style={styles.section}>
            <TouchableOpacity 
              style={styles.signOutButton} 
              onPress={handleLogout}
              activeOpacity={0.7}>
              <LogOut size={20} color="#FF3B30" strokeWidth={1.5} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  headerWrapper: {
    marginBottom: 24,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileAvatarWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarFrame: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFFFFF',
    padding: 4,
    elevation: 8,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profileAvatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F8F8',
  },
  avatarGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    opacity: 0.9,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  editProfileText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  contactButtonWrapper: {
    flex: 1,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F7',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
    minWidth: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  adminButtonWrapper: {
    marginHorizontal: 20,
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  adminContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  trustSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  trustGradient: {
    padding: 24,
    alignItems: 'center',
  },
  trustIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  trustTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#D4AF37',
    marginBottom: 4,
  },
  trustSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  trustDescription: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF3B30',
    elevation: 2,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF3B30',
    marginLeft: 8,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D4AF37',
    gap: 10,
    elevation: 4,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D4AF37',
    letterSpacing: 0.5,
  },
  signupButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    gap: 10,
    elevation: 6,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
