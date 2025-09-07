import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAdapter } from './types.js';

export const asyncStorageAdapter: StorageAdapter = {
  async getItem(k) { return AsyncStorage.getItem(k); },
  async setItem(k, v) { return AsyncStorage.setItem(k, v); },
  async removeItem(k) { return AsyncStorage.removeItem(k); },
};


export const localStorageAdapter: StorageAdapter = {
  async getItem(k) { return localStorage.getItem(k); },
  async setItem(k, v) { localStorage.setItem(k, v); },
  async removeItem(k) { localStorage.removeItem(k); },
};

export const sessionStorageAdapter: StorageAdapter = {
  async getItem(k) { return sessionStorage.getItem(k); },
  async setItem(k, v) { sessionStorage.setItem(k, v); },
  async removeItem(k) { sessionStorage.removeItem(k); },
};

