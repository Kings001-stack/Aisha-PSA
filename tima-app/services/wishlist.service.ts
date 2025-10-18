import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type WishlistItem = Database['public']['Tables']['wishlist_items']['Row'];

export const wishlistService = {
  /**
   * Get user's wishlist with product details
   */
  async getWishlist(userId: string) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Add item to wishlist
   */
  async addItem(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId,
      })
      .select(`
        *,
        product:products(*)
      `)
      .single();

    if (error) {
      // Item might already exist
      if (error.code === '23505') {
        throw new Error('Item already in wishlist');
      }
      throw error;
    }
    return data;
  },

  /**
   * Remove item from wishlist
   */
  async removeItem(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
  },

  /**
   * Check if product is in wishlist
   */
  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    return !!data && !error;
  },

  /**
   * Toggle wishlist item
   */
  async toggleItem(userId: string, productId: string) {
    const isInWishlist = await this.isInWishlist(userId, productId);
    
    if (isInWishlist) {
      await this.removeItem(userId, productId);
      return false;
    } else {
      await this.addItem(userId, productId);
      return true;
    }
  },
};
