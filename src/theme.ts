import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

export const COLORS = {
  primary: '#1B5E20',
  primaryDark: '#0D3312',
  primaryLight: '#E8F5E9',
  accent: '#FF7A00',
  background: '#F2F5F0',
  card: '#FFFFFF',
  text: '#1A2E1A',
  textLight: '#6B7B6B',
  border: '#E0E5E0',
  chipBg: '#E8F5E9',
  star: '#FFB300',
  danger: '#C62828',
  infoBg: '#E3F2FD',
  infoBorder: '#90CAF9',
  infoText: '#1565C0',
  warnBg: '#FFF8E1',
  warnBorder: '#FFD54F',
  warnText: '#E65100',
  discountBg: '#E8F5E9',
  heroOverlay: 'rgba(20, 35, 20, 0.55)',
};

export type AppStyle = StyleSheet.NamedStyles<{
  [k: string]: ViewStyle | TextStyle | ImageStyle;
}>;

export const SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
} as const;

export const SPACING = { xs: 4, s: 8, m: 16, l: 24, xl: 32 } as const;

export const FONT = {
  bold: 'System',
  regular: 'System',
};

export const formatRand = (n: number): string =>
  'R' + n.toLocaleString('en-ZA', { maximumFractionDigits: 0 });

// Discount tiers are based on the number of DISTINCT activities booked.
export const discountTier = (distinctActivities: number): number | null => {
  if (distinctActivities >= 4) return 15;
  if (distinctActivities === 3) return 10;
  if (distinctActivities === 2) return 5;
  return null;
};

export const applyDiscount = (
  subtotal: number,
  distinctActivities: number,
): { discount: number; rate: number | null } => {
  const rate = discountTier(distinctActivities);
  if (!rate) return { discount: 0, rate: null };
  const discount = Math.round((subtotal * rate) / 100);
  return { discount, rate };
};
