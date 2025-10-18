# 🚀 Backend Quick Start - 5 Minutes Setup

## What's Already Done ✅

1. ✅ Supabase dependencies installed
2. ✅ Supabase client configured
3. ✅ Database schema created (SQL file ready)
4. ✅ Sample data script ready
5. ✅ Service layer implemented
6. ✅ TypeScript types generated
7. ✅ Environment configuration set up

## What You Need to Do (5 Steps)

### Step 1: Create .env File (30 seconds)
Create a file named `.env` in your project root and add:
```
EXPO_PUBLIC_SUPABASE_URL=https://dawhduonnysdlzbyzgme.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhd2hkdW9ubnlzZGx6Ynl6Z21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTQxNjIsImV4cCI6MjA3NDc5MDE2Mn0.HBqJ1My7n9Z_t3nLUvdmZ6wmE7aH1gvchlwjbEFdKqg
```

### Step 2: Run Database Schema (2 minutes)
1. Open https://supabase.com/dashboard
2. Go to SQL Editor → New Query
3. Copy all content from `supabase/schema.sql`
4. Paste and click **Run**

### Step 3: Add Sample Data (1 minute)
1. In SQL Editor, create New Query
2. Copy all content from `supabase/seed-data.sql`
3. Paste and click **Run**

### Step 4: Create Storage Buckets (1 minute)
1. Go to Storage → New bucket
2. Create bucket named `products` (Public: Yes)
3. Create bucket named `avatars` (Public: Yes)
4. Create bucket named `reviews` (Public: Yes)

### Step 5: Test It! (30 seconds)
```bash
npx expo start
```

## 🎯 What You Get

After these 5 steps, your app will have:

### ✅ Complete Database
- 12 sample jewelry products
- 6 categories (Rings, Necklaces, Earrings, etc.)
- 4 collections (Bridal, Premium Gold, Diamond, Casual)
- User authentication system
- Shopping cart & wishlist tables
- Order management system
- Reviews & ratings system

### ✅ Ready-to-Use Services
```typescript
// Products
import { productsService } from '@/services/products.service';
const products = await productsService.getAll();
const featured = await productsService.getFeatured();

// Authentication
import { authService } from '@/services/auth.service';
await authService.signUp(email, password, fullName);
await authService.signIn(email, password);

// Cart
import { cartService } from '@/services/cart.service';
await cartService.addItem(userId, productId, quantity);
const cart = await cartService.getCart(userId);

// Wishlist
import { wishlistService } from '@/services/wishlist.service';
await wishlistService.addItem(userId, productId);

// Orders
import { ordersService } from '@/services/orders.service';
const order = await ordersService.createOrder(orderData);
```

### ✅ Security Features
- Row Level Security (RLS) enabled
- Users can only access their own data
- Admin role for management
- Secure JWT authentication

## 📊 Sample Data Overview

Your database will have:
- **Gold Diamond Ring** - ₦450,000 (Bestseller)
- **Rose Gold Engagement Ring** - ₦380,000 (New)
- **Pearl Necklace Set** - ₦280,000 (Limited)
- **Diamond Stud Earrings** - ₦320,000
- **Tennis Bracelet** - ₦680,000
- And 7 more products...

## 🔍 Verify Setup

Check if everything works:

1. **Database**: Go to Table Editor → products (should see 12 products)
2. **Auth**: Go to Authentication → Users (ready to add users)
3. **Storage**: Go to Storage (should see 3 buckets)
4. **App**: Run app and products should load

## ⚡ Pro Tips

1. **Admin Access**: After creating a user, change their role to 'admin' in profiles table
2. **Real Images**: Replace sample image URLs with your actual product photos
3. **Customization**: Edit products in Table Editor to match your inventory
4. **Testing**: Use Supabase Dashboard to test queries before implementing

## 🆘 Quick Fixes

**App not connecting?**
- Restart Expo dev server: `npx expo start -c`
- Check `.env` file exists and has correct values

**No products showing?**
- Verify `seed-data.sql` ran successfully
- Check Table Editor → products table

**Authentication errors?**
- Go to Authentication → Providers
- Ensure Email provider is enabled

## 📖 Full Documentation

For detailed setup and advanced features, see:
- `SUPABASE_SETUP.md` - Complete setup guide
- `README.md` - Project documentation

## 🎉 You're Ready!

Your backend is now fully configured and ready for production use!

Next steps:
1. Update UI components to use real data
2. Implement authentication screens
3. Connect cart and wishlist to database
4. Enable real order placement

Happy coding! 💎✨
