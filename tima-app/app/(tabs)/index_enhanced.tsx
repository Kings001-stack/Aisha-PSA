import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { Bell, Star, ArrowRight, Sparkles, TrendingUp, Heart } from 'lucide-react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  ZoomIn,
  SlideInRight,
  SlideInLeft,
  BounceIn,
  FlipInYLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const featuredProducts = [
  {
    id: 1,
    name: 'Gold Diamond Ring',
    price: 450000,
    image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
    rating: 4.8,
    material: '18K Gold',
    badge: 'Bestseller',
    badgeColor: ['#FF6B6B', '#FF8E53'],
  },
  {
    id: 2,
    name: 'Pearl Necklace Set',
    price: 280000,
    image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
    rating: 4.9,
    material: 'Freshwater Pearls',
    badge: 'New Arrival',
    badgeColor: ['#4FACFE', '#00F2FE'],
  },
  {
    id: 3,
    name: 'Silver Bracelet',
    price: 125000,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    rating: 4.7,
    material: '925 Silver',
    badge: 'Trending',
    badgeColor: ['#43E97B', '#38F9D7'],
  },
];

const categories = [
  { name: 'Rings', icon: '💍', count: 120, gradient: ['#FF6B6B', '#FF8E53'] },
  { name: 'Necklaces', icon: '📿', count: 85, gradient: ['#4FACFE', '#00F2FE'] },
  { name: 'Earrings', icon: '👂', count: 95, gradient: ['#43E97B', '#38F9D7'] },
  { name: 'Bracelets', icon: '🔗', count: 65, gradient: ['#FA709A', '#FEE140'] },
  { name: 'Watches', icon: '⌚', count: 45, gradient: ['#A8EDEA', '#FED6E3'] },
  { name: 'Sets', icon: '💎', count: 30, gradient: ['#D4AF37', '#F4D03F'] },
];

