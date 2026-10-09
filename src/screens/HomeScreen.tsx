import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ACTIVITIES, HERO_IMAGES } from '../data/activities';
import { COLORS, SHADOW, formatRand } from '../theme';
import { PriceBubble, PrimaryButton, RemoteImage, Stars, Tag } from '../components/ui';
import { ActivityCard } from '../components/cards';
import { TabKey } from '../navigation';
import { TESTIMONIALS } from '../data/team';

const STATS = [
  { value: '7', label: 'Adventures' },
  { value: '5,000+', label: 'Adventurers' },
  { value: 'R750 - R1500', label: 'Priced Per Package' },
];

export const HomeScreen: React.FC<{ onNavigate: (tab: TabKey) => void; onOpenActivity: (id: string) => void }> = ({
  onNavigate,
  onOpenActivity,
}) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    {/* Hero */}
    <View>
      <RemoteImage uri={HERO_IMAGES.home} style={styles.heroImage} />
      <View style={styles.heroOverlay}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>WESTERN CAPE, SOUTH AFRICA</Text>
        </View>
        <Text style={styles.heroTitle}>Adventure Escape SA</Text>
        <Text style={styles.heroSubtitle}>
          Explore the Western Cape's best outdoor adventures, high safety standards, expert local
          guides, and honest pricing.
        </Text>
        <TouchableOpacity style={styles.heroBtn} onPress={() => onNavigate('Activities')}>
          <Text style={styles.heroBtnText}>View Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.heroBtn, styles.heroBtnGhost]}
          onPress={() => onNavigate('Fees')}
        >
          <Text style={[styles.heroBtnText, { color: '#fff' }]}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Stats strip */}
    <View style={styles.statsStrip}>
      {STATS.map((s) => (
        <View key={s.label} style={styles.statItem}>
          <Text style={styles.statValue}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>

    {/* Featured adventures */}
    <View style={styles.section}>
      <Text style={styles.eyebrow}>OUR ADVENTURES</Text>
      <Text style={styles.sectionTitle}>Featured Adventures</Text>
      <Text style={styles.sectionSubtitle}>
        Hand-picked Western Cape experiences for thrill seekers and nature lovers alike.
      </Text>
      {ACTIVITIES.filter((a) => ['mountain', 'ultimate', 'zipline'].includes(a.id)).map((a) => (
        <ActivityCard key={a.id} activity={a} onPress={onOpenActivity} />
      ))}
      <PrimaryButton
        title="View All Activities"
        variant="outline"
        onPress={() => onNavigate('Activities')}
      />
    </View>

    {/* Why choose us */}
    <View style={styles.whyWrap}>
      <Text style={styles.eyebrowCenter}>OUR COMMITMENT</Text>
      <Text style={styles.sectionTitleCenter}>Why Choose Us</Text>
      <Text style={styles.sectionSubtitleCenter}>
        Everything you need for an unforgettable, safe outdoor experience.
      </Text>
      {[
        {
          icon: '👤',
          title: 'Expert Guides',
          body: 'All our guides hold nationally recognised outdoor leadership certifications with 5-15 years of experience leading adventures across the Western Cape.',
        },
        {
          icon: '🛡',
          title: 'Safety First',
          body: 'We operate to the highest of South African adventure industry safety protocols, with full insurance coverage and risk assessments on every excursion.',
        },
        {
          icon: '💰',
          title: 'Best Prices',
          body: 'Incredible value with transparent per-person pricing. Combine multiple activities and automatically unlock bulk booking discounts.',
        },
        {
          icon: '📍',
          title: 'Local Knowledge',
          body: 'Born-and-bred Western Cape adventurers who know every trail, wave, and canyon. Unmatched local insight on every booking.',
        },
      ].map((item) => (
        <View key={item.title} style={styles.whyCard}>
          <Text style={styles.whyIcon}>{item.icon}</Text>
          <Text style={styles.whyTitle}>{item.title}</Text>
          <Text style={styles.whyBody}>{item.body}</Text>
        </View>
      ))}
    </View>

    {/* Testimonials */}
    <View style={styles.testimonials}>
      <Text style={styles.testiEyebrow}>TESTIMONIALS</Text>
      <Text style={styles.testiTitle}>What Our Adventurers Say</Text>
      {TESTIMONIALS.map((t) => (
        <View key={t.name} style={styles.testiCard}>
          <Text style={styles.testiQuote}>“{t.quote}”</Text>
          <View style={styles.testiFooter}>
            <View style={styles.testiAvatar}>
              <Text style={styles.testiAvatarText}>{t.name.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.testiName}>{t.name}</Text>
              <Text style={styles.testiCity}>{t.city}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>

    {/* CTA + footer */}
    <View style={styles.ctaCard}>
      <Text style={styles.ctaTitle}>Plan Your Adventure Today</Text>
      <Text style={styles.ctaBody}>
        Get personalized rate sheets or start adding activities to receive an instant group
        discount estimate. Our team is ready to build your perfect Western Cape escape.
      </Text>
      <TouchableOpacity style={styles.ctaButton} onPress={() => onNavigate('Contact')}>
        <Text style={styles.ctaButtonText}>Request Quotation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onNavigate('Activities')}>
        <Text style={styles.ctaGhost}>Browse All Activities</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerBrand}>ADVENTURE ESCAPE SA</Text>
      <Text style={styles.footerBody}>
        Your premier outdoor adventure booking platform based in the Western Cape, South Africa.
        Discover, plan, and book your next escape.
      </Text>
      <Text style={styles.footerHeading}>QUICK LINKS</Text>
      {(['Home', 'Activities', 'Fees', 'About', 'Contact'] as TabKey[]).map((t) => (
        <TouchableOpacity key={t} onPress={() => onNavigate(t)}>
          <Text style={styles.footerLink}>{t}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.footerHeading}>CONTACT DETAILS</Text>
      <Text style={styles.footerInfo}>info@adventureescape.co.za</Text>
      <Text style={styles.footerInfo}>+27 (0) 21 555 4321</Text>
      <Text style={styles.footerInfo}>12 Loop Street, Cape Town, 8001</Text>
      <Text style={styles.footerInfo}>Mon-Fri: 08:00 - 17:00 SAST</Text>
      <Text style={styles.footerCopy}>© 2024 Adventure Escape SA. All rights reserved.</Text>
    </View>
  </ScrollView>
);


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 24 },
  heroImage: { height: 340 },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.heroOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heroBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 14,
  },
  heroBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  heroTitle: { fontSize: 34, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 10 },
  heroSubtitle: {
    fontSize: 14,
    color: '#EAF3EA',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  heroBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 40,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  heroBtnGhost: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#fff' },
  heroBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  statsStrip: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    paddingVertical: 18,
    marginBottom: 20,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1, color: COLORS.primary, marginBottom: 4 },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: COLORS.textLight, marginBottom: 16, lineHeight: 18 },
  eyebrowCenter: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  sectionTitleCenter: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 4, textAlign: 'center' },
  sectionSubtitleCenter: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 18,
  },
  whyWrap: { paddingHorizontal: 16, marginBottom: 24 },
  whyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    ...SHADOW,
  },
  whyIcon: { fontSize: 26, marginBottom: 8 },
  whyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  whyBody: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', lineHeight: 18 },
  testimonials: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 28,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  testiEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#8BC34A',
    textAlign: 'center',
    marginBottom: 4,
  },
  testiTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  testiCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  testiQuote: { fontSize: 13, color: '#E8F0E8', lineHeight: 19, fontStyle: 'italic', marginBottom: 12 },
  testiFooter: { flexDirection: 'row', alignItems: 'center' },
  testiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  testiAvatarText: { color: '#fff', fontWeight: '800' },
  testiName: { color: '#fff', fontWeight: '700', fontSize: 13 },
  testiCity: { color: '#A8C3A8', fontSize: 11 },
  ctaCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 8, textAlign: 'center' },
  ctaBody: {
    fontSize: 13,
    color: '#D7E8D7',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 36,
    marginBottom: 12,
  },
  ctaButtonText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  ctaGhost: { color: '#D7E8D7', fontSize: 14, fontWeight: '600' },
  footer: { paddingHorizontal: 16, paddingBottom: 8 },
  footerBrand: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginBottom: 8 },
  footerBody: { fontSize: 12, color: COLORS.textLight, lineHeight: 17, marginBottom: 16 },
  footerHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 6,
  },
  footerLink: { fontSize: 13, color: COLORS.primary, marginBottom: 6, fontWeight: '600' },
  footerInfo: { fontSize: 12, color: COLORS.textLight, marginBottom: 4 },
  footerCopy: { fontSize: 11, color: COLORS.textLight, marginTop: 14 },
});
