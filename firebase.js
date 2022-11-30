import {initializeAuth} from 'firebase/auth';
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAeY1B4i1GzHOMp_6KJoJr-URbCmNvnETk',
  authDomain: 'signal-clone-bc3e0.firebaseapp.com',
  projectId: 'signal-clone-bc3e0',
  storageBucket: 'signal-clone-bc3e0.appspot.com',
  messagingSenderId: '969147298924',
  appId: '1:969147298924:web:f1b1d1be86f9c95e855449',
};

//NOTE ottimizzazione importing firebase, meglio non inizializzarla sempre
/* let fire_app;
if (firebase.apps.length === 0) { */
  const fire_app = initializeApp(firebaseConfig);
/* } else {
  fire_app = firebase.app();
} */
initializeAuth(fire_app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(fire_app);

export { db };

/* const db = fire_app.firestore();
const auth = firebase.auth();

export { db, auth };
 */