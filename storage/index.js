import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem('@' + key, value);
  } catch (e) {
    // TODO
  }
};
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem('@' + key);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export { storeData, getData };
