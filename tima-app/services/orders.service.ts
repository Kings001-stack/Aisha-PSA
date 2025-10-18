import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

export const ordersService = {
  /**
   * Create a new order
   */
  async createOrder(orderData: {
    userId: string;
    customerEmail: string;
    customerName: string;
    customerPhone?: string;
    items: Array<{
      productId: string;
      variantId?: string;
      productName: string;
      productImage?: string;
      productSku?: string;
      variantName?: string;
      unitPrice: number;
      quantity: number;
    }>;
    subtotal: number;
    shippingCost?: number;
    tax?: number;
    discount?: number;
    total: number;
    shippingAddress: any;
    shippingMethod?: string;
    paymentMethod: 'card' | 'bank_transfer' | 'whatsapp' | 'cash_on_delivery';
    customerNotes?: string;
  }) {
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.userId,
        customer_email: orderData.customerEmail,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        subtotal: orderData.subtotal,
        shipping_cost: orderData.shippingCost || 0,
        tax: orderData.tax || 0,
        discount: orderData.discount || 0,
        total: orderData.total,
        shipping_address: orderData.shippingAddress,
        shipping_method: orderData.shippingMethod,
        payment_method: orderData.paymentMethod,
        customer_notes: orderData.customerNotes,
        status: 'pending',
        payment_status: 'pending',
      } as any)
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId,
      product_name: item.productName,
      product_image: item.productImage,
      product_sku: item.productSku,
      variant_name: item.variantName,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      subtotal: item.unitPrice * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  },

  /**
   * Get user's orders
   */
  async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Get single order by ID
   */
  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*)
      `)
      .eq('order_number', orderNumber)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  ) {
    const updates: any = { status };

    // Set timestamp based on status
    if (status === 'confirmed') updates.confirmed_at = new Date().toISOString();
    if (status === 'shipped') updates.shipped_at = new Date().toISOString();
    if (status === 'delivered') updates.delivered_at = new Date().toISOString();
    if (status === 'cancelled') updates.cancelled_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    orderId: string,
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
    paymentReference?: string
  ) {
    const updates: any = { payment_status: paymentStatus };

    if (paymentReference) updates.payment_reference = paymentReference;
    if (paymentStatus === 'paid') updates.paid_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Cancel order
   */
  async cancelOrder(orderId: string, reason?: string) {
    const updates: any = {
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
    };

    if (reason) updates.admin_notes = reason;

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Add tracking number
   */
  async addTrackingNumber(orderId: string, trackingNumber: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ tracking_number: trackingNumber })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Admin functions
  admin: {
    /**
     * Get all orders (admin only)
     */
    async getAllOrders(filters?: {
      status?: string;
      paymentStatus?: string;
      limit?: number;
      offset?: number;
    }) {
      let query = supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.paymentStatus) {
        query = query.eq('payment_status', filters.paymentStatus);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(
          filters.offset,
          filters.offset + (filters.limit || 10) - 1
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },

    /**
     * Get order statistics (admin only)
     */
    async getStatistics() {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total, status, payment_status, created_at');

      if (error) throw error;

      const stats = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + Number(order.total), 0),
        pendingOrders: orders.filter((o) => o.status === 'pending').length,
        completedOrders: orders.filter((o) => o.status === 'delivered').length,
        cancelledOrders: orders.filter((o) => o.status === 'cancelled').length,
        paidOrders: orders.filter((o) => o.payment_status === 'paid').length,
      };

      return stats;
    },
  },
};
