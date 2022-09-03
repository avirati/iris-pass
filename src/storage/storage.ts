import localForage from 'localforage'
import 'localforage-getitems'

export class Storage {
  private store: LocalForage

  constructor(storeName: string) {
    this.store = localForage.createInstance({
      driver      : localForage.INDEXEDDB,
      name        : 'password-manager',
      version     : 1.0,
      storeName   : storeName,
      description : 'Password Manager DB Store'
    })
  }

  public async getItems<T>(): Promise<Record<string, T>> {
    return localForage.getItems()
  }

  public async getItemsArray<T>(): Promise<T[]> {
    const dictionary = await this.getItems<T>()
    return Object.values(dictionary)
  }

  public getItem<T>(key: string): Promise<T | null> {
    return localForage.getItem(key)
  }

  public setItem<T>(key: string, value: T) {
    return localForage.setItem(key, value)
  }

  public removeItem(key: string) {
    return localForage.removeItem(key)
  }
}