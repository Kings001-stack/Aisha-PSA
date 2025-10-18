import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  MessageCircle,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const productData = {
  1: {
    id: 1,
    name: 'Gold Diamond Ring',
    price: 450000,
    originalPrice: 520000,
    images: [
      'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
      'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
      'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
    ],
    rating: 4.8,
    reviewCount: 127,
    material: '18K Gold',
    description: 'Exquisite handcrafted gold diamond ring featuring a brilliant cut diamond set in premium 18K gold. Perfect for engagements, weddings, or special occasions.',
    features: [
      'Certified conflict-free diamond',
      '18K solid gold band',
      'Handcrafted by expert jewelers',
      'Lifetime warranty included',
    ],
    sizes: ['6', '7', '8', '9', '10'],
    inStock: true,
    stockCount: 8,
  },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = productData[id as keyof typeof productData];

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Select Size', 'Please select a size before adding to cart.');
      return;
    }
    Alert.alert('Added to Cart', `${product.name} has been added to your cart.`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      Alert.alert('Select Size', 'Please select a size before purchasing.');
      return;
    }
    router.push('/checkout');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    Alert.alert(
      isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      isWishlisted
        ? 'Item removed from your wishlist'
        : 'Item added to your wishlist'
    );
  };

  const handleShare = () => {
    Alert.alert('Share Product', 'Sharing product details...');
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hi, I'm interested in the ${product.name} - ${formatPrice(product.price)}`;
    const phoneNumber = '+2348012345678';
    Alert.alert('WhatsApp Inquiry', 'Opening WhatsApp...');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share size={24} color="#1A1A1A" strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={toggleWishlist}>
            <Heart
              size={24}
              color={isWishlisted ? '#FF3B30' : '#1A1A1A'}
              fill={isWishlisted ? '#FF3B30' : 'transparent'}
              strokeWidth={1.5}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setSelectedImageIndex(index);
            }}>
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
              />
            ))}
          </ScrollView>
          <View style={styles.imageIndicators}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Star size={16} color="#D4AF37" fill="#D4AF37" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Shield size={14} color="#34C759" strokeWidth={1.5} />
              <Text style={styles.verifiedText}>Verified by Shop with Tima</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productMaterial}>{product.material}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
            {product.originalPrice && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}% OFF
                </Text>
              </View>
            )}
          </View>

          {/* Size Selection */}
          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSize,
                  ]}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Services */}
          <View style={styles.servicesSection}>
            <View style={styles.serviceItem}>
              <Truck size={20} color="#34C759" strokeWidth={1.5} />
              <Text style={styles.serviceText}>Free shipping on orders over ₦500k</Text>
            </View>
            <View style={styles.serviceItem}>
              <RotateCcw size={20} color="#34C759" strokeWidth={1.5} />
              <Text style={styles.serviceText}>30-day return policy</Text>
            </View>
            <View style={styles.serviceItem}>
              <Shield size={20} color="#34C759" strokeWidth={1.5} />
              <Text style={styles.serviceText}>Lifetime warranty</Text>
            </View>
          </View>

          {/* Stock Status */}
          <View style={styles.stockSection}>
            <Text style={styles.stockText}>
              {product.inStock
                ? `Only ${product.stockCount} left in stock`
                : 'Out of stock'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={handleWhatsAppInquiry}>
          <MessageCircle size={20} color="#25D366" strokeWidth={1.5} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.addToCartButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}>
          <ShoppingBag size={20} color="#D4AF37" strokeWidth={1.5} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.buyNowButton,
            !product.inStock && styles.disabledButton,
          ]}
          onPress={handleBuyNow}
          disabled={!product.inStock}>
          <Text style={styles.buyNowText}>
            {product.inStock ? 'Buy Now' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width,
    height: width,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  productInfo: {
    padding: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
    marginLeft: 4,
  },
  productName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  productMaterial: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#D4AF37',
  },
  originalPrice: {
    fontSize: 18,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  discountBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sizeSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSize: {
    borderColor: '#D4AF37',
    backgroundColor: '#D4AF37',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  featuresSection: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 24,
  },
  servicesSection: {
    marginBottom: 24,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  stockSection: {
    marginBottom: 20,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF8C00',
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
    gap: 12,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  addToCartButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  addToCartText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyNowButton: {
    backgroundColor: '#D4AF37',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#F5F5F7',
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
  backButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});