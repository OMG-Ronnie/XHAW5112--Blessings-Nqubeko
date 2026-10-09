import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOW } from '../theme';
import { TEAM } from '../data/team';
import { HERO_IMAGES } from '../data/activities';
import { PrimaryButton, RemoteImage } from '../components/ui';
import { TabKey } from '../navigation';

const CHECKLIST = [
  'Safety Certified',
  'Expert Local Guides',
  'Transparent Pricing',
  'Group Discounts Available',
  'Fully Insured',
];

const VALUES = [
  { icon: '🎯', title: 'Safety First', body: 'Full insurance & risk assessments on every excursion.' },
  { icon: '🌿', title: 'Eco-Conscious', body: 'Leave No Trace. Local conservation engagement.' },
  { icon: '👥', title: 'Community', body: 'Proudly 1A. Local guides & small business support.' },
  { icon: '💳', title: 'Honest Pricing', body: 'R350-R1,200 pp. No hidden fees, ever.' },
];

export const AboutScreen: React.FC<{ onNavigate: (tab: TabKey) => void }> = ({ onNavigate }) => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    {/* Hero */}
    <View>
      <RemoteImage uri={HERO_IMAGES.about} style={styles.heroImage} />
      <View style={styles.heroOverlay}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>WESTERN CAPE, SOUTH AFRICA</Text>
        </View>
        <Text style={styles.heroTitle}>About Adventure Escape SA</Text>
        <Text style={styles.heroSubtitle}>
          Born from a love of the Western Cape wilderness, guiding adventurers since 2015.
        </Text>
        <View style={styles.statsRow}>
          {[
            { v: '7', l: 'Adventures' },
            { v: '5,000+', l: 'Adventurers' },
            { v: '10+', l: 'Years Exp.' },
            { v: '4.9 ★', l: 'Avg. Rating' },
          ].map((s) => (
            <View key={s.l} style={styles.statCell}>
              <Text style={styles.statValue}>{s.v}</Text>
              <Text style={styles.statLabel}>{s.l}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>

    {/* Our story */}
    <View style={styles.section}>
      <Text style={styles.eyebrow}>OUR STORY</Text>
      <Text style={styles.h1}>Our Story & Heritage</Text>
      <View style={styles.imageCard}>
        <RemoteImage uri={HERO_IMAGES.mountain} style={styles.imageCardImg} />
        <View style={styles.imageCardBadge}>
          <Text style={styles.imageCardBadgeText}>Western Cape Specialists Since 2015</Text>
        </View>
      </View>
      <Text style={styles.body}>
        Founded in 2015, Adventure Escape SA was built on a passion for sharing the untamed beauty
        of the Western Cape. From Table Mountain climbs to Gansbaai marine excursions, we curate
        secure and memorable adventures.
      </Text>
      <Text style={styles.body}>
        We operate in partnership with top certified guides, offering a single streamlined platform
        where you can build, calculate, and coordinate group itineraries seamlessly.
      </Text>
      {CHECKLIST.map((c) => (
        <View key={c} style={styles.checkRow}>
          <Text style={styles.checkMark}>✓</Text>
          <Text style={styles.checkText}>{c}</Text>
        </View>
      ))}
    </View>

    {/* Team */}
    <View style={styles.teamWrap}>
      <Text style={styles.eyebrow}>THE TEAM</Text>
      <Text style={styles.h1}>Meet Our Team</Text>
      <Text style={styles.body}>
        Passionate locals with deep knowledge of every trail, wave, and canyon in the Western Cape.
      </Text>
      {TEAM.map((member) => (
        <View key={member.name} style={styles.teamCard}>
          <View style={styles.teamLeft}>
            <View style={styles.teamPhoto}>
              <Text style={styles.teamPhotoText}>{member.initials}</Text>
            </View>
            <View style={styles.teamPhotoSmall} />
          </View>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{member.name}</Text>
            <Text style={styles.teamRole}>{member.role}</Text>
            <Text style={styles.teamBio}>{member.bio}</Text>
            <Text style={styles.teamLoc}>📍 {member.location}</Text>
          </View>
        </View>
      ))}
    </View>

    {/* What drives us */}
    <View style={styles.drivesWrap}>
      <Text style={styles.eyebrow}>OUR COMMITMENT</Text>
      <Text style={styles.h1}>What Drives Us</Text>
      <Text style={styles.body}>
        Our mission and values shape every adventure we curate for you.
      </Text>

      <View style={styles.missionCard}>
        <View style={styles.missionHeader}>
          <View style={styles.missionIcon}>
            <Text style={styles.missionIconText}>◎</Text>
          </View>
          <Text style={styles.missionTitle}>Our Mission</Text>
        </View>
        <Text style={styles.body}>
          To make booking high-safety, certified Western Cape excursions accessible, transparent,
          and direct for adventurers worldwide. We believe everyone deserves an unforgettable
          outdoor experience without the complexity.
        </Text>
        <View style={styles.missionPill}>
          <Text style={styles.missionPillText}>Adventure for Everyone</Text>
        </View>
      </View>

      <View style={styles.missionCard}>
        <View style={styles.missionHeader}>
          <View style={styles.missionIcon}>
            <Text style={styles.missionIconText}>♡</Text>
          </View>
          <Text style={styles.missionTitle}>Our Values</Text>
        </View>
        <Text style={styles.body}>
          Safety as our bedrock, sustainable community tourism, clear and honest pricing models
          with absolutely no surprises. We partner with local communities and certified
          professionals to deliver authentic experiences.
        </Text>
        <View style={styles.missionPill}>
          <Text style={styles.missionPillText}>Safety · Sustainability · Integrity</Text>
        </View>
      </View>

      <View style={styles.valuesGrid}>
        {VALUES.map((v) => (
          <View key={v.title} style={styles.valueCard}>
            <Text style={styles.valueIcon}>{v.icon}</Text>
            <Text style={styles.valueTitle}>{v.title}</Text>
            <Text style={styles.valueBody}>{v.body}</Text>
          </View>
        ))}
      </View>
    </View>

    {/* CTA */}
    <View style={styles.ctaCard}>
      <Text style={styles.ctaTitle}>Ready to Explore the Western Cape?</Text>
      <TouchableOpacity style={styles.ctaButton} onPress={() => onNavigate('Activities')}>
        <Text style={styles.ctaButtonText}>View All Activities</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 24 },
  heroImage: { height: 300 },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.heroOverlay,
    padding: 20,
    justifyContent: 'center',
  },
  heroBadge: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  heroBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 6 },
  heroSubtitle: { fontSize: 13, color: '#EAF3EA', lineHeight: 18, marginBottom: 16 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingVertical: 10,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 17, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 10, color: '#CFE3CF', marginTop: 2 },
  section: { paddingHorizontal: 16, marginTop: 20 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1, color: COLORS.primary, marginBottom: 4 },
  h1: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  body: { fontSize: 14, color: COLORS.textLight, lineHeight: 21, marginBottom: 10 },
  imageCard: {
    borderRadius: 14,
    overflow: 'hidden',
    height: 190,
    marginBottom: 14,
    ...SHADOW,
  },
  imageCardImg: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as never,
  imageCardBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  imageCardBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkRow: { flexDirection: 'row', marginBottom: 6 },
  checkMark: { color: COLORS.primary, fontWeight: '800', marginRight: 8 },
  checkText: { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  teamWrap: { paddingHorizontal: 16, marginTop: 26 },
  teamCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    marginBottom: 12,
    ...SHADOW,
  },
  teamLeft: { marginRight: 12 },
  teamPhoto: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  teamPhotoText: { fontSize: 26, fontWeight: '800', color: COLORS.primary },
  teamPhotoSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.border,
  },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  teamRole: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginBottom: 4 },
  teamBio: { fontSize: 12, color: COLORS.textLight, lineHeight: 17, marginBottom: 4 },
  teamLoc: { fontSize: 11, color: COLORS.textLight },
  drivesWrap: { paddingHorizontal: 16, marginTop: 26 },
  missionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    ...SHADOW,
  },
  missionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  missionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  missionIconText: { fontSize: 18, color: COLORS.primary },
  missionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  missionPill: {
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 4,
  },
  missionPillText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  valueCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    width: '47%',
    flexGrow: 1,
    alignItems: 'center',
    ...SHADOW,
  },
  valueIcon: { fontSize: 24, marginBottom: 6 },
  valueTitle: { fontSize: 13, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  valueBody: { fontSize: 11, color: COLORS.textLight, textAlign: 'center', lineHeight: 15 },
  ctaCard: {
    backgroundColor: COLORS.primaryDark,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
  },
  ctaTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 14, textAlign: 'center' },
  ctaButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 36,
  },
  ctaButtonText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
