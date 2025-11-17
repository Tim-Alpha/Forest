// Contacts Mini-App Bundle
// This bundle exports a React component that displays a list of contacts

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  color: string;
}

export function ContactsApp() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Generate mock contacts
  const generateContacts = (): Contact[] => {
    const names = [
      'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince',
      'Ethan Hunt', 'Fiona Apple', 'George Washington', 'Hannah Montana',
      'Isaac Newton', 'Julia Roberts', 'Kevin Hart', 'Luna Lovegood',
      'Michael Jordan', 'Nina Simone', 'Oscar Wilde', 'Penelope Cruz',
      'Quinn Fabray', 'Rachel Green', 'Steve Jobs', 'Tina Turner',
      'Uma Thurman', 'Victor Hugo', 'Wendy Williams', 'Xavier Woods',
      'Yara Shahidi', 'Zoe Saldana'
    ];
    
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
    const phones = ['555-', '555-', '555-', '555-'];
    
    return names.map((name, index) => {
      const [firstName, lastName] = name.split(' ');
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[index % domains.length]}`;
      const phone = `${phones[index % phones.length]}${String(1000 + index).slice(-4)}`;
      const avatar = name.split(' ').map(n => n[0]).join('');
      
      return {
        id: (index + 1).toString(),
        name,
        email,
        phone,
        avatar,
        color: `hsl(${(index * 137.5) % 360}, 60%, 50%)`,
      };
    });
  };

  useEffect(() => {
    const mockContacts = generateContacts();
    setContacts(mockContacts);
  }, []);

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => setSelectedContact(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactEmail}>{item.email}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>📇 Contacts</Text>
      <Text style={styles.headerSubtitle}>{`${contacts.length} contacts`}</Text>
    </View>
  );

  const renderSelectedContact = () => {
    if (!selectedContact) return null;
    return (
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={[styles.modalAvatar, { backgroundColor: selectedContact.color }]}>
            <Text style={styles.modalAvatarText}>{selectedContact.avatar}</Text>
          </View>
          <Text style={styles.modalName}>{selectedContact.name}</Text>
          <View style={styles.modalDetails}>
            <Text style={styles.modalLabel}>Email:</Text>
            <Text style={styles.modalValue}>{selectedContact.email}</Text>
            <Text style={styles.modalLabel}>Phone:</Text>
            <Text style={styles.modalValue}>{selectedContact.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedContact(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
      {renderSelectedContact()}
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
  contactItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalAvatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalDetails: {
    width: '100%',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  modalValue: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Export as default component for the loader
export default ContactsApp;
