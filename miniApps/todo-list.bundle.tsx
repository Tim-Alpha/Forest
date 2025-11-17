// Todo List Mini-App Bundle
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = '@miniApp_todos';

export function TodoListApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  // Load todos from storage on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    if (!loading) {
      saveTodos();
    }
  }, [todos, loading]);

  const loadTodos = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedTodos = JSON.parse(stored);
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  };

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={[styles.todoItem, item.completed && styles.todoItemCompleted]}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>✅ Todo List</Text>
          <Text style={styles.headerSubtitle}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✅ Todo List</Text>
        <Text style={styles.headerSubtitle}>
          {activeCount} active {activeCount !== 1 ? 'tasks' : 'task'} • {completedCount}{' '}
          {completedCount !== 1 ? 'completed' : 'completed'}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo} activeOpacity={0.8}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {todos.length > 0 && completedCount > 0 && (
        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={clearCompleted} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Completed ({completedCount})</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyText}>All clear!</Text>
            <Text style={styles.emptySubtext}>Add a task to get started</Text>
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
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 52,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#212529',
    fontWeight: '500',
  },
  addButton: {
    width: 52,
    height: 52,
    backgroundColor: '#4a90e2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...createShadow({ width: 0, height: 4 }, 8, 0.3, '#4a90e2'),
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  clearButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff5f5',
  },
  clearButtonText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 12,
    borderRadius: 16,
    ...createShadow({ width: 0, height: 2 }, 8, 0.08),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  todoItemCompleted: {
    opacity: 0.7,
    backgroundColor: '#f8f9fa',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,
    borderColor: '#4a90e2',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxCompleted: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 17,
    color: '#212529',
    fontWeight: '500',
    lineHeight: 24,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
    fontWeight: '400',
  },
  deleteButton: {
    padding: 10,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 20,
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
    fontWeight: '500',
  },
});

export default TodoListApp;
