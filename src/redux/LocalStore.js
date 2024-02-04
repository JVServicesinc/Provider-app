import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (type, data, callback = () => {}) => {
  try {
    await AsyncStorage.setItem(`${type}`, data);
    callback(true);
  } catch (e) {
    callback(false);
  }
};

export const storeObjectData = async (type, data, callback = () => {}) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(`${type}`, jsonValue);
    callback(true);
  } catch (e) {
    callback(false);
  }
};

export const getData = async (type, callback = value => {}) => {
  try {
    const value = await AsyncStorage.getItem(`${type}`);
    if (value !== null) {
      callback(value);
    } else {
      callback('');
    }
  } catch (e) {
    callback('');
  }
};

export const getObjectData = async (type, callback = () => {}) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${type}`);
    callback(jsonValue != null ? JSON.parse(jsonValue) : {});
  } catch (e) {
    callback({});
  }
};

export const deleteItem = async type => {
  try {
    await AsyncStorage.removeItem(`${type}`);
  } catch (e) {
    // remove error
  }
};
