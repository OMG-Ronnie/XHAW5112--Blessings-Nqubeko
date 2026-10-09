import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ACTIVITIES, CATEGORIES, ActivityCategory, HERO_IMAGES } from '../data/activities';
import { COLORS, formatRand } from '../theme';
import { ActivityCard } from '../components/cards';
import { PrimaryButton, RemoteImage } from '../components/ui';

const TIER_INFO = '2 activities: 5% off · 3 activities: 10% off · 4+ : 15% off';

export const ActivitiesScreen: React.FC<{
  onOpenActivity: (id: string) => void;
  onGoFees: () => void;
}> = ({ onOpenActivity, onGoFees }) => {
  const [active, setActive] = useState<ActivityCategory>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACTIVITIES.filter(
      (a) =>
        (active === 'All' || a.category === active) &&
        (q === '' ||
          a.title.toLowerCase().includes(q) ||
          a.overview.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)),
    );
  }, [active, query]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header banner */}
      <View>
        <RemoteImage uri={HERO_IMAGES.mountain} style={styles.bannerImage} />
        <View style={styles.bannerOverlay}>
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>WESTERN CAPE, SOUTH AFRICA</Text>
          </View>
          <Text style={styles.bannerTitle}>Activities & Packages</Text>
          <Text style={styles.bannerSubtitle}>
            {ACTIVITIES.length}+ curated Western Cape adventures
          </Text>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.chipRow}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, active === c && styles.chipActive]}
            onPress={() => setActive(c)}
          >
            <Text style={[styles.chipText, active === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Discount banner */}
      <View style={styles.discountBanner}>
        <Text style={styles.discountBannerTitle}>🏷 Book More, Save More!</Text>
        <Text style={styles.discountBannerBody}>{TIER_INFO} total</Text>
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search activities..."
        placeholderTextColor="#9AA8A0"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />

      {/* List */}
      <View style={styles.list}>
        {filtered.map((a) => (
          <ActivityCard key={a.id} activity={a} onPress={onOpenActivity} />
        ))}
        {filtered.length === 0 && (
          <Text style={styles.empty}>No activities match your search. Try another term.</Text>
        )}
      </View>

      {/* CTA card */}
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Plan Your Adventure Today</Text>
        <Text style={styles.ctaBody}>
          Get a personalised quote or book multiple activities and unlock bulk discounts.
        </Text>
        <PrimaryButton title="Request Quotation" variant="accent" onPress={onGoFees} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 24 },
  bannerImage: { height: 150 },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.heroOverlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  bannerBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  bannerBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  bannerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  bannerSubtitle: { fontSize: 12, color: '#EAF3EA', marginTop: 4 },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 8,
  },
  chip: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 4,
    marginBottom: 4,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  discountBanner: {
    backgroundColor: COLORS.infoBg,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 10,
    padding: 12,
  },
  discountBannerTitle: { fontWeight: '800', color: COLORS.infoText, fontSize: 13 },
  discountBannerBody: { fontSize: 12, color: COLORS.infoText, marginTop: 2 },
  search: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  list: { paddingHorizontal: 16, marginTop: 14 },
  empty: { textAlign: 'center', color: COLORS.textLight, marginTop: 20 },
  ctaCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 8, textAlign: 'center' },
  ctaBody: { fontSize: 13, color: '#D7E8D7', textAlign: 'center', marginBottom: 16, lineHeight: 18 },
});

// Local ActivityCard override for the new wireframe: package included-chips row
