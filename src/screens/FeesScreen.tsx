import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOW, formatRand } from '../theme';
import { PrimaryButton, RemoteImage, Tag } from '../components/ui';
import { useBooking } from '../context/BookingContext';
import { TabKey } from '../navigation';

export const FeesScreen: React.FC<{
  onOpenActivity: (id: string) => void;
  onNavigate: (tab: TabKey) => void;
}> = ({ onOpenActivity, onNavigate }) => {
  const booking = useBooking();
  const {
    lines,
    distinctCount,
    totalBookings,
    subtotal,
    discountRate,
    discountAmount,
    total,
    removeLine,
    setBookings,
  } = booking;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>FEE CALCULATOR</Text>
        </View>
        <Text style={styles.headerTitle}>Calculate Your Fees</Text>
        <Text style={styles.headerSubtitle}>
          Review activities, see your group discount, and request a quote.
        </Text>
      </View>

      {/* Selected activities */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Selected Activities</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>
            {lines.length} item{lines.length === 1 ? '' : 's'}
          </Text>
        </View>
      </View>

      {discountRate !== null && (
        <View style={styles.discountAlert}>
          <Text style={styles.discountAlertText}>
            🏷 {distinctCount} activities: {discountRate}% group discount applied!
          </Text>
        </View>
      )}

      {lines.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No activities selected yet</Text>
          <Text style={styles.emptyBody}>
            Browse activities and tap "Add to Booking" to build your fee estimate.
          </Text>
          <PrimaryButton title="Browse All Activities" onPress={() => onNavigate('Activities')} />
        </View>
      )}

      {lines.map((line) => (
        <View key={line.activity.id} style={styles.card}>
          <View style={styles.imageWrap}>
            <RemoteImage uri={line.activity.image} style={StyleSheet.absoluteFill} />
            <View style={styles.imageOverlay}>
              <View style={styles.tagsRow}>
                <Tag label={line.activity.tagLabel} small />
                {line.activity.popular && <Tag label="Popular" small />}
              </View>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{line.activity.title}</Text>
              <Text style={styles.cardTotal}>
                {formatRand(line.activity.fee * line.bookings)}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                ◎ {line.activity.duration}   ⌖ {line.activity.locationShort}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {formatRand(line.activity.fee)} × {line.bookings} booking
                {line.bookings > 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.controlsRow}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setBookings(line.activity.id, line.bookings - 1)}
              >
                <Text style={styles.stepperText}>−</Text>
              </TouchableOpacity>
              <View style={styles.stepperValueWrap}>
                <Text style={styles.stepperValue}>{line.bookings}</Text>
                <Text style={styles.stepperUnit}>
                  booking{line.bookings > 1 ? 's' : ''}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => setBookings(line.activity.id, line.bookings + 1)}
              >
                <Text style={styles.stepperText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeWrap}
                onPress={() => removeLine(line.activity.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Add more */}
      <TouchableOpacity style={styles.addMore} onPress={() => onNavigate('Activities')}>
        <Text style={styles.addMoreText}>＋ Add More Activities</Text>
      </TouchableOpacity>

      {/* Order summary */}
      {lines.length > 0 && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>
                {lines.length} activit{lines.length === 1 ? 'y' : 'ies'}
              </Text>
            </View>
          </View>

          {lines.map((line) => (
            <View key={line.activity.id} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {line.activity.title} × {line.bookings}
              </Text>
              <Text style={styles.summaryValue}>
                {formatRand(line.activity.fee * line.bookings)}
              </Text>
            </View>
          ))}

          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({totalBookings} bookings)</Text>
            <Text style={styles.summaryValue}>{formatRand(subtotal)}</Text>
          </View>

          {discountRate !== null && (
            <View style={styles.discountRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.discountLabel}>🏷 Group Discount ({discountRate}%)</Text>
                <Text style={styles.discountSub}>
                  Automatically applied for {distinctCount} activity bookings
                </Text>
              </View>
              <Text style={styles.discountValue}>−{formatRand(discountAmount)}</Text>
            </View>
          )}

          <View style={styles.summaryDivider} />
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total Fee</Text>
              <Text style={styles.totalSub}>VAT inclusive · ZAR</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.totalValue}>{formatRand(total)}</Text>
              {discountAmount > 0 && (
                <Text style={styles.savingText}>saving {formatRand(discountAmount)}</Text>
              )}
            </View>
          </View>

          <PrimaryButton title="Request Quotation" onPress={() => onNavigate('Contact')} />
          <View style={{ height: 10 }} />
          <PrimaryButton
            title="Browse All Activities"
            variant="outline"
            onPress={() => onNavigate('Activities')}
          />

          <View style={styles.trustList}>
            <Text style={styles.trustItem}>🛡 Secure booking · No payment required yet</Text>
            <Text style={styles.trustItem}>📞 Our team responds within 2 business hours</Text>
            <Text style={styles.trustItem}>🔄 Free changes up to 48 hrs before activity</Text>
          </View>
        </View>
      )}

      {/* Help card */}
      <View style={styles.helpCard}>
        <Text style={styles.helpTitle}>Need Help Deciding?</Text>
        <Text style={styles.helpBody}>
          Our adventure specialists are happy to help you put together the perfect package for
          your group.
        </Text>
        <Text style={styles.helpContact}>📞 +27 (0) 21 555 4321</Text>
        <Text style={styles.helpContact}>✉ info@adventureescape.co.za</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 24 },
  header: { backgroundColor: COLORS.primaryDark, padding: 22, paddingTop: 18 },
  headerBadge: {
    backgroundColor: COLORS.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  headerBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 6 },
  headerSubtitle: { fontSize: 13, color: '#CFE3CF', lineHeight: 18 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  countBadge: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countBadgeText: { fontSize: 11, fontWeight: '700', color: COLORS.primary },
  discountAlert: {
    backgroundColor: COLORS.warnBg,
    borderColor: COLORS.warnBorder,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    padding: 12,
  },
  discountAlertText: { fontSize: 13, fontWeight: '700', color: COLORS.warnText },
  emptyState: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    ...SHADOW,
  },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  emptyBody: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 18,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 12,
    ...SHADOW,
  },
  imageWrap: { height: 130 },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
  },
  tagsRow: { flexDirection: 'row', gap: 6 },
  cardBody: { padding: 14 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '800', color: COLORS.text, flex: 1 },
  cardTotal: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  metaRow: { marginTop: 4 },
  metaText: { fontSize: 12, color: COLORS.textLight },
  controlsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperText: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  stepperValueWrap: { paddingHorizontal: 14, alignItems: 'center' },
  stepperValue: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  stepperUnit: { fontSize: 10, color: COLORS.textLight },
  removeWrap: { marginLeft: 'auto' },
  removeText: { fontSize: 13, color: COLORS.danger, fontWeight: '700' },
  addMore: { paddingHorizontal: 16, paddingVertical: 10, marginBottom: 8 },
  addMoreText: { color: COLORS.primary, fontWeight: '800', fontSize: 14 },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    ...SHADOW,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 13, color: COLORS.text, flex: 1 },
  summaryValue: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  summaryDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 10,
  },
  discountLabel: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  discountSub: { fontSize: 11, color: COLORS.primary, marginTop: 2 },
  discountValue: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  totalSub: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  totalValue: { fontSize: 26, fontWeight: '800', color: COLORS.primary },
  savingText: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  trustList: { marginTop: 16 },
  trustItem: { fontSize: 12, color: COLORS.textLight, marginBottom: 6 },
  helpCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 16,
  },
  helpTitle: { fontSize: 17, fontWeight: '800', color: '#fff', marginBottom: 6 },
  helpBody: { fontSize: 13, color: '#CFE3CF', lineHeight: 18, marginBottom: 12 },
  helpContact: { fontSize: 13, color: '#8BC34A', fontWeight: '700', marginBottom: 4 },
});
