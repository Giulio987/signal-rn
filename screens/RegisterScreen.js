import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Button from '../UI/Button';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  //FAI QUALCOSA ESATTAMENTE PRIMA CHE SI RENDERIZZI QUALCOSA SULLO SCHERMO
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoUrl:
            imageUrl ||
            'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Create a Signal account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          keyboardType="default"
          autoFocus
          autoCapitalize={false}
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          keyboardType="default"
          autoCapitalize={false}
          autoComplete={false}
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          autoCapitalize={false}
          autoComplete={false}
          autoCorrect={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Profile picture URL (optional)"
          keyboardType="default"
          autoCapitalize={false}
          autoComplete={false}
          autoCorrect={false}
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
          style={styles.input}
        />
      </View>
      <Button title="Register" onPress={register} style={styles.button} />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 50,
    fontSize: 28,
  },
  button: {
    width: 200,
    marginTop: 40,
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
});
