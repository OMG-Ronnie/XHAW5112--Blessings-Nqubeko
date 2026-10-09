import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ACTIVITIES, CONTACT } from '../data/activities';
import { COLORS, SHADOW, formatRand } from '../theme';
import { PrimaryButton, RemoteImage, Stars, Tag } from '../components/ui';
import { useBooking } from '../context/BookingContext';
import { TabKey } from '../navigation';

export const ActivityDetailScreen: React.FC<{
  activityId: string;
  onOpenActivity: (id: string) => void;
  onNavigate: (tab: TabKey) => void;
}> = ({ activityId, onOpenActivity, onNavigate }) => {
  const activity = ACTIVITIES.find((a) => a.id === activityId) ?? ACTIVITIES[0];
  const [bookings, setBookings] = useState(1);
  const [heroIdx, setHeroIdx] = useState(0);
  const { addActivity } = useBooking();

  const total = activity.fee * bookings;
  const related = (activity.related ?? [])
    .map((id) => ACTIVITIES.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const feePrefix = activity.kind === 'PACKAGE' ? 'Package Fee' : 'Fee';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Hero + gallery strip */}
      <View>
        <RemoteImage uri={activity.gallery[heroIdx] ?? activity.image} style={styles.heroImage} />
        <View style={styles.heroBadgeRow}>
          <PriceBubbleTag price={activity.fee} prefix={feePrefix} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryStrip}>
        {activity.gallery.map((uri, i) => (
          <TouchableOpacity key={i} onPress={() => setHeroIdx(i)}>
            <RemoteImage
              uri={uri}
              style={i === heroIdx ? [styles.thumb, styles.thumbActive] : styles.thumb}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        {/* Chips: tag + kind */}
        <View style={styles.chipsRow}>
          <Tag label={activity.tagLabel} />
          <Text style={styles.kindText}>{activity.kind}</Text>
          <Text style={styles.durationText}>Full day</Text>
        </View>

        {/* Title + fee */}
        <Text style={styles.title}>{activity.title}</Text>
        <View style={styles.feeLine}>
          <Text style={styles.feeLabelText}>{feePrefix}</Text>
          <Text style={styles.feeValue}>{formatRand(activity.fee)}</Text>
        </View>

        {/* Overview */}
        <Text style={styles.h2}>Adventure Overview</Text>
        <View style={styles.h2Rule} />
        <Text style={styles.body}>{activity.overview}</Text>
        {activity.extraOverview ? <Text style={styles.body}>{activity.extraOverview}</Text> : null}

        {/* What's included */}
        <Text style={styles.h2}>What's Included</Text>
        <View style={styles.h2Rule} />
        {activity.included.map((item) => (
          <View key={item} style={styles.checkRow}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.checkText}>{item}</Text>
          </View>
        ))}

        {/* Info strip (Experience / Terrain / Setting) */}
        {activity.infoStrip && (
          <View style={styles.infoStrip}>
            {activity.infoStrip.map((cell) => (
              <View key={cell.label} style={styles.infoCell}>
                <Text style={styles.infoIcon}>◎</Text>
                <Text style={styles.infoLabel}>{cell.label}</Text>
                <Text style={styles.infoValue}>{cell.value}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Before your adventure */}
        <View style={styles.beforeBox}>
          <Text style={styles.beforeTitle}>🛡 Before Your Adventure</Text>
          <Text style={styles.beforeBody}>{activity.beforeAdventure}</Text>
        </View>

        {/* Fee card */}
        <View style={styles.feeCard}>
          <Text style={styles.perLabel}>{activity.kind === 'PACKAGE' ? 'PACKAGE FEE' : 'FEE'}</Text>
          <Text style={styles.feeBig}>{formatRand(activity.fee)}</Text>
          <View style={styles.feeDivider} />
          <Text style={styles.qtyLabel}>SELECT BOOKINGS:</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => setBookings((b) => Math.max(1, b - 1))}
            >
              <Text style={styles.stepperText}>−</Text>
            </TouchableOpacity>
            <View style={styles.stepperValueWrap}>
              <Text style={styles.stepperValue}>{bookings}</Text>
              <Text style={styles.stepperUnit}>booking{bookings > 1 ? 's' : ''}</Text>
            </View>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={() => setBookings((b) => Math.min(20, b + 1))}
            >
              <Text style={styles.stepperText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatRand(total)}</Text>
          </View>
          <PrimaryButton
            title="Add to Booking"
            variant="outline"
            onPress={() => addActivity(activity.id, bookings)}
          />
          <View style={{ height: 10 }} />
          <PrimaryButton
            title="Book Now"
            onPress={() => {
              addActivity(activity.id, bookings);
              onNavigate('Fees');
            }}
          />
          <View style={styles.trustRow}>
            <Text style={styles.trustText}>🛡 Safety Certified</Text>
            <Text style={styles.trustText}>🔒 Secure Booking</Text>
          </View>
        </View>

        {/* Combo discount tiers */}
        <View style={styles.comboCard}>
          <Text style={styles.comboTitle}>🏷 Combo Discount Tiers</Text>
          <Text style={styles.comboBody}>
            Combine distinct activities to unlock up to 15% off your total.
          </Text>
          <Text style={styles.comboTier}>• 2 distinct activities: 5% off total</Text>
          <Text style={styles.comboTier}>• 3 activities: 10% off total</Text>
          <Text style={styles.comboTier}>• 4+ activities: 15% off total</Text>
        </View>

        {/* Need help card */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpRow}>📞 {CONTACT.phone}</Text>
          <Text style={styles.helpRow}>✉ {CONTACT.email}</Text>
          <Text style={styles.helpHours}>{CONTACT.hours}</Text>
        </View>

        {/* Related */}
        <Text style={styles.h2}>Related Adventures</Text>
        {related.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={styles.relatedCard}
            activeOpacity={0.9}
            onPress={() => onOpenActivity(r.id)}
          >
            <View style={styles.relatedImageWrap}>
              <RemoteImage uri={r.image} style={StyleSheet.absoluteFill} />
              <View style={styles.relatedPrice}>
                <Text style={styles.relatedPriceText}>{formatRand(r.fee)}</Text>
              </View>
            </View>
            <View style={styles.relatedBody}>
              <View style={styles.relatedMeta}>
                <Tag label={r.tagLabel} small />
                <Text style={styles.relatedMetaText}>
                  ◎ {r.kind === 'PACKAGE' ? 'Guided package' : 'Guided experience'}
                </Text>
              </View>
              <Text style={styles.relatedTitle}>{r.title}</Text>
              <Text style={styles.relatedDesc}>{r.overview}</Text>
              <PrimaryButton title="View Details" onPress={() => onOpenActivity(r.id)} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const PriceBubbleTag: React.FC<{ price: number; prefix: string }> = ({ price, prefix }) => (
  <View style={styles.heroFeeBubble}>
    <Text style={styles.heroFeeText}>
      {prefix} {formatRand(price)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 24 },
  heroImage: { height: 280 },
  heroBadgeRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    padding: 12,
  },
  heroFeeBubble: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroFeeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  galleryStrip: {
    backgroundColor: '#3A4A3A',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  thumb: { width: 86, height: 60, borderRadius: 8, marginRight: 10 },
  thumbActive: { borderWidth: 2, borderColor: '#fff' },
  section: { paddingHorizontal: 16, paddingTop: 14 },
  chipsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  kindText: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, color: COLORS.textLight },
  durationText: { fontSize: 12, color: COLORS.textLight },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  feeLine: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 8 },
  feeLabelText: { fontSize: 14, color: COLORS.textLight },
  feeValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },
  h2: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginTop: 18, marginBottom: 4 },
  h2Rule: { width: 44, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginBottom: 10 },
  body: { fontSize: 14, color: COLORS.textLight, lineHeight: 21, marginBottom: 8 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: '800' },
  checkText: { fontSize: 14, color: COLORS.text, flex: 1 },
  infoStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 6,
    ...SHADOW,
  },
  infoCell: { flex: 1, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4 },
  infoIcon: { fontSize: 15, color: COLORS.primary, marginBottom: 4 },
  infoLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.6, color: COLORS.textLight },
  infoValue: { fontSize: 11, fontWeight: '700', color: COLORS.text, marginTop: 2, textAlign: 'center' },
  beforeBox: {
    backgroundColor: COLORS.infoBg,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  beforeTitle: { fontSize: 14, fontWeight: '800', color: COLORS.infoText, marginBottom: 6 },
  beforeBody: { fontSize: 13, color: COLORS.infoText, lineHeight: 19 },
  feeCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 18,
    ...SHADOW,
  },
  perLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1, color: COLORS.textLight },
  feeBig: { fontSize: 30, fontWeight: '800', color: COLORS.primary, marginTop: 2, marginBottom: 12 },
  feeDivider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },
  qtyLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, color: COLORS.textLight, marginBottom: 8 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFA',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  stepperBtn: { width: 56, paddingVertical: 14, alignItems: 'center' },
  stepperText: { fontSize: 22, fontWeight: '700', color: COLORS.primary },
  stepperValueWrap: { flex: 1, alignItems: 'center' },
  stepperValue: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  stepperUnit: { fontSize: 11, color: COLORS.textLight },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.warnBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 12,
  },
  totalLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  totalValue: { fontSize: 20, fontWeight: '800', color: COLORS.accent },
  trustRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 14, gap: 18 },
  trustText: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
  comboCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 14,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#CDE5CD',
  },
  comboTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary, marginBottom: 6 },
  comboBody: { fontSize: 13, color: COLORS.primary, lineHeight: 19, marginBottom: 8 },
  comboTier: { fontSize: 13, color: COLORS.primary, marginBottom: 4 },
  helpCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginTop: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  helpTitle: { fontSize: 15, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  helpRow: { fontSize: 13, color: COLORS.text, fontWeight: '600', marginBottom: 6 },
  helpHours: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
  relatedCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    ...SHADOW,
  },
  relatedImageWrap: { height: 140 },
  relatedPrice: { position: 'absolute', top: 8, right: 8 },
  relatedPriceText: {
    backgroundColor: COLORS.primary,
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  relatedBody: { padding: 12 },
  relatedMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  relatedMetaText: { fontSize: 11, color: COLORS.textLight },
  relatedTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  relatedDesc: { fontSize: 12, color: COLORS.textLight, lineHeight: 17, marginBottom: 10 },
});
