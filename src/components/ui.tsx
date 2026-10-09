import React from 'react';
import {
  ActivityIndicator,
  ImageStyle,
  StyleProp,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, SHADOW, formatRand } from '../theme';

// ---------- Tag chip (badge overlaid on images) ----------
const TAG_COLORS: Record<string, string> = {
  Hiking: '#2E7D32',
  Water: '#0277BD',
  Ocean: '#0277BD',
  Aerial: '#6A1B9A',
  Extreme: '#C62828',
  Popular: '#E65100',
  Package: '#6A1B9A',
  Bundle: '#8E24AA',
};

export const Tag: React.FC<{ label: string; small?: boolean }> = ({ label, small }) => {
  const bg = TAG_COLORS[label] ?? COLORS.primary;
  return (
    <View style={[styles.tag, { backgroundColor: bg }, small && styles.tagSmall]}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
};

// ---------- Price bubble over images ----------
export const PriceBubble: React.FC<{ price: number; prefix?: string }> = ({
  price,
  prefix,
}) => (
  <View style={styles.priceBubble}>
    <Text style={styles.priceBubbleText}>
      {prefix ? prefix + ' ' : ''}
      {formatRand(price)}
    </Text>
  </View>
);

// ---------- Remote image with graceful offline fallback ----------
export const RemoteImage: React.FC<{
  uri: string;
  style: StyleProp<ImageStyle>;
  fallbackColor?: string;
}> = ({ uri, style, fallbackColor = '#C8D6C0' }) => {
  const [failed, setFailed] = React.useState(false);
  if (failed || !uri) {
    return <View style={[style, { backgroundColor: fallbackColor }]} />;
  }
  return (
    <Image
      source={{ uri }}
      style={style}
      onError={() => setFailed(true)}
      resizeMode="cover"
    />
  );
};

// ---------- Buttons ----------
export const PrimaryButton: React.FC<{
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'solid' | 'outline' | 'accent';
}> = ({ title, onPress, disabled, variant = 'solid' }) => {
  const bg =
    variant === 'outline' ? 'transparent' : variant === 'accent' ? COLORS.accent : COLORS.primary;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' && styles.buttonOutline,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'outline' ? { color: COLORS.primary } : { color: '#fff' },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// ---------- Star rating row ----------
export const Stars: React.FC<{ rating: number; reviews?: number }> = ({ rating, reviews }) => (
  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Text key={i} style={[styles.star, i <= Math.round(rating) ? styles.starOn : styles.starOff]}>
        {'★'}
      </Text>
    ))}
    {reviews !== undefined && (
      <Text style={styles.ratingText}>
        {rating.toFixed(1)} ({reviews} reviews)
      </Text>
    )}
  </View>
);

// ---------- Section heading ----------
export const SectionHeading: React.FC<{ title: string; subtitle?: string; center?: boolean }> = ({
  title,
  subtitle,
  center,
}) => (
  <View style={[styles.sectionHeading, center && { alignItems: 'center' }]}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
  </View>
);

// ---------- Form bits (Contact screen) ----------
export const FieldLabel: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.fieldLabel}>{children}</Text>
);

export const TextInputField: React.FC<TextInputProps & { multiline?: boolean }> = (props) => (
  <TextInput
    placeholderTextColor="#9AA8A0"
    {...props}
    style={[styles.input, props.multiline && styles.inputMultiline, props.style]}
  />
);

export const Spinner: React.FC = () => <ActivityIndicator size="small" color={COLORS.primary} />;

const styles = StyleSheet.create({
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  tagSmall: { paddingHorizontal: 8, paddingVertical: 2 },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  priceBubble: {
    backgroundColor: 'rgba(20,40,25,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  priceBubbleText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 15, fontWeight: '700' },
  starsRow: { flexDirection: 'row', alignItems: 'center' },
  star: { fontSize: 14, marginRight: 1 },
  starOn: { color: COLORS.star },
  starOff: { color: '#D5DCD5' },
  ratingText: { marginLeft: 6, fontSize: 12, color: COLORS.textLight },
  sectionHeading: { marginBottom: 12 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  sectionSubtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: COLORS.text,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: '#FAFBFA',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 14,
  },
  inputMultiline: { height: 110, textAlignVertical: 'top', paddingTop: 12 },
});