export default function HomeScreen() {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const notificationPulse = useSharedValue(1);
  const sparkleRotation = useSharedValue(0);

  useEffect(() => {
    // Notification badge pulse animation
    notificationPulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      false
    );

    // Sparkle rotation animation
    sparkleRotation.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
  }, []);

  const notificationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: notificationPulse.value }],
    };
  });

  const sparkleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${sparkleRotation.value}deg` }],
    };
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handleProductPress = (product: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id },
    });
  };

  const handleCategoryPress = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/category/[name]',
      params: { name: category.toLowerCase() },
    });
  };

  const toggleLike = (productId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const AnimatedProductCard = ({ product, index }: { product: typeof featuredProducts[0]; index: number }) => {
    const scale = useSharedValue(1);
    const isLiked = likedProducts.includes(product.id);

    const animatedCardStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
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

    return (
      <AnimatedPressable
        entering={SlideInRight.delay(index * 150).springify().damping(15)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => handleProductPress(product)}
        style={[styles.productCard, animatedCardStyle]}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          
          {/* Badge */}
          <Animated.View 
            entering={ZoomIn.delay((index * 150) + 300).springify()}
            style={styles.badgeWrapper}>
            <LinearGradient
              colors={product.badgeColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </LinearGradient>
          </Animated.View>

          {/* Like Button */}
          <Animated.View 
            entering={BounceIn.delay((index * 150) + 400)}
            style={styles.likeButtonWrapper}>
            <Pressable
              onPress={() => toggleLike(product.id)}
              style={styles.likeButton}>
              <Heart
                size={20}
                color={isLiked ? '#FF3B30' : '#FFFFFF'}
                fill={isLiked ? '#FF3B30' : 'transparent'}
                strokeWidth={2}
              />
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.productInfo}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#D4AF37" fill="#D4AF37" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
          <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.productMaterial}>{product.material}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        </View>
      </AnimatedPressable>
    );
  };

  const AnimatedCategoryCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = () => {
      scale.value = withSpring(0.9, {
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

    return (
      <AnimatedPressable
        entering={ZoomIn.delay(index * 100).springify().damping(15)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => handleCategoryPress(category.name)}
        style={[animatedStyle]}>
        <LinearGradient
          colors={category.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.categoryCard}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryCount}>{category.count} items</Text>
        </LinearGradient>
      </AnimatedPressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Animated Header */}
        <Animated.View 
          entering={FadeInDown.duration(600).springify()}
          style={styles.header}>
          <View>
            <Animated.Text 
              entering={FadeIn.delay(200)}
              style={styles.greeting}>
              Good Morning ☀️
            </Animated.Text>
            <Animated.View 
              entering={SlideInLeft.delay(300).springify()}
              style={styles.brandNameContainer}>
              <Text style={styles.brandName}>Shop with Tima</Text>
              <Animated.View style={sparkleStyle}>
                <Sparkles size={20} color="#D4AF37" strokeWidth={1.5} />
              </Animated.View>
            </Animated.View>
          </View>
          <Pressable 
            style={styles.notificationButtonWrapper}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <Animated.View 
              entering={ZoomIn.delay(400).springify()}
              style={styles.notificationButton}>
              <Bell size={24} color="#1A1A1A" strokeWidth={1.5} />
              <Animated.View style={[styles.notificationBadge, notificationStyle]} />
            </Animated.View>
          </Pressable>
        </Animated.View>

        {/* Animated Hero Section */}
        <Animated.View 
          entering={FadeInUp.delay(400).springify()}>
          <LinearGradient
            colors={['#D4AF37', '#F4D03F', '#D4AF37']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroSection}>
            <Animated.Text 
              entering={FadeIn.delay(600)}
              style={styles.heroTitle}>
              ✨ Luxury Jewelry ✨
            </Animated.Text>
            <Animated.Text 
              entering={FadeIn.delay(700)}
              style={styles.heroSubtitle}>
              Discover our exquisite collection of handcrafted jewelry
            </Animated.Text>
            <AnimatedPressable
              entering={BounceIn.delay(800)}
              style={styles.shopNowButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/(tabs)/categories');
              }}>
              <Text style={styles.shopNowText}>Shop Now</Text>
              <ArrowRight size={20} color="#D4AF37" strokeWidth={2} />
            </AnimatedPressable>
          </LinearGradient>
        </Animated.View>

        {/* Categories Section */}
        <Animated.View 
          entering={FadeInUp.delay(600).springify()}
          style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity 
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/(tabs)/categories');
              }}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}>
            {categories.map((category, index) => (
              <AnimatedCategoryCard key={index} category={category} index={index} />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Products */}
        <Animated.View 
          entering={FadeInUp.delay(800).springify()}
          style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TrendingUp size={20} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/(tabs)/categories');
              }}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}>
            {featuredProducts.map((product, index) => (
              <AnimatedProductCard key={product.id} product={product} index={index} />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Promotional Banner */}
        <Animated.View 
          entering={FlipInYLeft.delay(1000).springify()}>
          <LinearGradient
            colors={['#FF6B9D', '#C44569']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>🎉 Special Offer!</Text>
              <Text style={styles.promoText}>Get 20% off on all jewelry sets</Text>
              <TouchableOpacity 
                style={styles.promoButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  router.push('/collection/bridal-collection');
                }}>
                <Text style={styles.promoButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  brandNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  notificationButtonWrapper: {
    position: 'relative',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    opacity: 0.95,
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  shopNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D4AF37',
    marginRight: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D4AF37',
  },
  categoriesScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    gap: 12,
  },
  categoryCard: {
    width: 120,
    height: 140,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  productsScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    gap: 16,
  },
  productCard: {
    width: width * 0.65,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeWrapper: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  likeButtonWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  likeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D4AF37',
    marginLeft: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productMaterial: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D4AF37',
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 24,
    elevation: 6,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  promoContent: {
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  promoText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    opacity: 0.95,
  },
  promoButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  promoButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B9D',
  },
});
