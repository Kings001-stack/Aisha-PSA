# Supabase Backend Setup Guide

## 🎯 Overview
This guide will walk you through setting up the complete Supabase backend for Shop with Tima jewelry e-commerce app.

## ✅ Prerequisites Completed
- ✅ Supabase project created
- ✅ API credentials obtained
- ✅ Dependencies installed (`@supabase/supabase-js`, `@react-native-async-storage/async-storage`)
- ✅ Supabase client configured

## 📋 Step-by-Step Setup

### Step 1: Create Environment File

1. In your project root, create a `.env` file (it's gitignored for security)
2. Add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://dawhduonnysdlzbyzgme.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2hkdW9ubnlzZGx6Ynl6Z21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTQxNjIsImV4cCI6MjA3NDc5MDE2Mn0.HBqJ1My7n9Z_t3nLUvdmZ6wmE7aH1gvchlwjbEFdKqg
```

### Step 2: Run Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `dawhduonnysdlzbyzgme`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase/schema.sql`
6. Paste into the SQL editor
7. Click **Run** (or press Ctrl+Enter)
8. Wait for completion (should take 10-20 seconds)

### Step 3: Add Sample Data

1. Still in the SQL Editor, create another **New Query**
2. Copy the entire contents of `supabase/seed-data.sql`
3. Paste into the SQL editor
4. Click **Run**
5. This will populate your database with sample products, categories, and collections

### Step 4: Set Up Storage Buckets

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Create these three buckets:

#### Bucket 1: products
- Name: `products`
- Public: ✅ Yes
- File size limit: 5MB
- Allowed MIME types: `image/*`

#### Bucket 2: avatars
- Name: `avatars`
- Public: ✅ Yes
- File size limit: 2MB
- Allowed MIME types: `image/*`

#### Bucket 3: reviews
- Name: `reviews`
- Public: ✅ Yes
- File size limit: 5MB
- Allowed MIME types: `image/*`

### Step 5: Configure Storage Policies

1. Go to **SQL Editor** → **New Query**
2. Copy the entire contents of `supabase/storage-policies.sql`
3. Paste into the SQL editor
4. Click **Run**

This will set up all the necessary policies for your storage buckets:
- **Products bucket**: Public read, authenticated upload/update/delete
- **Avatars bucket**: Public read, users can manage their own avatars
- **Reviews bucket**: Public read, authenticated users can upload

**Alternative: Use Supabase Dashboard UI**

If you prefer using the UI, for each bucket:
1. Go to **Storage** → Click bucket name → **Policies** tab
2. Click **New Policy** → **Get started quickly** → **Allow public read access**
3. Click **New Policy** → **Get started quickly** → **Allow authenticated uploads**

### Step 6: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize confirmation and password reset emails

### Step 7: Create Admin User (Optional)

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Add email and password for admin account
4. After user is created, go to **Table Editor** → **profiles**
5. Find the user's profile
6. Change `role` from `customer` to `admin`

## 🗂️ Database Structure

Your database now has these tables:

### Core Tables
- **profiles** - User profiles and authentication
- **categories** - Product categories (Rings, Necklaces, etc.)
- **collections** - Special collections (Bridal, Premium, etc.)
- **products** - Main product catalog
- **product_variants** - Product variations (sizes, colors)

### Shopping Tables
- **cart_items** - User shopping carts
- **wishlist_items** - User wishlists
- **addresses** - Shipping addresses

### Order Tables
- **orders** - Order records
- **order_items** - Individual items in orders

### Engagement Tables
- **reviews** - Product reviews and ratings
- **notifications** - User notifications
- **product_views** - Analytics tracking

## 🔐 Security Features Enabled

✅ Row Level Security (RLS) on all tables
✅ Users can only access their own data
✅ Public read access for products, categories, collections
✅ Admin role for management functions
✅ Secure authentication with JWT tokens

## 📊 Sample Data Included

Your database now has:
- 6 Categories (Rings, Necklaces, Earrings, Bracelets, Anklets, Sets)
- 4 Collections (Bridal, Casual, Premium Gold, Diamond)
- 12 Products with realistic data
- Product variants for rings (sizes 5-9)

## 🧪 Testing the Setup

### Test 1: Check Tables
1. Go to **Table Editor**
2. Click on **products** table
3. You should see 12 sample products

### Test 2: Check Authentication
1. Go to **Authentication** → **Users**
2. Try adding a test user
3. Check if profile is auto-created in **profiles** table

### Test 3: Test API from App
Run your app and check if products load:
```bash
npx expo start
```

## 🔧 Service Files Created

Your app now has these service files ready to use:

- `lib/supabase.ts` - Supabase client configuration
- `services/auth.service.ts` - Authentication functions
- `services/products.service.ts` - Product CRUD operations
- `services/cart.service.ts` - Shopping cart management
- `services/wishlist.service.ts` - Wishlist management
- `services/orders.service.ts` - Order processing
- `services/categories.service.ts` - Categories and collections
- `types/database.types.ts` - TypeScript type definitions

## 📱 Next Steps

Now that your backend is set up, you can:

1. **Update UI components** to fetch real data from Supabase
2. **Implement authentication** screens (login/signup)
3. **Connect cart** to real database
4. **Enable order placement** with real data
5. **Add product management** for admin

## 🆘 Troubleshooting

### Issue: "relation does not exist"
**Solution**: Make sure you ran the `schema.sql` file completely

### Issue: "permission denied for table"
**Solution**: Check RLS policies are enabled and configured correctly

### Issue: "Invalid API key"
**Solution**: Double-check your `.env` file has correct credentials

### Issue: Products not showing
**Solution**: Make sure you ran `seed-data.sql` to populate sample data

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ All tables appear in Table Editor
- ✅ Sample products are visible in products table
- ✅ You can create a test user in Authentication
- ✅ Storage buckets are created and accessible
- ✅ App connects without errors

## 📞 Support

If you encounter any issues:
1. Check Supabase logs in Dashboard → Logs
2. Check browser console for errors
3. Verify all SQL scripts ran successfully
4. Ensure environment variables are loaded

---

**Your backend is now ready for production! 🚀**
