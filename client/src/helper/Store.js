import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  let token = await AsyncStorage.getItem('access_token');

  return token;
};

export const getCurrentTermsOfService = async () => {
  let termsOfService = await AsyncStorage.getItem('termsOfService');

  return termsOfService;
};

export const getUserId = async () => {
  let userId = await AsyncStorage.getItem('userId');

  return userId;
};
