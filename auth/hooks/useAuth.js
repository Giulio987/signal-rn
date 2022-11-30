import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const useAuth = (registerAuth) => {
  const navigation = useNavigation();
  const auth = getAuth();

  //register listener only if in the login screen
  useEffect(() => {
    const auth = getAuth();
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

  return { signIn };
};

export default useAuth;
