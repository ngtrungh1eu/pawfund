
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ChatItem } from '../components/ChatItem';

export function ChatScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Chats</Text>
      <ChatItem name="Sarthak" message="Please come to this location" time="10:25 PM" />
      <ChatItem name="Chance" message="Meet at 3:35 PM" time="Tomorrow" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
