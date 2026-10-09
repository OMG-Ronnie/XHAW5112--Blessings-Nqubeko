import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Activity } from '../data/activities';
import { COLORS, SHADOW, formatRand } from '../theme';
import { PriceBubble, PrimaryButton, RemoteImage, Stars, Tag } from './ui';

export const ActivityCard: React.FC<{
  activity: Activity;
  onPress: (id: string) => void;
}> = ({ activity, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.9}
    onPress={() => onPress(activity.id)}
  >
    <View style={styles.imageWrap}>
      <RemoteImage uri={activity.image} style={StyleSheet.absoluteFill} />
      <View style={styles.imageOverlay}>
        <View style={styles.tagsLeft}>
          {activity.popular && <Tag label="Popular" />}
          <Tag label={activity.tagLabel} />
        </View>
        <PriceBubble
          price={activity.fee}
          prefix={activity.kind === 'PACKAGE' ? 'Package Fee' : 'Fee'}
        />
      </View>
    </View>
    <View style={styles.body}>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>◎ {activity.duration}</Text>
      </View>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.desc}>{activity.overview}</Text>
      {activity.kind === 'PACKAGE' && (
        <View style={styles.includedChipsRow}>
          {activity.included.map((item) => (
            <View key={item} style={styles.includedChip}>
              <Text style={styles.includedChipText}>✓ {item}</Text>
            </View>
          ))}
        </View>
      )}
      <Stars rating={activity.rating} reviews={activity.reviews} />
      <PrimaryButton title="View Details" onPress={() => onPress(activity.id)} />
    </View>
  </TouchableOpacity>
);

export const PersonQuantityStepper: React.FC<{
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}> = ({ value, onChange, min = 1, max = 20 }) => (
  <View style={styles.stepperLarge}>
    <TouchableOpacity
      style={styles.stepperLargeBtn}
      onPress={() => onChange(Math.max(min, value - 1))}
    >
      <Text style={styles.stepperLargeBtnText}>−</Text>
    </TouchableOpacity>
    <View style={styles.stepperValue}>
      <Text style={styles.stepperValueNum}>{value}</Text>
      <Text style={styles.stepperValueLabel}>persons</Text>
    </View>
    <TouchableOpacity
      style={styles.stepperLargeBtn}
      onPress={() => onChange(Math.min(max, value + 1))}
    >
      <Text style={styles.stepperLargeBtnText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    ...SHADOW,
  },
  imageWrap: { height: 180, backgroundColor: '#C8D6C0' },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
  },
  tagsLeft: { flexDirection: 'row' },
  body: { padding: 14 },
  metaRow: { flexDirection: 'row', marginBottom: 4 },
  metaText: { fontSize: 12, color: COLORS.textLight },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  desc: { fontSize: 13, color: COLORS.textLight, lineHeight: 18, marginBottom: 8 },
  includedChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  includedChip: {
    backgroundColor: COLORS.warnBg,
    borderWidth: 1,
    borderColor: COLORS.warnBorder,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  includedChipText: { fontSize: 10, fontWeight: '700', color: COLORS.warnText },
  stepperLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  stepperLargeBtn: {
    width: 52,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FAFBFA',
  },
  stepperLargeBtnText: { fontSize: 22, fontWeight: '700', color: COLORS.primary },
  stepperValue: { flex: 1, alignItems: 'center' },
  stepperValueNum: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  stepperValueLabel: { fontSize: 11, color: COLORS.textLight },
});
