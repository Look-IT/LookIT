import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const apiClient = axios.create({
  baseURL: process.env.API_URL,
});

export const storeToken = async (token) => {
  // console.log('DDDD ', process.env.API_URL);

  try {
    await AsyncStorage.setItem('@token', token);
    apiClient.defaults.headers.common['token'] = `${token}`;
  } catch (e) {
    console.error('Failed to store token');
  }
}