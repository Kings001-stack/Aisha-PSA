import { Tabs } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { Chrome as Home, Grid3x3 as Categories, Heart, ShoppingBag, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <Home 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
          tabBarAccessibilityLabel: 'Home Tab',
        }}
      />
      <Tabs.Screen
        name="index_enhanced"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ size, color, focused }) => (
            <Categories 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
          tabBarAccessibilityLabel: 'Categories Tab',
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ size, color, focused }) => (
            <Heart 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5}
              fill={focused ? color : 'transparent'}
            />
          ),
          tabBarAccessibilityLabel: 'Wishlist Tab',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color, focused }) => (
            <ShoppingBag 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
          tabBarAccessibilityLabel: 'Shopping Cart Tab',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <User 
              size={focused ? size + 2 : size} 
              color={color} 
              strokeWidth={focused ? 2 : 1.5} 
            />
          ),
          tabBarAccessibilityLabel: 'Profile Tab',
        }}
      />
      <Tabs.Screen
        name="profile_animated"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 24,
    height: 85,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  tabBarIcon: {
    marginBottom: -2,
  },
});