// Infinity Scroller Mini-App Bundle
// This bundle exports a React component that renders an infinite scrolling list

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export function InfinityScrollerApp() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  // Generate mock data
  const generateItems = (pageNum: number) => {
    const newItems = [];
    const itemsPerPage = 20;
    for (let i = 0; i < itemsPerPage; i++) {
      const id = (pageNum - 1) * itemsPerPage + i + 1;
      newItems.push({
        id: id.toString(),
        title: `Item ${id}`,
        description: `This is item number ${id} in the infinite scroll list`,
        color: `hsl(${(id * 137.5) % 360}, 70%, 50%)`,
      });
    }
    return newItems;
  };

  // Load more items
  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newItems = generateItems(page + 1);
      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 500);
  };

  // Initial load
  useEffect(() => {
    const initialItems = generateItems(1);
    setItems(initialItems);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.item, { backgroundColor: item.color }]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📜 Infinity Scroller</Text>
        <Text style={styles.headerSubtitle}>Scroll down to load more items</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
  },
});

// Export as default component for the loader
export default InfinityScrollerApp;
