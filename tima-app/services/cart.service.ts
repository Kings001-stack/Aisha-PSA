import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type CartItem = Database['public']['Tables']['cart_items']['Row'];
type CartItemInsert = Database['public']['Tables']['cart_items']['Insert'];

export const cartService = {
  /**
   * Get user's cart items with product details
   */
  async getCart(userId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*),
        variant:product_variants(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Add item to cart
   */
  async addItem(userId: string, productId: string, quantity: number = 1, variantId?: string) {
    // Check if item already exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single();

    if (existing) {
      // Update quantity if item exists
      return this.updateQuantity(existing.id, existing.quantity + quantity);
    }

    // Insert new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        product_id: productId,
        variant_id: variantId || null,
        quantity,
      })
      .select(`
        *,
        product:products(*),
        variant:product_variants(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update cart item quantity
   */
  async updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select(`
        *,
        product:products(*),
        variant:product_variants(*)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Remove item from cart
   */
  async removeItem(itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;
  },

  /**
   * Clear entire cart
   */
  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  },

  /**
   * Get cart summary (total items and price)
   */
  async getCartSummary(userId: string) {
    const items = await this.getCart(userId);
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const price = item.variant?.price || item.product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);

    return {
      totalItems,
      subtotal,
      items,
    };
  },
};
