import localForage from 'localforage'

localForage.config({
  driver      : localForage.INDEXEDDB,
  name        : 'password-manager',
  version     : 1.0,
  storeName   : 'password-manager-store',
  description : 'Password Manager DB Store'
});

export const getItem = (key: string) => localForage.getItem(key)
export const setItem = (key: string, value: Record<string, any>) => localForage.setItem(key, value)
export const removeItem = (key: string) => localForage.removeItem(key)
