import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, Filter, Grid2x2 as Grid, List } from 'lucide-react-native';

const categories = [
  {
    name: 'Rings',
    icon: '💍',
    count: 120,
    subcategories: ['Engagement', 'Wedding', 'Fashion', 'Statement'],
  },
  {
    name: 'Necklaces',
    icon: '📿',
    count: 85,
    subcategories: ['Choker', 'Chain', 'Pendant', 'Statement'],
  },
  {
    name: 'Earrings',
    icon: '👂',
    count: 95,
    subcategories: ['Stud', 'Drop', 'Hoop', 'Chandelier'],
  },
  {
    name: 'Bracelets',
    icon: '🔗',
    count: 65,
    subcategories: ['Chain', 'Bangle', 'Charm', 'Tennis'],
  },
  {
    name: 'Anklets',
    icon: '🦶',
    count: 35,
    subcategories: ['Chain', 'Charm', 'Beaded', 'Statement'],
  },
  {
    name: 'Waist Chains',
    icon: '⛓️',
    count: 25,
    subcategories: ['Delicate', 'Bold', 'Charm', 'Layered'],
  },
  {
    name: 'Watches',
    icon: '⌚',
    count: 45,
    subcategories: ['Luxury', 'Sports', 'Classic', 'Smart'],
  },
  {
    name: 'Sets',
    icon: '💎',
    count: 30,
    subcategories: ['Bridal', 'Evening', 'Casual', 'Statement'],
  },
];

const collections = [
  { name: 'Bridal Collection', count: 45, color: '#FFE5E5' },
  { name: 'Casual Elegance', count: 78, color: '#E5F3FF' },
  { name: 'Premium Gold', count: 92, color: '#FFF5E5' },
  { name: 'Diamond Series', count: 34, color: '#F0E5FF' },
];

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: '/category/[name]',
      params: { name: category.toLowerCase() },
    });
  };

  const handleCollectionPress = (collection: string) => {
    router.push({
      pathname: '/collection/[name]',
      params: { name: collection.toLowerCase().replace(' ', '-') },
    });
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? (
              <List size={24} color="#1A1A1A" strokeWidth={1.5} />
            ) : (
              <Grid size={24} color="#1A1A1A" strokeWidth={1.5} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color="#1A1A1A" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearchPress}>
        <Search size={20} color="#8E8E93" strokeWidth={1.5} />
        <Text style={styles.searchPlaceholder}>Search jewelry...</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Collections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Collections</Text>
          <View style={styles.collectionsGrid}>
            {collections.map((collection, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.collectionCard, { backgroundColor: collection.color }]}
                onPress={() => handleCollectionPress(collection.name)}>
                <Text style={styles.collectionName}>{collection.name}</Text>
                <Text style={styles.collectionCount}>{collection.count} items</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={viewMode === 'grid' ? styles.categoriesGrid : styles.categoriesList}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={viewMode === 'grid' ? styles.categoryCardGrid : styles.categoryCardList}
                onPress={() => handleCategoryPress(category.name)}>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>{category.count} items</Text>
                  </View>
                </View>
                {viewMode === 'list' && (
                  <View style={styles.subcategoriesContainer}>
                    {category.subcategories.slice(0, 3).map((sub, idx) => (
                      <Text key={idx} style={styles.subcategoryTag}>
                        {sub}
                      </Text>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>New Arrivals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Sale Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Text style={styles.quickActionText}>Premium</Text>
            </TouchableOpacity>
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
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewToggle: {
    padding: 8,
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  collectionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  collectionCount: {
    fontSize: 12,
    color: '#8E8E93',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCardGrid: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryCardList: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryInfo: {
    marginLeft: 16,
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  subcategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  subcategoryTag: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    color: '#8E8E93',
    marginRight: 6,
    marginBottom: 4,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});