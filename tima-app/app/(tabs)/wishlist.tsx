import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart, ShoppingBag, Trash2, Share } from 'lucide-react-native';

const wishlistItems = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    price: 750000,
    image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
    material: '18K White Gold',
    inStock: true,
    addedDate: '2025-01-15',
  },
  {
    id: 2,
    name: 'Pearl Drop Earrings',
    price: 180000,
    image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
    material: 'Freshwater Pearls',
    inStock: true,
    addedDate: '2025-01-12',
  },
  {
    id: 3,
    name: 'Gold Chain Necklace',
    price: 320000,
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    material: '14K Gold',
    inStock: false,
    addedDate: '2025-01-10',
  },
];

export default function WishlistScreen() {
  const [items, setItems] = useState(wishlistItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const removeFromWishlist = (id: number) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this item from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setItems(items.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const addToCart = (item: any) => {
    if (!item.inStock) {
      Alert.alert('Out of Stock', 'This item is currently out of stock.');
      return;
    }
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const shareItem = (item: any) => {
    Alert.alert('Share Item', `Sharing ${item.name}`);
  };

  const handleProductPress = (item: any) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: item.id },
    });
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Wishlist</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#D4AF37" strokeWidth={1} />
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptyDescription}>
            Save your favorite jewelry pieces here to buy them later
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/')}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <Text style={styles.itemCount}>{items.length} items</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            </TouchableOpacity>

            <View style={styles.itemDetails}>
              <TouchableOpacity onPress={() => handleProductPress(item)}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMaterial}>{item.material}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
                {!item.inStock && (
                  <Text style={styles.outOfStock}>Out of Stock</Text>
                )}
              </TouchableOpacity>

              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.addToCartButton,
                    !item.inStock && styles.disabledButton,
                  ]}
                  onPress={() => addToCart(item)}
                  disabled={!item.inStock}>
                  <ShoppingBag
                    size={16}
                    color={item.inStock ? '#FFFFFF' : '#8E8E93'}
                    strokeWidth={1.5}
                  />
                  <Text
                    style={[
                      styles.addToCartText,
                      !item.inStock && styles.disabledText,
                    ]}>
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.smallActions}>
                  <TouchableOpacity
                    style={styles.smallActionButton}
                    onPress={() => shareItem(item)}>
                    <Share size={18} color="#8E8E93" strokeWidth={1.5} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.smallActionButton}
                    onPress={() => removeFromWishlist(item.id)}>
                    <Trash2 size={18} color="#FF3B30" strokeWidth={1.5} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addAllToCartButton}
          onPress={() => {
            const inStockItems = items.filter((item) => item.inStock);
            if (inStockItems.length === 0) {
              Alert.alert('No Items Available', 'All items in your wishlist are out of stock.');
              return;
            }
            Alert.alert(
              'Add All to Cart',
              `Add ${inStockItems.length} items to cart?`,
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Add All', onPress: () => {} },
              ]
            );
          }}>
          <ShoppingBag size={20} color="#FFFFFF" strokeWidth={1.5} />
          <Text style={styles.addAllToCartText}>Add All to Cart</Text>
        </TouchableOpacity>
      </View>
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
  itemCount: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemDetails: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemMaterial: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D4AF37',
    marginBottom: 8,
  },
  outOfStock: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '600',
    marginBottom: 12,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  addToCartButton: {
    backgroundColor: '#D4AF37',
  },
  disabledButton: {
    backgroundColor: '#F5F5F7',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  disabledText: {
    color: '#8E8E93',
  },
  smallActions: {
    flexDirection: 'row',
  },
  smallActionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addAllToCartButton: {
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addAllToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});