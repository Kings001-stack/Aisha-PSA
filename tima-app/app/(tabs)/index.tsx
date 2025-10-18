import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Bell, Star, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const featuredProducts = [
  {
    id: 1,
    name: 'Gold Diamond Ring',
    price: 450000,
    image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
    rating: 4.8,
    material: '18K Gold',
  },
  {
    id: 2,
    name: 'Pearl Necklace Set',
    price: 280000,
    image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
    rating: 4.9,
    material: 'Freshwater Pearls',
  },
  {
    id: 3,
    name: 'Silver Bracelet',
    price: 125000,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    rating: 4.7,
    material: '925 Silver',
  },
];

const categories = [
  { name: 'Rings', icon: '💍', count: 120 },
  { name: 'Necklaces', icon: '📿', count: 85 },
  { name: 'Earrings', icon: '👂', count: 95 },
  { name: 'Bracelets', icon: '🔗', count: 65 },
  { name: 'Watches', icon: '⌚', count: 45 },
  { name: 'Sets', icon: '💎', count: 30 },
];

export default function HomeScreen() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handleProductPress = (product: any) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id },
    });
  };

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: '/category/[name]',
      params: { name: category.toLowerCase() },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.brandName}>Shop with Tima</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1A1A1A" strokeWidth={1.5} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Luxury Jewelry</Text>
          <Text style={styles.heroSubtitle}>
            Discover our exquisite collection of handcrafted jewelry
          </Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop Now</Text>
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/categories')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.name)}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} items</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.productsScroll}>
            {featuredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product)}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <View style={styles.ratingContainer}>
                    <Star size={12} color="#D4AF37" fill="#D4AF37" />
                    <Text style={styles.rating}>{product.rating}</Text>
                  </View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productMaterial}>{product.material}</Text>
                  <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trust Badge */}
        <View style={styles.trustSection}>
          <Text style={styles.trustTitle}>Verified by Shop with Tima</Text>
          <Text style={styles.trustDescription}>
            All products are authenticated and quality-assured by our experts
          </Text>
        </View>
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
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '400',
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4AF37',
  },
  heroSection: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  viewAll: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 16,
    marginRight: 16,
    alignItems: 'center',
    minWidth: 120,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '400',
  },
  productsScroll: {
    paddingLeft: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    width: width * 0.7,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productMaterial: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D4AF37',
  },
  trustSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  trustTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  trustDescription: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});