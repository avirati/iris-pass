import localForage from 'localforage'
import 'localforage-getitems'

localForage.config({
  driver      : localForage.INDEXEDDB,
  name        : 'password-manager',
  version     : 1.0,
  storeName   : 'password-manager-store',
  description : 'Password Manager DB Store'
});

export const getItems = <T>(): Promise<Record<string, T>> => localForage.getItems() || {}
export const getItemsArray = async <T>(): Promise<T[]> => {
  const dictionary = await getItems<T>()
  return Object.values(dictionary)
}
export const getItem = <T>(key: string): Promise<T | null> => localForage.getItem(key)
export const setItem = <T>(key: string, value: T) => localForage.setItem(key, value)
export const removeItem = (key: string) => localForage.removeItem(key)
