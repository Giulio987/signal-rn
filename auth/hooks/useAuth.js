import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const useAuth = (registerAuth) => {
  const navigation = useNavigation();
  const auth = getAuth();

  //register listener only if in the login screen
  useEffect(() => {
    if (registerAuth) {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          navigation.navigate('Home');
        }
      });

      return () => unsubscribe;
    }
  }, []);

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  const register = (email, password, imageUrl, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          photoURL:
            imageUrl ||
            'https://cdn.imgbin.com/2/4/15/imgbin-computer-icons-portable-network-graphics-avatar-icon-design-avatar-DsZ54Du30hTrKfxBG5PbwvzgE.jpg',
          displayName: name || 'User',
        }).catch((err) => alert(err.message));
      })
      .catch((err) => alert(err.message));
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace('Login');
    });
  };

  return { signIn, signOutUser, register };
};

export default useAuth;
