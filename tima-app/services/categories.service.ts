import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';

type Category = Database['public']['Tables']['categories']['Row'];
type Collection = Database['public']['Tables']['collections']['Row'];

export const categoriesService = {
  /**
   * Get all active categories
   */
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Get category by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get category by slug
   */
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },
};

export const collectionsService = {
  /**
   * Get all active collections
   */
  async getAll() {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Get featured collections
   */
  async getFeatured() {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Get collection by ID
   */
  async getById(id: string) {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get collection by slug
   */
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },
};
