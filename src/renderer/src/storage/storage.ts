import localForage from 'localforage';
import 'localforage-getitems';
import 'localforage-setitems';

export class Storage {
  private store: LocalForage;

  constructor(storeName: string) {
    this.store = localForage.createInstance({
      driver: localForage.INDEXEDDB,
      name: 'password-manager',
      version: 1.0,
      storeName: storeName,
      description: 'Password Manager DB Store',
    });
  }

  public async getItems<T>(): Promise<Record<string, T>> {
    return this.store.getItems();
  }

  public async setItems<T>(items: Record<string, T>) {
    return this.store.setItems(items);
  }

  public async getItemsArray<T>(): Promise<T[]> {
    const dictionary = await this.getItems<T>();
    return Object.values(dictionary);
  }

  public async getItem<T>(key: string): Promise<T | null> {
    return this.store.getItem(key);
  }

  public async setItem<T>(key: string, value: T) {
    return this.store.setItem(key, value);
  }

  public async removeItem(key: string) {
    return this.store.removeItem(key);
  }

  public async hasItem(key: string) {
    return Boolean(await this.getItem(key));
  }
}
