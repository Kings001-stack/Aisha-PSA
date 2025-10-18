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
import { ArrowLeft, Filter, Grid2x2 as Grid, List, Star } from 'lucide-react-native';

const categoryProducts = {
  rings: [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      price: 750000,
      image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
      rating: 4.8,
      material: '18K White Gold',
    },
    {
      id: 2,
      name: 'Gold Wedding Band',
      price: 320000,
      image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
      rating: 4.7,
      material: '14K Gold',
    },
    {
      id: 3,
      name: 'Emerald Ring',
      price: 890000,
      image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
      rating: 4.9,
      material: '18K Gold',
    },
  ],
  necklaces: [
    {
      id: 4,
      name: 'Pearl Choker',
      price: 180000,
      image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
      rating: 4.6,
      material: 'Freshwater Pearls',
    },
  ],
};

export default function CategoryScreen() {
  const { name } = useLocalSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const categoryName = name as string;
  const products = categoryProducts[categoryName as keyof typeof categoryProducts] || [];

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

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={viewMode === 'grid' ? styles.productCardGrid : styles.productCardList}
      onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#D4AF37" fill="#D4AF37" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productMaterial}>{item.material}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </Text>
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

      {/* Products Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{products.length} products found</Text>
      </View>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when view mode changes
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      />
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
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerActions: {
    flexDirection: 'row',
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
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
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
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#D4AF37',
  },
});