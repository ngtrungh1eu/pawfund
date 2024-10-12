// src/components/ChatItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ChatItem({ name, message, time }: { name: string; message: string; time: string }) {
  return (
    <View style={styles.chatItem}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
  message: {
    color: '#666',
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#aaa',
  },
});
