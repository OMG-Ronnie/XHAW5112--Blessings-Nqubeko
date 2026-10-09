import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOW } from '../theme';
import { TabKey } from '../navigation';

export const BRAND_COLORS = {
  primary: '#1B5E20',
  primaryDark: '#0D3312',
  primaryLight: '#E8F5E9',
  accent: '#FF7A00',
  background: '#F2F5F0',
  card: '#FFFFFF',
  text: '#1A2E1A',
  textLight: '#6B7B6B',
  border: '#E0E5E0',
};

export const BRAND_SHADOW = SHADOW;

// ---------- App logo (pure vector, no asset needed) ----------
export const Logo: React.FC<{ size?: number; light?: boolean }> = ({ size = 34, light }) => (
  <View style={[styles.logo, { width: size, height: size }]}>
    <Text style={[styles.logoText, { fontSize: size * 0.45 }]}>▲</Text>
    <Text style={[styles.logoSub, { fontSize: size * 0.22 }]}>▲</Text>
  </View>
);

// ---------- Header with brand + hamburger menu ----------
export const AppHeader: React.FC<{
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (tab: TabKey) => void;
  currentTab: TabKey;
}> = ({ menuOpen, onToggleMenu, onNavigate, currentTab }) => (
  <View>
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBrand} onPress={() => onNavigate('Home')}>
        <Logo />
        <View>
          <Text style={styles.headerTitle}>ADVENTURE</Text>
          <Text style={styles.headerSubtitle}>ESCAPE SA</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleMenu} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.hamburger}>☰</Text>
      </TouchableOpacity>
    </View>
    {menuOpen && (
      <View style={styles.menuDrawer}>
        {(['Home', 'Activities', 'Fees', 'About', 'Contact'] as TabKey[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.menuItem, currentTab === tab && styles.menuItemActive]}
            onPress={() => onNavigate(tab)}
          >
            <Text style={[styles.menuText, currentTab === tab && styles.menuTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )}
  </View>
);

// ---------- Breadcrumb bar (detail screens) ----------
export const BreadcrumbBar: React.FC<{
  trail: string[];
  onNavigate: (tab: TabKey) => void;
}> = ({ trail, onNavigate }) => (
  <View style={styles.breadcrumb}>
    {trail
      .filter(Boolean)
      .map((crumb, i, arr) => (
        <React.Fragment key={i}>
          {i > 0 && <Text style={styles.crumbSep}>›</Text>}
          <TouchableOpacity
            disabled={i === arr.length - 1}
            onPress={() => onNavigate(i === 0 ? 'Home' : 'Activities')}
          >
            <Text style={i === arr.length - 1 ? styles.crumbCurrent : styles.crumbLink}>
              {crumb}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
  </View>
);

// ---------- Bottom tab bar ----------
const TAB_META: { key: TabKey; label: string; icon: string }[] = [
  { key: 'Home', label: 'Home', icon: '⌂' },
  { key: 'Activities', label: 'Activities', icon: '◍' },
  { key: 'Fees', label: 'Fees', icon: '▦' },
  { key: 'About', label: 'About', icon: 'ⓘ' },
  { key: 'Contact', label: 'Contact', icon: '✉' },
];

export const TabBar: React.FC<{
  activeTab: TabKey;
  onNavigate: (tab: TabKey) => void;
}> = ({ activeTab, onNavigate }) => (
  <View style={styles.tabBar}>
    {TAB_META.map((tab) => {
      const active = tab.key === activeTab;
      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => onNavigate(tab.key)}
          activeOpacity={0.85}
        >
          <View style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}>
            <Text style={[styles.tabIcon, active && { color: '#fff' }]}>{tab.icon}</Text>
          </View>
          <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center' },
  logo: {
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: { color: COLORS.primary, lineHeight: undefined },
  logoSub: { color: COLORS.accent, lineHeight: undefined, marginTop: -6 },
  headerTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary, letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 11, fontWeight: '700', color: COLORS.text, letterSpacing: 0.5 },
  hamburger: { fontSize: 22, color: COLORS.text, paddingHorizontal: 4 },
  menuDrawer: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItem: { paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  menuItemActive: { backgroundColor: COLORS.primaryLight },
  menuText: { fontSize: 15, color: COLORS.text, fontWeight: '600' },
  menuTextActive: { color: COLORS.primary },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  crumbLink: { fontSize: 12, color: COLORS.textLight },
  crumbCurrent: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  crumbSep: { fontSize: 12, color: COLORS.textLight, marginHorizontal: 6 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 4,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingTop: 6, paddingBottom: 2 },
  tabIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabIconWrapActive: { backgroundColor: COLORS.primary },
  tabIcon: { fontSize: 15, color: COLORS.textLight },
  tabLabel: { fontSize: 10, color: COLORS.textLight },
  tabLabelActive: { color: COLORS.primary, fontWeight: '700' },
});
