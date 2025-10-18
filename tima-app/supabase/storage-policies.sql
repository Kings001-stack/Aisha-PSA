-- =====================================================
-- Storage Bucket Policies
-- Run these in Supabase SQL Editor after creating buckets
-- =====================================================

-- =====================================================
-- PRODUCTS BUCKET POLICIES
-- =====================================================

-- Allow public read access to products bucket
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');

-- Allow authenticated users to upload to products bucket
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Allow authenticated users to update product images
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- Allow authenticated users to delete product images
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');

-- =====================================================
-- AVATARS BUCKET POLICIES
-- =====================================================

-- Allow public read access to avatars bucket
CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Allow users to upload their own avatar
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- =====================================================
-- REVIEWS BUCKET POLICIES
-- =====================================================

-- Allow public read access to review images
CREATE POLICY "Public can view review images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'reviews');

-- Allow authenticated users to upload review images
CREATE POLICY "Authenticated users can upload review images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'reviews');

-- Allow users to update their own review images
CREATE POLICY "Users can update own review images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'reviews');

-- Allow users to delete their own review images
CREATE POLICY "Users can delete own review images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'reviews');
