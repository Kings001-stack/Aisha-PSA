import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from 'lucide-react-native';

const privacySections = [
  {
    id: 1,
    title: 'Information We Collect',
    icon: Database,
    content: [
      'Personal information such as name, email address, phone number, and shipping address when you create an account or make a purchase.',
      'Payment information processed securely through our payment partners.',
      'Device information including IP address, browser type, and operating system.',
      'Usage data such as pages visited, products viewed, and search queries.',
      'Location data if you enable location services on your device.',
    ],
  },
  {
    id: 2,
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      'Process and fulfill your orders, including shipping and customer service.',
      'Send you order confirmations, shipping updates, and important account information.',
      'Improve our products and services based on your feedback and usage patterns.',
      'Personalize your shopping experience with relevant product recommendations.',
      'Prevent fraud and ensure the security of our platform.',
      'Comply with legal obligations and resolve disputes.',
    ],
  },
  {
    id: 3,
    title: 'Information Sharing',
    icon: Users,
    content: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'We may share information with trusted service providers who help us operate our business.',
      'Payment information is shared with secure payment processors to complete transactions.',
      'Shipping information is shared with delivery partners to fulfill orders.',
      'We may disclose information if required by law or to protect our rights.',
    ],
  },
  {
    id: 4,
    title: 'Data Security',
    icon: Lock,
    content: [
      'We use industry-standard encryption to protect your personal information.',
      'All payment transactions are processed through secure, PCI-compliant systems.',
      'Our servers are protected by firewalls and regular security monitoring.',
      'Access to personal information is restricted to authorized personnel only.',
      'We regularly update our security measures to protect against new threats.',
    ],
  },
  {
    id: 5,
    title: 'Your Rights',
    icon: Shield,
    content: [
      'Access: You can request a copy of the personal information we hold about you.',
      'Correction: You can update or correct your personal information at any time.',
      'Deletion: You can request deletion of your account and personal information.',
      'Portability: You can request your data in a portable format.',
      'Opt-out: You can unsubscribe from marketing communications at any time.',
      'Complaint: You can file a complaint with relevant data protection authorities.',
    ],
  },
];

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <View style={styles.introHeader}>
            <Shield size={32} color="#D4AF37" strokeWidth={1.5} />
            <Text style={styles.introTitle}>Your Privacy Matters</Text>
          </View>
          <Text style={styles.introText}>
            At Shop with Tima, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data when you use our services.
          </Text>
          <Text style={styles.lastUpdated}>
            Last updated: January 20, 2025
          </Text>
        </View>

        {/* Privacy Sections */}
        {privacySections.map((section) => {
          const IconComponent = section.icon;
          return (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <IconComponent size={20} color="#D4AF37" strokeWidth={1.5} />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              
              <View style={styles.sectionContent}>
                {section.content.map((item, index) => (
                  <View key={index} style={styles.contentItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.contentText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* Cookies Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Database size={20} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.sectionTitle}>Cookies and Tracking</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <Text style={styles.contentText}>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
            </Text>
            
            <View style={styles.cookieTypes}>
              <View style={styles.cookieType}>
                <Text style={styles.cookieTypeTitle}>Essential Cookies</Text>
                <Text style={styles.cookieTypeDesc}>Required for basic site functionality</Text>
              </View>
              <View style={styles.cookieType}>
                <Text style={styles.cookieTypeTitle}>Analytics Cookies</Text>
                <Text style={styles.cookieTypeDesc}>Help us understand how you use our site</Text>
              </View>
              <View style={styles.cookieType}>
                <Text style={styles.cookieTypeTitle}>Marketing Cookies</Text>
                <Text style={styles.cookieTypeDesc}>Used to show you relevant advertisements</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Data Retention */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Database size={20} color="#D4AF37" strokeWidth={1.5} />
            </View>
            <Text style={styles.sectionTitle}>Data Retention</Text>
          </View>
          
          <View style={styles.sectionContent}>
            <Text style={styles.contentText}>
              We retain your personal information only as long as necessary to provide our services and comply with legal obligations:
            </Text>
            
            <View style={styles.retentionPeriods}>
              <View style={styles.retentionItem}>
                <Text style={styles.retentionType}>Account Information</Text>
                <Text style={styles.retentionPeriod}>Until account deletion</Text>
              </View>
              <View style={styles.retentionItem}>
                <Text style={styles.retentionType}>Order History</Text>
                <Text style={styles.retentionPeriod}>7 years for tax purposes</Text>
              </View>
              <View style={styles.retentionItem}>
                <Text style={styles.retentionType}>Marketing Data</Text>
                <Text style={styles.retentionPeriod}>Until you unsubscribe</Text>
              </View>
              <View style={styles.retentionItem}>
                <Text style={styles.retentionType}>Support Communications</Text>
                <Text style={styles.retentionPeriod}>3 years</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Privacy?</Text>
          <Text style={styles.contactText}>
            If you have any questions about this privacy policy or how we handle your personal information, please contact us:
          </Text>
          
          <View style={styles.contactDetails}>
            <Text style={styles.contactDetail}>Email: privacy@shopwithtima.com</Text>
            <Text style={styles.contactDetail}>Phone: +234 801 234 5678</Text>
            <Text style={styles.contactDetail}>Address: 123 Victoria Island, Lagos, Nigeria</Text>
          </View>
        </View>

        {/* Changes to Policy */}
        <View style={styles.changesSection}>
          <Text style={styles.changesTitle}>Changes to This Policy</Text>
          <Text style={styles.changesText}>
            We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on our app and updating the "Last updated" date.
          </Text>
        </View>

        {/* Consent */}
        <View style={styles.consentSection}>
          <Text style={styles.consentTitle}>Your Consent</Text>
          <Text style={styles.consentText}>
            By using our app and services, you consent to the collection and use of your information as described in this privacy policy. If you do not agree with this policy, please do not use our services.
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
  },
  introSection: {
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
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  introText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 24,
    marginBottom: 16,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
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
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sectionContent: {
    gap: 12,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
    marginTop: 8,
    marginRight: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
    flex: 1,
  },
  cookieTypes: {
    marginTop: 12,
    gap: 12,
  },
  cookieType: {
    backgroundColor: '#F5F5F7',
    padding: 12,
    borderRadius: 8,
  },
  cookieTypeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cookieTypeDesc: {
    fontSize: 12,
    color: '#8E8E93',
  },
  retentionPeriods: {
    marginTop: 12,
    gap: 8,
  },
  retentionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  retentionType: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  retentionPeriod: {
    fontSize: 14,
    color: '#8E8E93',
  },
  contactSection: {
    backgroundColor: '#E8F5E8',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactDetails: {
    gap: 8,
  },
  contactDetail: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500',
  },
  changesSection: {
    backgroundColor: '#FFF3E0',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  changesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  changesText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  consentSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  consentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: 12,
  },
  consentText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
});
