import { StorageAdapter } from './types';

export function createStorage(adapter: StorageAdapter, namespace: string) {
  const prefix = `${namespace}:`;
  return {
    async getItem<T = string>(key: string): Promise<T | null> {
      const val = await adapter.getItem(prefix + key);
      return val ? (JSON.parse(val) as T) : null;
    },
    async setItem<T>(key: string, value: T) {
      await adapter.setItem(prefix + key, JSON.stringify(value));
    },
    async removeItem(key: string) {
      await adapter.removeItem(prefix + key);
    },
  };
}