import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { getAuth, setPersistence, signOut } from 'firebase/auth';
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const currentUser = getAuth().currentUser;
  const database = getFirestore();
  const auth = getAuth();
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    });
  };

  useEffect(() => {
    const q = query(collection(database, 'chats'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: { color: 'black' },
      headerTintColot: 'black',
      headerLeft: () => {
        return (
          <View style={{}}>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
              <Avatar
                rounded
                source={{
                  uri:
                    currentUser?.photoURL ||
                    'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              width: 65,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('AddChat')}
            >
              <SimpleLineIcons name="pencil" size={20} color="black" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };
  return (
    <SafeAreaView>
      {/* TODO mettere una flatlist */}
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            chat={chatName}
            id={id}
            chatName={chatName}
            key={id}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
