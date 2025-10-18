# Shop with Tima - Jewelry E-commerce App

A beautiful and modern React Native jewelry e-commerce application built with Expo Router, featuring a comprehensive shopping experience for luxury jewelry.

## 🚀 Features

### Core Functionality
- **Home Screen**: Featured products, categories, and hero section with animations
- **Product Catalog**: Browse jewelry by categories (Rings, Necklaces, Earrings, etc.)
- **Product Details**: Detailed product views with image gallery, sizing, and specifications
- **Shopping Cart**: Add/remove items, quantity management, order summary
- **Wishlist**: Save favorite items for later with heart animations
- **Search**: Advanced search with filters and trending suggestions
- **Admin Dashboard**: Product management and analytics (password: admin2025)

### User Experience
- **Responsive Design**: Optimized for mobile devices
- **Modern UI**: Clean, elegant design with beautiful animations
- **Smooth Animations**: React Native Reanimated for 60fps performance
- **Haptic Feedback**: Tactile responses on all interactions
- **Gradient Backgrounds**: Beautiful LinearGradient effects
- **Micro-interactions**: Delightful press animations and transitions
- **Navigation**: Tab-based navigation with intuitive flow
- **Authentication**: Admin access protection
- **Contact Integration**: WhatsApp and phone call support
- **Loading States**: Shimmer placeholders for better UX
- **Floating Action Button**: Quick access to support options

## 🛠 Tech Stack

- **Framework**: React Native with Expo (~54.0.0)
- **Navigation**: Expo Router v6 (file-based routing)
- **Animations**: React Native Reanimated (~4.1.1)
- **Gestures**: React Native Gesture Handler (~2.28.0)
- **Haptics**: Expo Haptics (~15.0.7)
- **Gradients**: Expo Linear Gradient (~15.0.7)
- **Blur Effects**: Expo Blur (~15.0.7)
- **UI Components**: React Native core components
- **Icons**: Lucide React Native (^0.475.0)
- **Styling**: StyleSheet API with modern design patterns
- **State Management**: React Hooks (useState, useEffect)
- **Type Safety**: TypeScript (~5.9.2)

## 📱 Screens Overview

### Main Tabs
1. **Home** (`/`) - Featured products and categories
2. **Categories** (`/categories`) - Browse all product categories
3. **Wishlist** (`/wishlist`) - Saved favorite items
4. **Cart** (`/cart`) - Shopping cart and checkout
5. **Profile** (`/profile`) - User profile and settings

### Additional Screens
- **Product Detail** (`/product/[id]`) - Individual product pages
- **Category View** (`/category/[name]`) - Products by category
- **Search** (`/search`) - Search functionality
- **Admin Dashboard** (`/admin`) - Admin management panel
- **Checkout** (`/checkout`) - Purchase flow
- **Orders** (`/orders`) - Order history
- **Settings** (`/settings`) - Account settings
- **Help** (`/help`) - Support and FAQ
- **Privacy** (`/privacy`) - Privacy policy

## 🎨 Design System

### Colors
- **Primary Gold**: `#D4AF37` - Main brand color
- **Background**: `#FFF8F0` - Warm cream background
- **Text Primary**: `#1A1A1A` - Main text color
- **Text Secondary**: `#8E8E93` - Secondary text
- **Success**: `#34C759` - Success states
- **Error**: `#FF3B30` - Error states
- **WhatsApp**: `#25D366` - WhatsApp integration

### Typography
- **Headers**: Bold, modern sans-serif
- **Body**: Clean, readable text
- **Prices**: Emphasized with brand color

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tima-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

### Scripts
- `npm run dev` - Start development server
- `npm run build:web` - Build for web
- `npm run lint` - Run linting
- `npm start` - Start with cache clear

## 📂 Project Structure

```
tima-app/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── categories.tsx # Categories screen
│   │   ├── wishlist.tsx   # Wishlist screen
│   │   ├── cart.tsx       # Shopping cart
│   │   └── profile.tsx    # Profile screen
│   ├── product/           # Product detail screens
│   ├── category/          # Category view screens
│   ├── admin.tsx          # Admin dashboard
│   ├── search.tsx         # Search screen
│   └── _layout.tsx        # Root layout
├── hooks/                 # Custom React hooks
├── assets/                # Static assets
└── README.md             # Project documentation
```

## 🔧 Configuration

### Environment Setup
The app uses Expo's managed workflow with the following key configurations:

- **Expo SDK**: ~54.0.0
- **React Native**: 0.81.4
- **TypeScript**: Enabled
- **Navigation**: Expo Router v6

### Key Dependencies
- `expo-router` - File-based navigation
- `lucide-react-native` - Modern icons
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen optimization

## 👨‍💼 Admin Features

Access the admin dashboard at `/admin` with password: `admin2025`

### Admin Capabilities
- **Dashboard Overview**: Sales statistics and metrics
- **Product Management**: Add, edit, delete products
- **Order Tracking**: Monitor order status
- **Analytics**: View performance data
- **Quick Actions**: Streamlined management tools

## 📞 Contact Integration

The app includes integrated contact features:
- **WhatsApp**: Direct messaging for customer support
- **Phone**: One-tap calling functionality
- **Product Inquiries**: Context-aware messaging

## 🛡️ Security Features

- **Admin Authentication**: Password-protected admin access
- **Input Validation**: Form validation and sanitization
- **Safe Navigation**: Protected routes and error handling

## 🎯 Future Enhancements

- **Payment Integration**: Stripe/PayPal integration
- **User Authentication**: Full user account system
- **Push Notifications**: Order updates and promotions
- **Offline Support**: Cached product data
- **Analytics**: User behavior tracking
- **Multi-language**: Internationalization support

## 🐛 Known Issues

- Product data is currently static (to be replaced with API)
- Payment flow is simulated
- User authentication is basic

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support and inquiries:
- **WhatsApp**: +234 801 234 5678
- **Email**: support@shopwithtima.com
- **Website**: www.shopwithtima.com

---

**Shop with Tima** - Your trusted partner for luxury jewelry 💎
