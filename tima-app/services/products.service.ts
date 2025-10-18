import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export const productsService = {
  /**
   * Get all published products
   */
  async getAll(options?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
    collectionId?: string;
    featured?: boolean;
    bestseller?: boolean;
    search?: string;
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        collection:collections(*)
      `)
      .eq('is_published', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }

    if (options?.collectionId) {
      query = query.eq('collection_id', options.collectionId);
    }

    if (options?.featured) {
      query = query.eq('is_featured', true);
    }

    if (options?.bestseller) {
      query = query.eq('is_bestseller', true);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  /**
   * Get a single product by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        collection:collections(*),
        variants:product_variants(*)
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get a single product by slug
   */
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        collection:collections(*),
        variants:product_variants(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get featured products
   */
  async getFeatured(limit: number = 6) {
    return this.getAll({ featured: true, limit });
  },

  /**
   * Get bestseller products
   */
  async getBestsellers(limit: number = 6) {
    return this.getAll({ bestseller: true, limit });
  },

  /**
   * Get products by category
   */
  async getByCategory(categoryId: string, limit?: number) {
    return this.getAll({ categoryId, limit });
  },

  /**
   * Get products by collection
   */
  async getByCollection(collectionId: string, limit?: number) {
    return this.getAll({ collectionId, limit });
  },

  /**
   * Search products
   */
  async search(query: string, limit: number = 20) {
    return this.getAll({ search: query, limit });
  },

  /**
   * Increment product view count
   */
  async incrementViewCount(productId: string) {
    const { error } = await supabase.rpc('increment_product_views', {
      product_id: productId,
    });

    if (error) console.error('Error incrementing view count:', error);
  },

  /**
   * Get related products
   */
  async getRelated(productId: string, limit: number = 4) {
    // First get the product to find its category
    const product = await this.getById(productId);
    
    if (!product?.category_id) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', product.category_id)
      .eq('is_published', true)
      .eq('is_active', true)
      .neq('id', productId)
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Admin functions
  admin: {
    /**
     * Create a new product (admin only)
     */
    async create(product: ProductInsert) {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Update a product (admin only)
     */
    async update(id: string, updates: ProductUpdate) {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Delete a product (admin only)
     */
    async delete(id: string) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },

    /**
     * Get all products including unpublished (admin only)
     */
    async getAll() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*),
          collection:collections(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  },
};
