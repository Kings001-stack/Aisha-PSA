import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Package, ChartBar as BarChart3, Users, ShoppingBag, TrendingUp, Eye, CreditCard as Edit, Trash2, ShieldAlert } from 'lucide-react-native';
import { authService } from '@/services/auth.service';

const adminProducts = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    price: 750000,
    stock: 8,
    status: 'Active',
    orders: 15,
  },
  {
    id: 2,
    name: 'Gold Chain Necklace',
    price: 320000,
    stock: 3,
    status: 'Low Stock',
    orders: 28,
  },
  {
    id: 3,
    name: 'Pearl Earrings Set',
    price: 180000,
    stock: 0,
    status: 'Out of Stock',
    orders: 12,
  },
];

const stats = [
  {
    title: 'Total Sales',
    value: '₦2,450,000',
    change: '+12%',
    icon: TrendingUp,
    color: '#34C759',
  },
  {
    title: 'Total Orders',
    value: '156',
    change: '+8%',
    icon: ShoppingBag,
    color: '#007AFF',
  },
  {
    title: 'Products',
    value: '89',
    change: '+5%',
    icon: Package,
    color: '#FF9500',
  },
  {
    title: 'Customers',
    value: '1,234',
    change: '+15%',
    icon: Users,
    color: '#AF52DE',
  },
];

export default function AdminScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      
      if (!currentUser) {
        // Not logged in
        Alert.alert(
          'Authentication Required',
          'Please sign in to access the admin dashboard.',
          [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
        );
        return;
      }

      setUser(currentUser);
      
      // Check if user is admin
      const adminStatus = await authService.isAdmin(currentUser.id);
      
      if (!adminStatus) {
        // Not an admin
        Alert.alert(
          'Access Denied',
          'You do not have permission to access the admin dashboard.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin access:', error);
      Alert.alert(
        'Error',
        'Could not verify admin access. Please try again.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handleAddProduct = () => {
    Alert.alert('Add Product', 'Add product functionality would be implemented here.');
  };

  const handleEditProduct = (productId: number) => {
    Alert.alert('Edit Product', `Edit product ${productId} functionality would be implemented here.`);
  };

  const handleDeleteProduct = (productId: number) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Deleted', 'Product deleted successfully.');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />
          <Text style={styles.loadingText}>Verifying admin access...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.accessDeniedContainer}>
          <ShieldAlert size={64} color="#FF3B30" strokeWidth={1.5} />
          <Text style={styles.accessDeniedTitle}>Access Denied</Text>
          <Text style={styles.accessDeniedText}>
            You do not have permission to access the admin dashboard.
          </Text>
          <TouchableOpacity 
            style={styles.backHomeButton}
            onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.backHomeButtonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <stat.icon size={20} color={stat.color} strokeWidth={1.5} />
                  </View>
                  <Text style={[styles.statChange, { color: stat.color }]}>
                    {stat.change}
                  </Text>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddProduct}>
              <Plus size={24} color="#FFFFFF" strokeWidth={1.5} />
              <Text style={styles.actionButtonText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <BarChart3 size={24} color="#FFFFFF" strokeWidth={1.5} />
              <Text style={styles.actionButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Products Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Manage Products</Text>
            <TouchableOpacity onPress={handleAddProduct}>
              <Text style={styles.addText}>Add New</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsContainer}>
            {adminProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productHeader}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                  </View>
                  <View style={styles.productActions}>
                    <TouchableOpacity
                      style={styles.productActionButton}
                      onPress={() => handleEditProduct(product.id)}>
                      <Edit size={16} color="#8E8E93" strokeWidth={1.5} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.productActionButton}
                      onPress={() => handleDeleteProduct(product.id)}>
                      <Trash2 size={16} color="#FF3B30" strokeWidth={1.5} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.productStats}>
                  <View style={styles.productStat}>
                    <Text style={styles.productStatLabel}>Stock</Text>
                    <Text
                      style={[
                        styles.productStatValue,
                        product.stock === 0 && styles.outOfStock,
                        product.stock < 5 && product.stock > 0 && styles.lowStock,
                      ]}>
                      {product.stock}
                    </Text>
                  </View>
                  <View style={styles.productStat}>
                    <Text style={styles.productStatLabel}>Orders</Text>
                    <Text style={styles.productStatValue}>{product.orders}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text
                      style={[
                        styles.statusText,
                        product.status === 'Out of Stock' && styles.outOfStockStatus,
                        product.status === 'Low Stock' && styles.lowStockStatus,
                      ]}>
                      {product.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  loginDescription: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  loginButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  addText: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#D4AF37',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D4AF37',
  },
  productActions: {
    flexDirection: 'row',
  },
  productActionButton: {
    padding: 8,
    marginLeft: 8,
  },
  productStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productStat: {
    alignItems: 'center',
  },
  productStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  productStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  outOfStock: {
    color: '#FF3B30',
  },
  lowStock: {
    color: '#FF9500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#E8F5E8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8E8E93',
  },
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 24,
    marginBottom: 12,
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  backHomeButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  backHomeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});