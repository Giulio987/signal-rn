import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import signalLogo from '../assets/Signal-Messenger-Icon.png';
import Button from '../UI/Button';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return () => unsubscribe;
  }, []);
  //TODO salvare i dati di login in modo da non doverli inserire ogni volta
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="light" />
      <Image source={signalLogo} style={{ height: 200, width: 200 }} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          autoFocus
          keyboardType="email-address"
          autoComplete={false}
          autoCapitalize={false}
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          autoFocus
          secureTextEntry
          autoComplete={false}
          autoCapitalize={false}
          autoCorrect={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" style={styles.button} onPress={signIn} />
        <Button
          title="Register"
          style={styles.button}
          type="outlined"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  input: {
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: { width: 200, marginTop: 10 },
});
