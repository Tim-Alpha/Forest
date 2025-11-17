import { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { MiniAppContainer } from '@/components/MiniAppContainer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { loadMiniAppMetadata, type MiniAppMetadata } from '@/utils/MiniAppLoader';

// Helper to create web-compatible shadow styles
const createShadow = (
  offset: { width: number; height: number },
  radius: number,
  opacity: number,
  color: string = '#000'
) => {
  if (Platform.OS === 'web') {
    const hexOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return {
      boxShadow: `${offset.width}px ${offset.height}px ${radius}px 0px ${color}${hexOpacity}`,
    };
  }
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: Math.max(radius, 3),
  };
};

export default function HomeScreen() {
  const [miniApps, setMiniApps] = useState<MiniAppMetadata[]>([]);
  const [selectedApp, setSelectedApp] = useState<MiniAppMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApps() {
      try {
        const apps = await loadMiniAppMetadata();
        setMiniApps(apps);
        // Always start with home screen - user will select an app
      } catch (error) {
        console.error('Failed to load mini-apps:', error);
      } finally {
        setLoading(false);
      }
    }

    loadApps();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.loadingContainer}>
          <ThemedText type="title" style={styles.loadingText}>
            Loading mini-apps...
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  // Show mini-app list if none selected, or show the selected mini-app
  if (!selectedApp) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Mini-App Host
          </ThemedText>
        </ThemedView>
        <FlatList
          data={miniApps}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.appCard,
                index === 0 && styles.firstCard,
                index === miniApps.length - 1 && styles.lastCard,
              ]}
              onPress={() => setSelectedApp(item)}
              activeOpacity={0.8}
            >
              <ThemedView style={styles.iconContainer}>
                <ThemedText style={styles.appIcon}>{item.icon}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.appInfo}>
                <ThemedText type="defaultSemiBold" style={styles.appName}>
                  {item.name}
                </ThemedText>
                <ThemedText style={styles.appDescription}>
                  {item.description}
                </ThemedText>
              </ThemedView>
              <ThemedText style={styles.arrow}>→</ThemedText>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    );
  }

  // Show the selected mini-app with a back button
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.appHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedApp(null)}
        >
          <ThemedText style={styles.backButtonText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedView style={styles.appHeaderInfo}>
          <ThemedText style={styles.appHeaderIcon}>{selectedApp.icon}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.appHeaderName}>
            {selectedApp.name}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <MiniAppContainer bundleFile={selectedApp.bundleFile} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    opacity: 0.6,
  },
  header: {
    padding: 24,
    paddingTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 32,
  },
  headerSubtitle: {
    fontSize: 15,
    opacity: 0.6,
    fontWeight: '500',
  },
  listContent: {
    padding: 20,
    paddingTop: 16,
  },
  appCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    ...createShadow({ width: 0, height: 3 }, 8, 0.08),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  firstCard: {
    marginTop: 4,
  },
  lastCard: {
    marginBottom: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appIcon: {
    fontSize: 36,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 19,
    marginBottom: 6,
    fontWeight: '700',
  },
  appDescription: {
    fontSize: 14,
    opacity: 0.65,
    lineHeight: 20,
  },
  arrow: {
    fontSize: 20,
    opacity: 0.3,
    marginLeft: 8,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    paddingRight: 16,
    marginRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  appHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appHeaderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  appHeaderName: {
    fontSize: 18,
  },
});
