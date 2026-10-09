import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, StatusBar, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { BookingProvider } from './src/context/BookingContext';
import { AppHeader, TabBar } from './src/components/shell';
import { COLORS } from './src/theme';
import { ACTIVITIES } from './src/data/activities';
import { BreadcrumbBar } from './src/components/shell';
import { TabKey } from './src/navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { ActivitiesScreen } from './src/screens/ActivitiesScreen';
import { ActivityDetailScreen } from './src/screens/ActivityDetailScreen';
import { FeesScreen } from './src/screens/FeesScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { ContactScreen } from './src/screens/ContactScreen';

const App: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('Home');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useCallback((next: TabKey) => {
    setTab(next);
    setDetailId(null);
    setMenuOpen(false);
  }, []);

  const openActivity = useCallback((id: string) => {
    setDetailId(id);
    setMenuOpen(false);
  }, []);

  return (
    <BookingProvider>
      <KeyboardAvoidingView
        style={styles.app}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ExpoStatusBar style="dark" />
        <AppHeader
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((v) => !v)}
          onNavigate={navigate}
          currentTab={tab}
        />
        <View style={styles.body}>
          {detailId !== null && (
            <BreadcrumbBar
              trail={['Home', 'Activities', ACTIVITIES.find((a) => a.id === detailId)?.title ?? '']}
              onNavigate={navigate}
            />
          )}
          {detailId !== null ? (
            <ActivityDetailScreen
              activityId={detailId}
              onOpenActivity={openActivity}
              onNavigate={navigate}
            />
          ) : tab === 'Home' ? (
            <HomeScreen onNavigate={navigate} onOpenActivity={openActivity} />
          ) : tab === 'Activities' ? (
            <ActivitiesScreen onOpenActivity={openActivity} onGoFees={() => navigate('Fees')} />
          ) : tab === 'Fees' ? (
            <FeesScreen onOpenActivity={openActivity} onNavigate={navigate} />
          ) : tab === 'About' ? (
            <AboutScreen onNavigate={navigate} />
          ) : (
            <ContactScreen />
          )}
        </View>
        <TabBar activeTab={tab} onNavigate={navigate} />
      </KeyboardAvoidingView>
    </BookingProvider>
  );
};

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: COLORS.background },
  body: { flex: 1 },
});

export default App;
