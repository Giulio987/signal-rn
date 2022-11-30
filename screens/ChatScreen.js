import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Keyboard } from 'react-native';
import { serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const currentUser = getAuth().currentUser;
  const fireDb = getFirestore();
  const sendMessage = () => {
    //Keyboard.dismiss();
    addDoc(collection(fireDb, 'chats', route.params.id, 'messages'), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: currentUser.displayName ? currentUser.displayName : 'User',
      email: currentUser.email ? currentUser.email : 'User',
      photoURL: currentUser.photoURL
        ? currentUser.photoURL
        : 'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
    });
    setInput('');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerTitle: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flex: 1,
              marginLeft: 22,
            }}
          >
            <Avatar
              rounded
              source={{
                uri:
                  messages[0]?.data.photoUrl ||
                  'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
              }}
              size="small"
            />
            <Text
              style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}
            >
              {route.params.chatName}
            </Text>
          </View>
        );
      },
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 72,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  useLayoutEffect(() => {
    const q = query(
      collection(fireDb, 'chats', route.params.id, 'messages'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [route]);
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={90}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{ flex: 1 }}
          >
            <>
              <ScrollView contentContainerStyle={{ padding: 10 }}>
                {messages.map(({ id, data }) =>
                  data.email === currentUser?.email ? (
                    <View key={id} style={styles.reciever}>
                      <Avatar
                        source={{
                          uri:
                            data.photoURL ||
                            'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
                        }}
                        rounded
                        size={30}
                        position={'absolute'}
                        right={-10}
                        bottom={-15}
                      />
                      <Text style={styles.recieverText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View key={id} style={styles.sender}>
                      <Avatar
                        source={{
                          uri:
                            data.photoURL ||
                            'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
                        }}
                        rounded
                        size={30}
                        position={'absolute'}
                        right={-5}
                        bottom={-15}
                      />
                      <Text style={styles.senderText}>{data.message}</Text>
                      <Text style={styles.senderName}>
                        {data.displayName || 'anonymous'}
                      </Text>
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.footer}>
                <TextInput
                  placeholder="Signal Message"
                  style={styles.textInput}
                  value={input}
                  onChangeText={(value) => setInput(value)}
                  onSubmitEditing={sendMessage}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#2B68E6" />
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: 'rgb(61,106,229)',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 8,
    maxWidth: '80%',
    position: 'relative',
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
});
