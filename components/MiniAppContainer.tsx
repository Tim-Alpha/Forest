import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { loadMiniAppBundle } from '@/utils/MiniAppLoader';

interface MiniAppContainerProps {
  bundleFile: string;
}

export function MiniAppContainer({ bundleFile }: MiniAppContainerProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadBundle() {
      try {
        setLoading(true);
        setError(null);

        // Load the component directly from the bundle module
        // In production, this would fetch from API and dynamically import
        const LoadedComponent = await loadMiniAppBundle(bundleFile);

        if (!isMounted) return;

        // Set the component for rendering
        setComponent(() => LoadedComponent);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load mini-app');
        setLoading(false);
      }
    }

    loadBundle();

    return () => {
      isMounted = false;
    };
  }, [bundleFile]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <ThemedText style={styles.loadingText}>Loading mini-app...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText type="title" style={styles.errorTitle}>
            ⚠️ Error
          </ThemedText>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (!Component) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>No component to render</ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Render the dynamically loaded component
  return (
    <ThemedView style={styles.container}>
      <Component />
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
    gap: 16,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    marginBottom: 16,
    color: '#ff3b30',
  },
  errorText: {
    textAlign: 'center',
    color: '#666',
  },
});

