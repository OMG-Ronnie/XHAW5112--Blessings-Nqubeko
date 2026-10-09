import React, { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SHADOW } from '../theme';
import { HERO_IMAGES } from '../data/activities';
import { FieldLabel, PrimaryButton, RemoteImage, TextInputField } from '../components/ui';

const SUBJECTS = [
  'Select a package or activity',
  'Ultimate Adventure Day',
  'Family Explorer Package',
  'Mountain Adventure Package',
  'Corporate Team Challenge',
  'Ziplining Adventure',
  'Kayaking Experience',
  'Rock Climbing Session',
  'Custom Quote & Calculation',
];

const OFFICE = [
  { icon: '📍', label: 'ADDRESS', value: '12 Loop Street, Cape Town, 8001' },
  { icon: '🕒', label: 'OPERATING HOURS', value: 'Mon - Fri: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM' },
  { icon: '✉', label: 'EMAIL', value: 'info@adventureescape.co.za' },
  { icon: '📞', label: 'PHONE', value: '+27 (0) 21 555 4321' },
];

export const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const canSend = name.trim() !== '' && /\S+@\S+\.\S+/.test(email) && message.trim() !== '';

  const send = () => {
    if (!canSend) return;
    const chosenSubject = subject || SUBJECTS[0];
    setSending(true);
    // Demo send: swap for your real API / email service.
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 900);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View>
        <RemoteImage uri={HERO_IMAGES.contact} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>GET IN TOUCH</Text>
          </View>
          <Text style={styles.heroTitle}>Contact Us</Text>
          <Text style={styles.heroSubtitle}>
            Reach out for package bookings, activity quotes or any enquiries.
          </Text>
        </View>
      </View>

      {/* Form card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Enquire About Packages & Activities</Text>
        <Text style={styles.cardSub}>
          Share your preferred package or activity, and our team will reply within one business
          day.
        </Text>

        {sent && (
          <View style={styles.sentBox}>
            <Text style={styles.sentText}>
              ✓ Message sent! Our team will get back to you shortly.
            </Text>
          </View>
        )}

        <FieldLabel>YOUR NAME</FieldLabel>
        <TextInputField placeholder="Enter your full name for the booking" value={name} onChangeText={setName} />
        <FieldLabel>EMAIL ADDRESS</FieldLabel>
        <TextInputField
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FieldLabel>PHONE NUMBER</FieldLabel>
        <TextInputField
          placeholder="+27 (0) 00 000 0000"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <FieldLabel>SUBJECT</FieldLabel>
        <TouchableOpacity style={styles.select} onPress={() => setPickerOpen((v) => !v)}>
          <Text style={[styles.selectText, subject === '' && { color: '#9AA8A0', fontWeight: '600' }]}>
            {subject || 'Select a package or activity'}
          </Text>
          <Text style={styles.selectChevron}>{pickerOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {pickerOpen && (
          <View style={styles.selectMenu}>
            {SUBJECTS.map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.selectOption}
                onPress={() => {
                  setSubject(s);
                  setPickerOpen(false);
                }}
              >
                <Text style={[styles.selectOptionText, s === subject && styles.selectOptionActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <FieldLabel>MESSAGE</FieldLabel>
        <TextInputField
          placeholder="Tell us which package or activity you are interested in, your preferred dates, group size and any special requests."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <PrimaryButton title={sending ? 'Sending...' : 'Send Enquiry'} onPress={send} disabled={!canSend || sending} />
        <Text style={styles.privacyNote}>
          🛡 Your information is safe. We never share your data.
        </Text>
      </View>

      {/* Office card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Our Office Details</Text>
        {OFFICE.map((o) => (
          <View key={o.label} style={styles.officeRow}>
            <View style={styles.officeIcon}>
              <Text style={styles.officeIconText}>{o.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.officeLabel}>{o.label}</Text>
              <Text style={styles.officeValue}>{o.value}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@adventureescape.co.za')}>
          <Text style={styles.linkText}>info@adventureescape.co.za</Text>
        </TouchableOpacity>
      </View>

      {/* Map card */}
      <View style={[styles.card, styles.mapCard]}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapPin}>
            <Text style={styles.mapPinText}>📍</Text>
          </View>
          <Text style={styles.mapStreets}>Loop · Bree · Adderley</Text>
        </View>
        <View style={styles.mapFooter}>
          <Text style={styles.mapTitle}>Adventure Escape SA</Text>
          <Text style={styles.mapSub}>12 Loop Street, Cape Town, 8001, Western Cape</Text>
        </View>
      </View>

      {/* Social card */}
      <View style={styles.socialCard}>
        <Text style={styles.socialHeading}>FOLLOW OUR ADVENTURES</Text>
        <View style={styles.socialRow}>
          {['f', '◎', '▶', '𝕏'].map((icon) => (
            <View key={icon} style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>{icon}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.socialSub}>@AdventureEscapeSA — tag us in your adventures!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 24 },
  heroImage: { height: 220 },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.heroOverlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heroBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  heroBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#fff' },
  heroSubtitle: { fontSize: 12, color: '#EAF3EA', marginTop: 4 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    ...SHADOW,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  cardSub: { fontSize: 12, color: COLORS.textLight, marginBottom: 14 },
  sentBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  sentText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.primaryLight,
    marginBottom: 14,
  },
  selectText: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  selectChevron: { fontSize: 12, color: COLORS.primary },
  selectMenu: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  selectOption: { paddingHorizontal: 14, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  selectOptionText: { fontSize: 14, color: COLORS.text },
  selectOptionActive: { color: COLORS.primary, fontWeight: '700' },
  privacyNote: { fontSize: 11, color: COLORS.textLight, textAlign: 'center', marginTop: 10 },
  officeRow: { flexDirection: 'row', marginBottom: 14 },
  officeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  officeIconText: { fontSize: 15 },
  officeLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8, color: COLORS.textLight },
  officeValue: { fontSize: 14, color: COLORS.text, fontWeight: '600', marginTop: 2 },
  linkText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  mapCard: { padding: 0, overflow: 'hidden' },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#EDE6D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinText: { color: '#fff', fontSize: 16 },
  mapStreets: { marginTop: 6, fontSize: 11, color: '#8A7F66' },
  mapFooter: { padding: 14, borderTopWidth: 1, borderTopColor: COLORS.border },
  mapTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  mapSub: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  socialCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    alignItems: 'center',
  },
  socialHeading: { color: '#8BC34A', fontWeight: '800', fontSize: 12, letterSpacing: 1, marginBottom: 14 },
  socialRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  socialBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  socialSub: { color: '#CFE3CF', fontSize: 12 },
});
