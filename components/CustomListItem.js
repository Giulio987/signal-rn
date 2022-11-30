import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const q = query(
      collection(db, 'chats', id, 'messages'),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setChatMessages(snap.docs.map((doc) => doc.data()));
    });
    return unsubscribe;
  }, []);
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 'bold' }}>
          {chatName}
        </ListItem.Title>
        {/* Specificando il numero di linee mette automaticamente le ellipsis */}
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
