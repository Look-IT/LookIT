import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const apiClient = axios.create({
  baseURL: API_URL,
});

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@token', token);
    apiClient.defaults.headers.common['token'] = `${token}`;
  } catch (e) {
    console.error('Failed to store token');
  }
}