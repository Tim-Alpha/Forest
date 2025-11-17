// Notes Mini-App Bundle
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = '@miniApp_notes';

export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load notes from storage on mount
  useEffect(() => {
    loadNotes();
  }, []);

  // Save notes to storage whenever they change
  useEffect(() => {
    if (!loading) {
      const saveNotes = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (error) {
          console.error('Failed to save notes:', error);
        }
      };
      saveNotes();
    }
  }, [notes, loading]);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedNotes = JSON.parse(stored);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };


  const saveNote = () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Empty Note', 'Please add a title or content to save the note.');
      return;
    }

    if (isEditing && selectedNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id
            ? {
                ...note,
                title: title.trim() || 'Untitled',
                content: content.trim(),
                updatedAt: Date.now(),
              }
            : note
        )
      );
    } else {
      // Create new note
      const now = Date.now();
      const newNote: Note = {
        id: now.toString(),
        title: title.trim() || 'Untitled',
        content: content.trim(),
        createdAt: now,
        updatedAt: now,
      };
      setNotes([newNote, ...notes]);
    }

    // Reset form
    setTitle('');
    setContent('');
    setSelectedNote(null);
    setIsEditing(false);
  };

  const deleteNote = (id: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setNotes(notes.filter((note) => note.id !== id));
          if (selectedNote?.id === id) {
            setSelectedNote(null);
            setTitle('');
            setContent('');
            setIsEditing(false);
          }
        },
      },
    ]);
  };

  const editNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
  };

  const newNote = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => editNote(item)}
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            deleteNote(item.id);
          }}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      {item.content ? (
        <Text style={styles.notePreview} numberOfLines={3}>
          {item.content}
        </Text>
      ) : (
        <Text style={styles.notePreviewEmpty}>No content</Text>
      )}
      <Text style={styles.noteDate}>{formatDate(item.updatedAt || item.createdAt)}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📝 Notes</Text>
          <Text style={styles.headerSubtitle}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (selectedNote || isEditing) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => {
                setSelectedNote(null);
                setTitle('');
                setContent('');
                setIsEditing(false);
              }}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editorContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Note title..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
            autoFocus={!selectedNote}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="Start writing your note..."
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📝 Notes</Text>
        <Text style={styles.headerSubtitle}>
          {notes.length} {notes.length !== 1 ? 'notes' : 'note'}
        </Text>
      </View>
      <TouchableOpacity style={styles.newNoteButton} onPress={newNote} activeOpacity={0.8}>
        <Text style={styles.newNoteButtonText}>+ New Note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📄</Text>
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>Tap &quot;New Note&quot; to create your first note!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    paddingTop: 28,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    ...createShadow({ width: 0, height: 2 }, 4, 0.05),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    color: '#212529',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    fontWeight: '500',
  },
  backButton: {
    padding: 10,
    paddingLeft: 0,
  },
  backButtonText: {
    fontSize: 17,
    color: '#4a90e2',
    fontWeight: '700',
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    ...createShadow({ width: 0, height: 4 }, 8, 0.3, '#4a90e2'),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  newNoteButton: {
    margin: 16,
    marginBottom: 12,
    padding: 18,
    backgroundColor: '#4a90e2',
    borderRadius: 14,
    alignItems: 'center',
    ...createShadow({ width: 0, height: 4 }, 8, 0.3, '#4a90e2'),
  },
  newNoteButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 14,
    borderRadius: 16,
    ...createShadow({ width: 0, height: 2 }, 8, 0.08),
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  noteTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#212529',
    marginRight: 12,
    letterSpacing: -0.3,
  },
  deleteButton: {
    padding: 6,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  notePreview: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 10,
    lineHeight: 22,
    fontWeight: '400',
  },
  notePreviewEmpty: {
    fontSize: 14,
    color: '#adb5bd',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  noteDate: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  editorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '800',
    color: '#212529',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
    letterSpacing: -0.5,
  },
  contentInput: {
    flex: 1,
    fontSize: 17,
    color: '#212529',
    lineHeight: 26,
    fontWeight: '400',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 20,
    opacity: 0.4,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default NotesApp;
