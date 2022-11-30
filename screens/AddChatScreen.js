import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    addDoc(collection(getFirestore(), 'chats'), {
      chatName: input,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={() => {
          return (
            <Icon name="wechat" type="antdesign" size={24} color="black" />
          );
        }}
        onSubmitEditing={createChat}
      />
      <Button disabled={!input} title="Create new chat" onPress={createChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: 'white',
  },
});
