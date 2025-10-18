import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  RefreshCw,
} from 'lucide-react-native';

const orders = [
  {
    id: 'ORD-2025-001',
    date: '2025-01-20',
    status: 'delivered',
    total: 450000,
    items: [
      {
        id: 1,
        name: 'Gold Diamond Ring',
        price: 450000,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
      },
    ],
    tracking: 'TRK123456789',
    deliveryDate: '2025-01-22',
  },
  {
    id: 'ORD-2025-002',
    date: '2025-01-18',
    status: 'shipped',
    total: 560000,
    items: [
      {
        id: 2,
        name: 'Pearl Necklace Set',
        price: 280000,
        quantity: 2,
        image: 'https://images.pexels.com/photos/1204496/pexels-photo-1204496.jpeg',
      },
    ],
    tracking: 'TRK987654321',
    estimatedDelivery: '2025-01-25',
  },
  {
    id: 'ORD-2025-003',
    date: '2025-01-15',
    status: 'processing',
    total: 320000,
    items: [
      {
        id: 3,
        name: 'Silver Bracelet',
        price: 125000,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
      },
      {
        id: 4,
        name: 'Gold Earrings',
        price: 195000,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
      },
    ],
    estimatedShipping: '2025-01-26',
  },
];

const statusConfig = {
  processing: {
    label: 'Processing',
    color: '#FF9500',
    icon: Clock,
    description: 'Your order is being prepared',
  },
  shipped: {
    label: 'Shipped',
    color: '#007AFF',
    icon: Truck,
    description: 'Your order is on the way',
  },
  delivered: {
    label: 'Delivered',
    color: '#34C759',
    icon: CheckCircle,
    description: 'Order delivered successfully',
  },
};

export default function OrdersScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredOrders = selectedTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedTab);

  const handleOrderPress = (order: any) => {
    Alert.alert(
      `Order ${order.id}`,
      `Status: ${statusConfig[order.status as keyof typeof statusConfig].label}\nTotal: ${formatPrice(order.total)}\nDate: ${formatDate(order.date)}`,
      [
        { text: 'OK', style: 'default' },
        { text: 'Track Order', onPress: () => handleTrackOrder(order) },
      ]
    );
  };

  const handleTrackOrder = (order: any) => {
    if (order.tracking) {
      Alert.alert(
        'Track Order',
        `Tracking Number: ${order.tracking}\n\nYou can track your order using this number on our delivery partner's website.`
      );
    } else {
      Alert.alert('Tracking Info', 'Tracking information will be available once your order ships.');
    }
  };

  const handleReorder = (order: any) => {
    Alert.alert(
      'Reorder Items',
      'Add these items to your cart again?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add to Cart', onPress: () => {
          Alert.alert('Added to Cart', 'Items have been added to your cart.');
        }},
      ]
    );
  };

  const handleContactSupport = (order: any) => {
    const message = `Hi, I need help with my order ${order.id}. Order total: ${formatPrice(order.total)}, Status: ${statusConfig[order.status as keyof typeof statusConfig].label}`;
    Alert.alert(
      'Contact Support',
      'How would you like to contact us?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'WhatsApp', onPress: () => Alert.alert('Opening WhatsApp...') },
        { text: 'Call', onPress: () => Alert.alert('Calling support...') },
      ]
    );
  };

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <Package size={64} color="#D4AF37" strokeWidth={1} />
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptyDescription}>
            When you place orders, they will appear here
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {[
            { key: 'all', label: 'All' },
            { key: 'processing', label: 'Processing' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'delivered', label: 'Delivered' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedTab === tab.key && styles.activeTab,
              ]}
              onPress={() => setSelectedTab(tab.key as any)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.activeTabText,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          
          return (
            <View key={order.id} style={styles.orderCard}>
              {/* Order Header */}
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${status.color}20` }]}>
                  <StatusIcon size={14} color={status.color} strokeWidth={1.5} />
                  <Text style={[styles.statusText, { color: status.color }]}>
                    {status.label}
                  </Text>
                </View>
              </View>

              {/* Order Items */}
              <View style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        {formatPrice(item.price)} x {item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Order Details */}
              <View style={styles.orderDetails}>
                <Text style={styles.statusDescription}>{status.description}</Text>
                
                {order.tracking && (
                  <Text style={styles.trackingInfo}>
                    Tracking: {order.tracking}
                  </Text>
                )}
                
                {order.estimatedDelivery && (
                  <Text style={styles.estimatedDelivery}>
                    Estimated delivery: {formatDate(order.estimatedDelivery)}
                  </Text>
                )}
                
                {order.deliveryDate && (
                  <Text style={styles.deliveredDate}>
                    Delivered on: {formatDate(order.deliveryDate)}
                  </Text>
                )}
                
                {order.estimatedShipping && (
                  <Text style={styles.estimatedShipping}>
                    Estimated shipping: {formatDate(order.estimatedShipping)}
                  </Text>
                )}
              </View>

              {/* Order Total */}
              <View style={styles.orderTotal}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
              </View>

              {/* Order Actions */}
              <View style={styles.orderActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleOrderPress(order)}>
                  <Eye size={16} color="#8E8E93" strokeWidth={1.5} />
                  <Text style={styles.actionButtonText}>View Details</Text>
                </TouchableOpacity>
                
                {order.tracking && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleTrackOrder(order)}>
                    <Package size={16} color="#8E8E93" strokeWidth={1.5} />
                    <Text style={styles.actionButtonText}>Track</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleReorder(order)}>
                  <RefreshCw size={16} color="#8E8E93" strokeWidth={1.5} />
                  <Text style={styles.actionButtonText}>Reorder</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleContactSupport(order)}>
                  <MessageCircle size={16} color="#8E8E93" strokeWidth={1.5} />
                  <Text style={styles.actionButtonText}>Support</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabs: {
    paddingHorizontal: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  activeTab: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    maxWidth: 140,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#F8F8F8',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    flexShrink: 1,
  },
  itemPrice: {
    fontSize: 12,
    color: '#8E8E93',
  },
  orderDetails: {
    marginBottom: 16,
  },
  statusDescription: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  trackingInfo: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  estimatedDelivery: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  deliveredDate: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
  },
  estimatedShipping: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '500',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D4AF37',
  },
  orderActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 11,
    color: '#1A1A1A',
    fontWeight: '600',
    marginLeft: 4,
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
});
