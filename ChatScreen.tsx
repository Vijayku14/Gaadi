import { Link } from "expo-router";
import React, { useState } from 'react';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Message = {
  id: string;
  text: string;
  time: string;
  sender: 'user' | 'support';
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Good Evening!',
      time: '8:29 pm',
      sender: 'support',
    },
    {
      id: '2',
      text: 'Welcome to Gaadi Customer Service',
      time: '8:29 pm',
      sender: 'support',
    },
   
  ]);

  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      time: 'Just now',
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  chatList: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  supportMessage: {},
  userMessage: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 10,
    borderRadius: 18,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
  },
  bubbleSupport: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 0,
  },
  bubbleUser: {
    backgroundColor: '#fff8e1',
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: '#fcb900',
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginTop: 3,
    marginLeft: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
});

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.supportMessage,
      ]}
    >
      {item.sender === 'support' && (
        <Image
          source={require('../assets/avatar.png')}
          style={styles.avatar}
        />
      )}
      <View>
        <View
          style={[
            styles.bubble,
            item.sender === 'user' ? styles.bubbleUser : styles.bubbleSupport,
          ]}
        >
          <Text>{item.text}</Text>
          
        </View>
        <Text style={styles.time}>{item.time}</Text>
        <Link href="/CallingScreen">Go</Link>
      </View>
      
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputText}
          placeholder="Type your message"
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            color="#fcb900"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
