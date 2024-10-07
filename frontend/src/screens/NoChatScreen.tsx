import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface NoChatProps {
  onStartChat: () => void;
}

const NoChat: React.FC<NoChatProps> = ({ onStartChat }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/no-chat.png')}
        style={styles.image}
      />
      <Text style={styles.title}>No Chats Yet</Text>
      <Text style={styles.subtitle}>
        Start a conversation with shelters or other pet lovers.
      </Text>
      <TouchableOpacity style={styles.startChatButton} onPress={onStartChat}>
        <Text style={styles.startChatText}>Start a Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  startChatButton: {
    backgroundColor: '#16A99F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  startChatText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NoChat;