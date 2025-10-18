import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  Send,
  HelpCircle,
} from 'lucide-react-native';

const faqData = [
  {
    id: 1,
    question: 'How do I track my order?',
    answer: 'You can track your order by going to "My Orders" in your profile section. Each order will have a tracking number that you can use to monitor your delivery status.',
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all jewelry items. Items must be in original condition with all packaging. Custom or personalized items cannot be returned.',
  },
  {
    id: 3,
    question: 'How do I know if jewelry is authentic?',
    answer: 'All our jewelry comes with certificates of authenticity. We work only with verified suppliers and each piece is inspected by our experts before shipping.',
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, bank transfers, and WhatsApp orders. All payments are processed securely through encrypted channels.',
  },
  {
    id: 5,
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days within Nigeria. Express shipping is available for 1-2 business days. Free shipping is available for orders over ₦500,000.',
  },
  {
    id: 6,
    question: 'Can I resize my jewelry?',
    answer: 'Yes, we offer free resizing for rings within 30 days of purchase. For other jewelry items, resizing may be available depending on the design.',
  },
  {
    id: 7,
    question: 'Do you offer warranty?',
    answer: 'All our jewelry comes with a lifetime warranty against manufacturing defects. This covers repairs and maintenance but not damage from normal wear.',
  },
  {
    id: 8,
    question: 'How do I care for my jewelry?',
    answer: 'Store jewelry in a dry place, clean with a soft cloth, avoid chemicals and perfumes. We provide detailed care instructions with each purchase.',
  },
];

const contactMethods = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    subtitle: 'Chat with us instantly',
    icon: MessageCircle,
    color: '#25D366',
    action: () => {
      const phoneNumber = '+2348012345678';
      const message = 'Hi, I need help with Shop with Tima';
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
    },
  },
  {
    id: 'phone',
    title: 'Call Us',
    subtitle: 'Mon-Fri, 9AM-6PM',
    icon: Phone,
    color: '#007AFF',
    action: () => {
      const phoneNumber = '+2348012345678';
      Linking.openURL(`tel:${phoneNumber}`);
    },
  },
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'support@shopwithtima.com',
    icon: Mail,
    color: '#FF9500',
    action: () => {
      const email = 'support@shopwithtima.com';
      const subject = 'Support Request - Shop with Tima';
      Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
    },
  },
];

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState<'faq' | 'contact'>('faq');

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      Alert.alert('Error', 'Please enter your message.');
      return;
    }

    Alert.alert(
      'Message Sent',
      'Your message has been sent to our support team. We will get back to you within 24 hours.',
      [
        { text: 'OK', onPress: () => setContactMessage('') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'faq' && styles.activeTab]}
          onPress={() => setSelectedTab('faq')}>
          <HelpCircle size={20} color={selectedTab === 'faq' ? '#FFFFFF' : '#8E8E93'} strokeWidth={1.5} />
          <Text style={[styles.tabText, selectedTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'contact' && styles.activeTab]}
          onPress={() => setSelectedTab('contact')}>
          <MessageCircle size={20} color={selectedTab === 'contact' ? '#FFFFFF' : '#8E8E93'} strokeWidth={1.5} />
          <Text style={[styles.tabText, selectedTab === 'contact' && styles.activeTabText]}>
            Contact
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {selectedTab === 'faq' ? (
          <>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Search size={20} color="#8E8E93" strokeWidth={1.5} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* FAQ List */}
            <View style={styles.faqContainer}>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <View key={faq.id} style={styles.faqItem}>
                    <TouchableOpacity
                      style={styles.faqQuestion}
                      onPress={() => toggleFaq(faq.id)}>
                      <Text style={styles.questionText}>{faq.question}</Text>
                      {expandedFaq === faq.id ? (
                        <ChevronUp size={20} color="#D4AF37" strokeWidth={1.5} />
                      ) : (
                        <ChevronDown size={20} color="#8E8E93" strokeWidth={1.5} />
                      )}
                    </TouchableOpacity>
                    
                    {expandedFaq === faq.id && (
                      <View style={styles.faqAnswer}>
                        <Text style={styles.answerText}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <View style={styles.noResults}>
                  <Search size={48} color="#D0D0D0" strokeWidth={1} />
                  <Text style={styles.noResultsTitle}>No results found</Text>
                  <Text style={styles.noResultsText}>
                    Try different keywords or contact our support team
                  </Text>
                </View>
              )}
            </View>

            {/* Quick Help */}
            <View style={styles.quickHelpSection}>
              <Text style={styles.sectionTitle}>Still need help?</Text>
              <Text style={styles.sectionSubtitle}>
                Can't find what you're looking for? Our support team is here to help.
              </Text>
              
              <View style={styles.quickHelpButtons}>
                {contactMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <TouchableOpacity
                      key={method.id}
                      style={[styles.quickHelpButton, { borderColor: method.color }]}
                      onPress={method.action}>
                      <IconComponent size={24} color={method.color} strokeWidth={1.5} />
                      <Text style={[styles.quickHelpText, { color: method.color }]}>
                        {method.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Contact Methods */}
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>Get in Touch</Text>
              <Text style={styles.sectionSubtitle}>
                Choose your preferred way to contact our support team
              </Text>
              
              <View style={styles.contactMethods}>
                {contactMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <TouchableOpacity
                      key={method.id}
                      style={styles.contactMethod}
                      onPress={method.action}>
                      <View style={[styles.contactIcon, { backgroundColor: `${method.color}20` }]}>
                        <IconComponent size={24} color={method.color} strokeWidth={1.5} />
                      </View>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactTitle}>{method.title}</Text>
                        <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Contact Form */}
            <View style={styles.contactForm}>
              <Text style={styles.sectionTitle}>Send us a Message</Text>
              
              <View style={styles.messageContainer}>
                <TextInput
                  style={styles.messageInput}
                  placeholder="Describe your issue or question..."
                  value={contactMessage}
                  onChangeText={setContactMessage}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Send size={20} color="#FFFFFF" strokeWidth={1.5} />
                <Text style={styles.sendButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>

            {/* Business Hours */}
            <View style={styles.businessHours}>
              <View style={styles.hoursHeader}>
                <Clock size={20} color="#D4AF37" strokeWidth={1.5} />
                <Text style={styles.hoursTitle}>Business Hours</Text>
              </View>
              
              <View style={styles.hoursContent}>
                <View style={styles.hoursRow}>
                  <Text style={styles.hoursDay}>Monday - Friday</Text>
                  <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
                </View>
                <View style={styles.hoursRow}>
                  <Text style={styles.hoursDay}>Saturday</Text>
                  <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
                </View>
                <View style={styles.hoursRow}>
                  <Text style={styles.hoursDay}>Sunday</Text>
                  <Text style={styles.hoursTime}>Closed</Text>
                </View>
              </View>
            </View>
          </>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#D4AF37',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  faqContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  answerText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginTop: 12,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  quickHelpSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 16,
  },
  quickHelpButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickHelpButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 4,
  },
  quickHelpText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  contactMethods: {
    gap: 16,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  contactForm: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  messageContainer: {
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    marginBottom: 16,
  },
  messageInput: {
    fontSize: 16,
    color: '#1A1A1A',
    padding: 16,
    minHeight: 120,
  },
  sendButton: {
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  businessHours: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  hoursContent: {
    gap: 12,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursDay: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
