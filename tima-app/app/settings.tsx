import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Edit3,
  Save,
  ChevronRight,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: false,
    newsletter: true,
  });
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    address: '123 Victoria Island, Lagos',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    if (!userInfo.fullName || !userInfo.email || !userInfo.phone) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Profile Updated',
      'Your profile information has been updated successfully.',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
  };

  const handleChangePassword = () => {
    if (!userInfo.currentPassword || !userInfo.newPassword || !userInfo.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    if (userInfo.newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    Alert.alert(
      'Password Changed',
      'Your password has been changed successfully.',
      [{ text: 'OK', onPress: () => {
        setUserInfo({
          ...userInfo,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }}]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            router.push('/');
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          label: 'Order Updates',
          value: notifications.orders,
          onToggle: (value: boolean) => setNotifications({...notifications, orders: value}),
          type: 'switch',
        },
        {
          label: 'Promotions & Offers',
          value: notifications.promotions,
          onToggle: (value: boolean) => setNotifications({...notifications, promotions: value}),
          type: 'switch',
        },
        {
          label: 'Newsletter',
          value: notifications.newsletter,
          onToggle: (value: boolean) => setNotifications({...notifications, newsletter: value}),
          type: 'switch',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          label: 'Privacy Policy',
          onPress: () => router.push('/privacy'),
          type: 'navigation',
        },
        {
          label: 'Terms of Service',
          onPress: () => Alert.alert('Terms of Service', 'Terms of service content would be displayed here.'),
          type: 'navigation',
        },
        {
          label: 'Data & Privacy',
          onPress: () => Alert.alert('Data & Privacy', 'Data and privacy settings would be displayed here.'),
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          label: 'Help Center',
          onPress: () => router.push('/help'),
          type: 'navigation',
        },
        {
          label: 'Contact Us',
          onPress: () => Alert.alert('Contact Us', 'Contact information and support options.'),
          type: 'navigation',
        },
        {
          label: 'Report a Problem',
          onPress: () => Alert.alert('Report Problem', 'Problem reporting form would be displayed here.'),
          type: 'navigation',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}>
            <Save size={20} color="#D4AF37" strokeWidth={1.5} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}>
              <Edit3 size={16} color="#D4AF37" strokeWidth={1.5} />
              <Text style={styles.editButtonText}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileForm}>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <User size={16} color="#8E8E93" strokeWidth={1.5} />
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  placeholder="Full Name"
                  value={userInfo.fullName}
                  onChangeText={(text) => setUserInfo({...userInfo, fullName: text})}
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputContainer}>
                <Mail size={16} color="#8E8E93" strokeWidth={1.5} />
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  placeholder="Email Address"
                  value={userInfo.email}
                  onChangeText={(text) => setUserInfo({...userInfo, email: text})}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputContainer}>
                <Phone size={16} color="#8E8E93" strokeWidth={1.5} />
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  placeholder="Phone Number"
                  value={userInfo.phone}
                  onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
                  keyboardType="phone-pad"
                  editable={isEditing}
                />
              </View>

              <View style={styles.inputContainer}>
                <MapPin size={16} color="#8E8E93" strokeWidth={1.5} />
                <TextInput
                  style={[styles.input, !isEditing && styles.inputDisabled]}
                  placeholder="Address"
                  value={userInfo.address}
                  onChangeText={(text) => setUserInfo({...userInfo, address: text})}
                  multiline
                  editable={isEditing}
                />
              </View>
            </View>

            {isEditing && (
              <TouchableOpacity style={styles.saveProfileButton} onPress={handleSaveProfile}>
                <Text style={styles.saveProfileText}>Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Change Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          
          <View style={styles.passwordForm}>
            <View style={styles.inputContainer}>
              <Shield size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                value={userInfo.currentPassword}
                onChangeText={(text) => setUserInfo({...userInfo, currentPassword: text})}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={16} color="#8E8E93" strokeWidth={1.5} />
                ) : (
                  <Eye size={16} color="#8E8E93" strokeWidth={1.5} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Shield size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={userInfo.newPassword}
                onChangeText={(text) => setUserInfo({...userInfo, newPassword: text})}
                secureTextEntry={!showPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <Shield size={16} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={userInfo.confirmPassword}
                onChangeText={(text) => setUserInfo({...userInfo, confirmPassword: text})}
                secureTextEntry={!showPassword}
              />
            </View>

            <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
              <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            <View style={styles.settingsGroup}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingItem}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  
                  {item.type === 'switch' && (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#E5E5EA', true: '#D4AF37' }}
                      thumbColor="#FFFFFF"
                    />
                  )}
                  
                  {item.type === 'navigation' && (
                    <TouchableOpacity onPress={item.onPress}>
                      <ChevronRight size={20} color="#8E8E93" strokeWidth={1.5} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
          
          <Text style={styles.deleteWarning}>
            This action cannot be undone. All your data will be permanently deleted.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  saveButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
    marginLeft: 4,
  },
  profileForm: {
    gap: 12,
  },
  inputGroup: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  inputDisabled: {
    color: '#8E8E93',
  },
  saveProfileButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveProfileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordForm: {
    gap: 12,
  },
  changePasswordButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  changePasswordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsGroup: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteWarning: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
  },
});
