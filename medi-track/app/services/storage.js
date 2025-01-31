import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key} in AsyncStorage:`, error);
  }
};

export const getLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error fetching ${key} from AsyncStorage:`, error);
  }
};

export const removeLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`Error clearing from AsyncStorage:`, error);
  }
}
