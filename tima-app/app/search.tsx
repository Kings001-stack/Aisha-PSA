import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Star, X } from 'lucide-react-native';

const recentSearches = ['Diamond rings', 'Gold necklace', 'Pearl earrings'];
const trendingSearches = ['Wedding sets', 'Bridal jewelry', 'Premium watches'];

const searchResults = [
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
    name: 'Gold Chain Necklace',
    price: 320000,
    image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
    rating: 4.7,
    material: '14K Gold',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleProductPress = (product: any) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: product.id },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" strokeWidth={1.5} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jewelry..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={20} color="#8E8E93" strokeWidth={1.5} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {!showResults ? (
          <>
            {/* Recent Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <TouchableOpacity>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tagsContainer}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tag}
                    onPress={() => handleSearch(search)}>
                    <Text style={styles.tagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending</Text>
              <View style={styles.tagsContainer}>
                {trendingSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.tag, styles.trendingTag]}
                    onPress={() => handleSearch(search)}>
                    <Text style={[styles.tagText, styles.trendingTagText]}>
                      {search}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Browse Categories</Text>
              <View style={styles.categoriesGrid}>
                {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={styles.categoryCard}
                    onPress={() => router.push(`/category/${category.toLowerCase()}`)}>
                    <Text style={styles.categoryName}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Search Results */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {searchResults.length} results for "{searchQuery}"
              </Text>
            </View>

            <View style={styles.resultsContainer}>
              {searchResults.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product)}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color="#D4AF37" fill="#D4AF37" />
                      <Text style={styles.rating}>{product.rating}</Text>
                    </View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productMaterial}>{product.material}</Text>
                    <Text style={styles.productPrice}>
                      {formatPrice(product.price)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {searchResults.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Search size={48} color="#D0D0D0" strokeWidth={1} />
                <Text style={styles.noResultsTitle}>No results found</Text>
                <Text style={styles.noResultsText}>
                  Try adjusting your search or browse our categories
                </Text>
              </View>
            )}
          </>
        )}
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  clearText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trendingTag: {
    backgroundColor: '#D4AF37',
  },
  tagText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  trendingTagText: {
    color: '#FFFFFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  productName: {
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: '800',
    color: '#D4AF37',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
});