export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'customer' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          banner_url: string | null
          is_featured: boolean
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          banner_url?: string | null
          is_featured?: boolean
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          banner_url?: string | null
          is_featured?: boolean
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          compare_at_price: number | null
          cost_price: number | null
          sku: string | null
          barcode: string | null
          material: string | null
          weight: number | null
          dimensions: string | null
          stock_quantity: number
          low_stock_threshold: number
          track_inventory: boolean
          primary_image_url: string | null
          images: Json
          category_id: string | null
          collection_id: string | null
          tags: string[]
          meta_title: string | null
          meta_description: string | null
          is_featured: boolean
          is_bestseller: boolean
          is_new: boolean
          badge: string | null
          badge_color: string | null
          is_active: boolean
          is_published: boolean
          published_at: string | null
          rating: number
          review_count: number
          view_count: number
          purchase_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          compare_at_price?: number | null
          cost_price?: number | null
          sku?: string | null
          barcode?: string | null
          material?: string | null
          weight?: number | null
          dimensions?: string | null
          stock_quantity?: number
          low_stock_threshold?: number
          track_inventory?: boolean
          primary_image_url?: string | null
          images?: Json
          category_id?: string | null
          collection_id?: string | null
          tags?: string[]
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          is_bestseller?: boolean
          is_new?: boolean
          badge?: string | null
          badge_color?: string | null
          is_active?: boolean
          is_published?: boolean
          published_at?: string | null
          rating?: number
          review_count?: number
          view_count?: number
          purchase_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          sku?: string | null
          barcode?: string | null
          material?: string | null
          weight?: number | null
          dimensions?: string | null
          stock_quantity?: number
          low_stock_threshold?: number
          track_inventory?: boolean
          primary_image_url?: string | null
          images?: Json
          category_id?: string | null
          collection_id?: string | null
          tags?: string[]
          meta_title?: string | null
          meta_description?: string | null
          is_featured?: boolean
          is_bestseller?: boolean
          is_new?: boolean
          badge?: string | null
          badge_color?: string | null
          is_active?: boolean
          is_published?: boolean
          published_at?: string | null
          rating?: number
          review_count?: number
          view_count?: number
          purchase_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price: number | null
          stock_quantity: number
          image_url: string | null
          options: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price?: number | null
          stock_quantity?: number
          image_url?: string | null
          options?: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          sku?: string | null
          price?: number | null
          stock_quantity?: number
          image_url?: string | null
          options?: Json
          is_active?: boolean
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          variant_id: string | null
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          variant_id?: string | null
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          full_name: string
          phone: string
          address_line1: string
          address_line2: string | null
          city: string
          state: string
          postal_code: string
          country: string
          is_default: boolean
          address_type: 'shipping' | 'billing' | 'both'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          phone: string
          address_line1: string
          address_line2?: string | null
          city: string
          state: string
          postal_code: string
          country?: string
          is_default?: boolean
          address_type?: 'shipping' | 'billing' | 'both'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          phone?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          state?: string
          postal_code?: string
          country?: string
          is_default?: boolean
          address_type?: 'shipping' | 'billing' | 'both'
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          subtotal: number
          shipping_cost: number
          tax: number
          discount: number
          total: number
          shipping_address_id: string | null
          shipping_address: Json | null
          shipping_method: string | null
          tracking_number: string | null
          payment_method: 'card' | 'bank_transfer' | 'whatsapp' | 'cash_on_delivery'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_reference: string | null
          paid_at: string | null
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          customer_notes: string | null
          admin_notes: string | null
          confirmed_at: string | null
          shipped_at: string | null
          delivered_at: string | null
          cancelled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          subtotal: number
          shipping_cost?: number
          tax?: number
          discount?: number
          total: number
          shipping_address_id?: string | null
          shipping_address?: Json | null
          shipping_method?: string | null
          tracking_number?: string | null
          payment_method: 'card' | 'bank_transfer' | 'whatsapp' | 'cash_on_delivery'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_reference?: string | null
          paid_at?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          customer_notes?: string | null
          admin_notes?: string | null
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          subtotal?: number
          shipping_cost?: number
          tax?: number
          discount?: number
          total?: number
          shipping_address_id?: string | null
          shipping_address?: Json | null
          shipping_method?: string | null
          tracking_number?: string | null
          payment_method?: 'card' | 'bank_transfer' | 'whatsapp' | 'cash_on_delivery'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_reference?: string | null
          paid_at?: string | null
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
          customer_notes?: string | null
          admin_notes?: string | null
          confirmed_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          variant_id: string | null
          product_name: string
          product_image: string | null
          product_sku: string | null
          variant_name: string | null
          unit_price: number
          quantity: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          variant_id?: string | null
          product_name: string
          product_image?: string | null
          product_sku?: string | null
          variant_name?: string | null
          unit_price: number
          quantity: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          variant_id?: string | null
          product_name?: string
          product_image?: string | null
          product_sku?: string | null
          variant_name?: string | null
          unit_price?: number
          quantity?: number
          subtotal?: number
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          order_id: string | null
          rating: number
          title: string | null
          comment: string | null
          images: string[]
          is_verified_purchase: boolean
          is_approved: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          order_id?: string | null
          rating: number
          title?: string | null
          comment?: string | null
          images?: string[]
          is_verified_purchase?: boolean
          is_approved?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          order_id?: string | null
          rating?: number
          title?: string | null
          comment?: string | null
          images?: string[]
          is_verified_purchase?: boolean
          is_approved?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'order' | 'promotion' | 'system' | 'review'
          title: string
          message: string
          data: Json
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'order' | 'promotion' | 'system' | 'review'
          title: string
          message: string
          data?: Json
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'order' | 'promotion' | 'system' | 'review'
          title?: string
          message?: string
          data?: Json
          is_read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
