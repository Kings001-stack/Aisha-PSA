-- =====================================================
-- Shop with Tima - Sample Data
-- =====================================================

-- =====================================================
-- CATEGORIES
-- =====================================================

INSERT INTO public.categories (name, slug, description, icon, display_order) VALUES
('Rings', 'rings', 'Beautiful rings for every occasion', 'ring', 1),
('Necklaces', 'necklaces', 'Elegant necklaces and pendants', 'necklace', 2),
('Earrings', 'earrings', 'Stunning earrings collection', 'earring', 3),
('Bracelets', 'bracelets', 'Charming bracelets and bangles', 'bracelet', 4),
('Anklets', 'anklets', 'Delicate anklets', 'anklet', 5),
('Sets', 'sets', 'Complete jewelry sets', 'set', 6);

-- =====================================================
-- COLLECTIONS
-- =====================================================

INSERT INTO public.collections (name, slug, description, is_featured, display_order) VALUES
('Bridal Collection', 'bridal', 'Exquisite pieces for your special day', TRUE, 1),
('Casual Elegance', 'casual', 'Everyday luxury pieces', TRUE, 2),
('Premium Gold', 'premium-gold', 'High-end gold jewelry', TRUE, 3),
('Diamond Series', 'diamond', 'Stunning diamond pieces', TRUE, 4);

-- =====================================================
-- PRODUCTS
-- =====================================================

-- Get category and collection IDs
DO $$
DECLARE
  ring_cat_id UUID;
  necklace_cat_id UUID;
  earring_cat_id UUID;
  bracelet_cat_id UUID;
  bridal_col_id UUID;
  casual_col_id UUID;
  premium_col_id UUID;
  diamond_col_id UUID;
