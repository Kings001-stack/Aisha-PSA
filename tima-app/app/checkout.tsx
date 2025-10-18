import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  CheckCircle,
} from 'lucide-react-native';

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'bank', name: 'Bank Transfer', icon: Shield },
  { id: 'whatsapp', name: 'WhatsApp Order', icon: Phone },
];

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  // Mock order data - in real app, this would come from cart state
  const orderSummary = {
    subtotal: 730000,
    tax: 54750, // 7.5%
    shipping: 0,
    total: 784750,
    items: [
      { name: 'Gold Diamond Ring', price: 450000, quantity: 1 },
      { name: 'Pearl Necklace Set', price: 280000, quantity: 1 },
    ],
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handlePlaceOrder = () => {
    // Validate required fields
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      Alert.alert('Missing Information', 'Please fill in all required shipping information.');
      return;
    }

    if (selectedPayment === 'card' && (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv)) {
      Alert.alert('Missing Payment Info', 'Please fill in all card details.');
      return;
    }

    if (selectedPayment === 'whatsapp') {
      const message = `New Order Request:\n\nItems:\n${orderSummary.items
        .map(item => `- ${item.name} (₦${item.price.toLocaleString()}) x${item.quantity}`)
        .join('\n')}\n\nTotal: ${formatPrice(orderSummary.total)}\n\nShipping Address:\n${shippingInfo.fullName}\n${shippingInfo.address}\n${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}\n\nPhone: ${shippingInfo.phone}\nEmail: ${shippingInfo.email}`;
      
      Alert.alert(
        'Order via WhatsApp',
        'Your order details will be sent via WhatsApp for confirmation.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Send Order', onPress: () => {
            Alert.alert('Order Sent!', 'Your order has been sent via WhatsApp. We will contact you shortly.');
            router.push('/');
          }},
        ]
      );
      return;
    }

    // Simulate order processing
    Alert.alert(
      'Order Placed Successfully!',
      'Your order has been received and will be processed within 24 hours. You will receive a confirmation email shortly.',
      [
        { text: 'Continue Shopping', onPress: () => router.push('/') },
        { text: 'View Orders', onPress: () => router.push('/orders') },
      ]
    );
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
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Shipping Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#D4AF37" strokeWidth={1.5} />
            <Text style={styles.sectionTitle}>Shipping Information</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <User size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="Full Name *"
                value={shippingInfo.fullName}
                onChangeText={(text) => setShippingInfo({...shippingInfo, fullName: text})}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Mail size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="Email Address *"
                value={shippingInfo.email}
                onChangeText={(text) => setShippingInfo({...shippingInfo, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Phone size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number *"
                value={shippingInfo.phone}
                onChangeText={(text) => setShippingInfo({...shippingInfo, phone: text})}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <MapPin size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="Street Address *"
                value={shippingInfo.address}
                onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
                multiline
              />
            </View>
            
            <View style={styles.rowInputs}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={shippingInfo.city}
                  onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
                />
              </View>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={shippingInfo.state}
                  onChangeText={(text) => setShippingInfo({...shippingInfo, state: text})}
                />
              </View>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ZIP/Postal Code"
                value={shippingInfo.zipCode}
                onChangeText={(text) => setShippingInfo({...shippingInfo, zipCode: text})}
              />
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#D4AF37" strokeWidth={1.5} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method.id && styles.selectedPayment,
                ]}
                onPress={() => setSelectedPayment(method.id)}>
                <View style={styles.paymentMethodLeft}>
                  <method.icon size={20} color="#8E8E93" strokeWidth={1.5} />
                  <Text style={styles.paymentMethodText}>{method.name}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedPayment === method.id && styles.radioButtonSelected,
                ]}>
                  {selectedPayment === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Card Details */}
          {selectedPayment === 'card' && (
            <View style={styles.cardDetails}>
              <View style={styles.inputContainer}>
                <CreditCard size={16} color="#8E8E93" strokeWidth={1.5} />
                <TextInput
                  style={styles.input}
                  placeholder="Card Number"
                  value={cardInfo.number}
                  onChangeText={(text) => setCardInfo({...cardInfo, number: text})}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
              
              <View style={styles.rowInputs}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YY"
                    value={cardInfo.expiry}
                    onChangeText={(text) => setCardInfo({...cardInfo, expiry: text})}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    value={cardInfo.cvv}
                    onChangeText={(text) => setCardInfo({...cardInfo, cvv: text})}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
              
              <View style={styles.inputContainer}>
                <User size={16} color="#8E8E93" strokeWidth={1.5} />
                <TextInput
                  style={styles.input}
                  placeholder="Cardholder Name"
                  value={cardInfo.name}
                  onChangeText={(text) => setCardInfo({...cardInfo, name: text})}
                />
              </View>
            </View>
          )}

          {/* Bank Transfer Info */}
          {selectedPayment === 'bank' && (
            <View style={styles.bankInfo}>
              <Text style={styles.bankInfoTitle}>Bank Transfer Details</Text>
              <Text style={styles.bankInfoText}>
                Transfer the total amount to our account and send proof of payment via WhatsApp.
              </Text>
              <View style={styles.bankDetails}>
                <Text style={styles.bankDetailItem}>Bank: GTBank</Text>
                <Text style={styles.bankDetailItem}>Account: 0123456789</Text>
                <Text style={styles.bankDetailItem}>Name: Shop with Tima Ltd</Text>
              </View>
            </View>
          )}

          {/* WhatsApp Order Info */}
          {selectedPayment === 'whatsapp' && (
            <View style={styles.whatsappInfo}>
              <Text style={styles.whatsappInfoTitle}>WhatsApp Order</Text>
              <Text style={styles.whatsappInfoText}>
                Your order details will be sent via WhatsApp for confirmation. 
                Payment can be made via bank transfer or on delivery.
              </Text>
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.orderSummary}>
            {orderSummary.items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemPrice}>
                  {formatPrice(item.price)} x{item.quantity}
                </Text>
              </View>
            ))}
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(orderSummary.subtotal)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>VAT (7.5%)</Text>
              <Text style={styles.summaryValue}>{formatPrice(orderSummary.tax)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {orderSummary.shipping === 0 ? 'Free' : formatPrice(orderSummary.shipping)}
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(orderSummary.total)}</Text>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Shield size={16} color="#34C759" strokeWidth={1.5} />
          <Text style={styles.securityText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <CheckCircle size={20} color="#FFFFFF" strokeWidth={1.5} />
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Text style={styles.placeOrderTotal}>{formatPrice(orderSummary.total)}</Text>
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
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  inputGroup: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPayment: {
    borderColor: '#D4AF37',
    backgroundColor: '#FFF8F0',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#D4AF37',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D4AF37',
  },
  cardDetails: {
    marginTop: 16,
    gap: 12,
  },
  bankInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
  },
  bankInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  bankInfoText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
    lineHeight: 20,
  },
  bankDetails: {
    gap: 4,
  },
  bankDetailItem: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  whatsappInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F0FFF0',
    borderRadius: 12,
  },
  whatsappInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  whatsappInfoText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  orderSummary: {
    gap: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemName: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D4AF37',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  securityText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  placeOrderButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  placeOrderTotal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
