import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Filter, Grid2x2 as Grid, List, Star, Heart } from 'lucide-react-native';

const collectionData = {
  'bridal-collection': {
    title: 'Bridal Collection',
    description: 'Exquisite jewelry pieces perfect for your special day',
    banner: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
    products: [
      {
        id: 1,
        name: 'Diamond Engagement Ring',
        price: 1200000,
        originalPrice: 1400000,
        image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
        rating: 4.9,
        material: '18K White Gold',
        isNew: true,
      },
      {
        id: 2,
        name: 'Bridal Necklace Set',
        price: 850000,
        image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
        rating: 4.8,
        material: 'Platinum',
        isNew: false,
      },
      {
        id: 3,
        name: 'Wedding Band Set',
        price: 650000,
        image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
        rating: 4.7,
        material: '18K Gold',
        isNew: false,
      },
    ],
  },
  'casual-elegance': {
    title: 'Casual Elegance',
    description: 'Sophisticated pieces for everyday luxury',
    banner: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
    products: [
      {
        id: 4,
        name: 'Pearl Stud Earrings',
        price: 180000,
        image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
        rating: 4.6,
        material: 'Freshwater Pearls',
        isNew: true,
      },
      {
        id: 5,
        name: 'Delicate Gold Chain',
        price: 220000,
        image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
        rating: 4.5,
        material: '14K Gold',
        isNew: false,
      },
    ],
  },
  'premium-gold': {
    title: 'Premium Gold',
    description: 'Luxurious gold jewelry crafted to perfection',
    banner: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    products: [
      {
        id: 6,
        name: 'Gold Statement Necklace',
        price: 950000,
        image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
        rating: 4.8,
        material: '18K Gold',
        isNew: true,
      },
    ],
  },
  'diamond-series': {
    title: 'Diamond Series',
    description: 'Brilliant diamonds in stunning settings',
    banner: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
    products: [
      {
        id: 7,
        name: 'Diamond Tennis Bracelet',
        price: 1500000,
        image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
        rating: 4.9,
        material: 'Platinum & Diamonds',
        isNew: true,
      },
    ],
  },
};

export default function CollectionScreen() {
  const { name } = useLocalSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);
  
  const collectionName = name as string;
  const collection = collectionData[collectionName as keyof typeof collectionData];

  if (!collection) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Collection Not Found</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Collection not found</Text>
          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => router.push('/')}>
            <Text style={styles.backToHomeText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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

  const toggleWishlist = (productId: number) => {
    setWishlistedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={viewMode === 'grid' ? styles.productCardGrid : styles.productCardList}>
      <TouchableOpacity onPress={() => handleProductPress(item)}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          
          {/* Badges */}
          <View style={styles.badges}>
            {item.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            )}
            {item.originalPrice && (
              <View style={styles.saleBadge}>
                <Text style={styles.saleBadgeText}>
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                </Text>
              </View>
            )}
          </View>

          {/* Wishlist Button */}
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => toggleWishlist(item.id)}>
            <Heart
              size={20}
              color={wishlistedItems.includes(item.id) ? '#FF3B30' : '#FFFFFF'}
              fill={wishlistedItems.includes(item.id) ? '#FF3B30' : 'transparent'}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.productInfo}>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#D4AF37" fill="#D4AF37" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productMaterial}>{item.material}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{collection.title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? (
              <List size={24} color="#1A1A1A" strokeWidth={1.5} />
            ) : (
              <Grid size={24} color="#1A1A1A" strokeWidth={1.5} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={24} color="#1A1A1A" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Collection Banner */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: collection.banner }} style={styles.bannerImage} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>{collection.title}</Text>
            <Text style={styles.bannerDescription}>{collection.description}</Text>
          </View>
        </View>

        {/* Collection Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{collection.products.length}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {collection.products.filter(p => p.isNew).length}
            </Text>
            <Text style={styles.statLabel}>New Arrivals</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {collection.products.filter(p => p.originalPrice).length}
            </Text>
            <Text style={styles.statLabel}>On Sale</Text>
          </View>
        </View>

        {/* Products Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {collection.products.length} products in this collection
          </Text>
        </View>

        {/* Products Grid */}
        <FlatList
          data={collection.products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode} // Force re-render when view mode changes
          contentContainerStyle={styles.productsContainer}
          scrollEnabled={false}
        />

        {/* Collection Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Collection Highlights</Text>
          <View style={styles.features}>
            <View style={styles.feature}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Handcrafted by expert jewelers</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Certified authentic materials</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Lifetime warranty included</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Free shipping on all items</Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    paddingVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D4AF37',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  countText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCardGrid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal: 4,
    flex: 0.5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productCardList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  badges: {
    position: 'absolute',
    top: 8,
    left: 8,
    gap: 4,
  },
  newBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  saleBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  saleBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 6,
    borderRadius: 12,
  },
  productInfo: {
    padding: 12,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 11,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  productMaterial: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D4AF37',
  },
  originalPrice: {
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  features: {
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#8E8E93',
    marginBottom: 20,
  },
  backToHomeButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backToHomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