BEGIN
  SELECT id INTO ring_cat_id FROM public.categories WHERE slug = 'rings';
  SELECT id INTO necklace_cat_id FROM public.categories WHERE slug = 'necklaces';
  SELECT id INTO earring_cat_id FROM public.categories WHERE slug = 'earrings';
  SELECT id INTO bracelet_cat_id FROM public.categories WHERE slug = 'bracelets';
  
  SELECT id INTO bridal_col_id FROM public.collections WHERE slug = 'bridal';
  SELECT id INTO casual_col_id FROM public.collections WHERE slug = 'casual';
  SELECT id INTO premium_col_id FROM public.collections WHERE slug = 'premium-gold';
  SELECT id INTO diamond_col_id FROM public.collections WHERE slug = 'diamond';

  -- Rings
  INSERT INTO public.products (
    name, slug, description, price, compare_at_price, material, 
    primary_image_url, category_id, collection_id, 
    is_featured, is_bestseller, is_published, published_at,
    rating, stock_quantity, badge, badge_color
  ) VALUES
  (
    'Gold Diamond Ring',
    'gold-diamond-ring',
    'Stunning 18K gold ring with brilliant cut diamond. Perfect for engagements or special occasions.',
    450000,
    500000,
    '18K Gold',
    'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg',
    ring_cat_id,
    premium_col_id,
    TRUE,
    TRUE,
    TRUE,
    NOW(),
    4.8,
    15,
    'Bestseller',
    '#FF6B6B'
  ),
  (
    'Rose Gold Engagement Ring',
    'rose-gold-engagement-ring',
    'Elegant rose gold engagement ring with center stone. A timeless piece for your special moment.',
    380000,
    420000,
    '14K Rose Gold',
    'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg',
    ring_cat_id,
    bridal_col_id,
    TRUE,
    FALSE,
    TRUE,
    NOW(),
    4.9,
    10,
    'New',
    '#4ECDC4'
  ),
  (
    'Classic Wedding Band',
    'classic-wedding-band',
    'Simple and elegant 18K gold wedding band. Perfect for everyday wear.',
    150000,
    NULL,
    '18K Gold',
    'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    ring_cat_id,
    bridal_col_id,
    FALSE,
    TRUE,
    TRUE,
    NOW(),
    4.7,
    25,
    NULL,
    NULL
  );

  -- Necklaces
  INSERT INTO public.products (
    name, slug, description, price, compare_at_price, material,
    primary_image_url, category_id, collection_id,
    is_featured, is_bestseller, is_published, published_at,
    rating, stock_quantity, badge
  ) VALUES
  (
    'Pearl Necklace Set',
    'pearl-necklace-set',
    'Luxurious pearl necklace with matching earrings. Perfect for formal occasions.',
    280000,
    320000,
    'Freshwater Pearls',
    'https://images.pexels.com/photos/1458838/pexels-photo-1458838.jpeg',
    necklace_cat_id,
    bridal_col_id,
    TRUE,
    FALSE,
    TRUE,
    NOW(),
    4.6,
    12,
    'Limited'
  ),
  (
    'Gold Chain Necklace',
    'gold-chain-necklace',
    'Classic 18K gold chain necklace. Versatile piece for any outfit.',
    195000,
    NULL,
    '18K Gold',
    'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg',
    necklace_cat_id,
    casual_col_id,
    FALSE,
    TRUE,
    TRUE,
    NOW(),
    4.8,
    20,
    'Bestseller'
  ),
  (
    'Diamond Pendant',
    'diamond-pendant',
    'Exquisite diamond pendant on white gold chain. A statement piece.',
    520000,
    580000,
    '18K White Gold',
    'https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg',
    necklace_cat_id,
    diamond_col_id,
    TRUE,
    FALSE,
    TRUE,
    NOW(),
    5.0,
    5,
    'Premium'
  );

  -- Earrings
  INSERT INTO public.products (
    name, slug, description, price, material,
    primary_image_url, category_id, collection_id,
    is_featured, is_published, published_at,
    rating, stock_quantity, badge
  ) VALUES
  (
    'Diamond Stud Earrings',
    'diamond-stud-earrings',
    'Classic diamond stud earrings in white gold. Timeless elegance.',
    320000,
    '18K White Gold',
    'https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg',
    earring_cat_id,
    diamond_col_id,
    TRUE,
    TRUE,
    NOW(),
    4.9,
    18,
    'New'
  ),
  (
    'Gold Hoop Earrings',
    'gold-hoop-earrings',
    'Modern gold hoop earrings. Perfect for everyday wear.',
    85000,
    '14K Gold',
    'https://images.pexels.com/photos/1454174/pexels-photo-1454174.jpeg',
    earring_cat_id,
    casual_col_id,
    FALSE,
    TRUE,
    NOW(),
    4.7,
    30,
    NULL
  ),
  (
    'Pearl Drop Earrings',
    'pearl-drop-earrings',
    'Elegant pearl drop earrings. Perfect for special occasions.',
    125000,
    'Freshwater Pearls',
    'https://images.pexels.com/photos/1454175/pexels-photo-1454175.jpeg',
    earring_cat_id,
    bridal_col_id,
    FALSE,
    TRUE,
    NOW(),
    4.6,
    15,
    NULL
  );

  -- Bracelets
  INSERT INTO public.products (
    name, slug, description, price, compare_at_price, material,
    primary_image_url, category_id, collection_id,
    is_featured, is_bestseller, is_published, published_at,
    rating, stock_quantity
  ) VALUES
  (
    'Tennis Bracelet',
    'tennis-bracelet',
    'Stunning diamond tennis bracelet. A luxurious statement piece.',
    680000,
    750000,
    '18K White Gold',
    'https://images.pexels.com/photos/1454176/pexels-photo-1454176.jpeg',
    bracelet_cat_id,
    diamond_col_id,
    TRUE,
    TRUE,
    TRUE,
    NOW(),
    5.0,
    8
  ),
  (
    'Gold Bangle Set',
    'gold-bangle-set',
    'Set of 3 elegant gold bangles. Traditional and modern design.',
    245000,
    NULL,
    '18K Gold',
    'https://images.pexels.com/photos/1454177/pexels-photo-1454177.jpeg',
    bracelet_cat_id,
    premium_col_id,
    FALSE,
    FALSE,
    TRUE,
    NOW(),
    4.7,
    12
  ),
  (
    'Charm Bracelet',
    'charm-bracelet',
    'Delicate charm bracelet with customizable charms.',
    95000,
    NULL,
    '14K Gold',
    'https://images.pexels.com/photos/1454178/pexels-photo-1454178.jpeg',
    bracelet_cat_id,
    casual_col_id,
    FALSE,
    TRUE,
    TRUE,
    NOW(),
    4.8,
    25
  );

END $$;

-- =====================================================
-- PRODUCT VARIANTS (for rings with different sizes)
-- =====================================================

DO $$
DECLARE
  ring_product_id UUID;
BEGIN
  SELECT id INTO ring_product_id FROM public.products WHERE slug = 'gold-diamond-ring';
  
  INSERT INTO public.product_variants (product_id, name, sku, options) VALUES
  (ring_product_id, 'Size 5', 'GDR-5', '{"size": "5"}'),
  (ring_product_id, 'Size 6', 'GDR-6', '{"size": "6"}'),
  (ring_product_id, 'Size 7', 'GDR-7', '{"size": "7"}'),
  (ring_product_id, 'Size 8', 'GDR-8', '{"size": "8"}'),
  (ring_product_id, 'Size 9', 'GDR-9', '{"size": "9"}');
END $$;
