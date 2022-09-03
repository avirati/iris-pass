import React, { createContext, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { toast } from 'shared-components'
import { Storage } from 'storage'

import { IPassword, IUsePasswordContext } from './usePasswords.types'
import { CryptoUtil } from 'utils/crypto'
import { useMasterPassword } from 'hooks/use-master-password'

export const UsePasswordContext = createContext<IUsePasswordContext>({
  passwords: [],
  addPassword: () => Promise.resolve(),
  removePassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  getPassword: () => Promise.resolve(null)
})

const store = new Storage('password-manager')

export const UsePasswordProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [passwords, setPasswords] = useState<IPassword[]>([])
  const [refreshCounter, setRefreshCounter] = useState<number>(0)
  const { masterPassword } = useMasterPassword()

  const addPassword: IUsePasswordContext['addPassword'] = useCallback(async ({
    category,
    login,
    password,
    website
  }) => {
    const id = uuid()
    try {
      const encryptedPassword = CryptoUtil.encrypt(password, masterPassword as string)
      await store.setItem(id, {
        id,
        category,
        login,
        password: encryptedPassword,
        website
      })

      toast.success('Password saved!')
      setRefreshCounter(refreshCounter + 1)
    } catch (error) {
      console.error(error)
      toast.error('Unable to save password')
    }
  }, [masterPassword, refreshCounter])

  const removePassword: IUsePasswordContext['removePassword'] = useCallback(async (id) => {
    try {
      await store.removeItem(id)
      toast.success('Password removed!')
      setRefreshCounter(refreshCounter + 1)
    } catch (error) {
      console.error(error)
      toast.error('Unable to remove password')
    }
  }, [refreshCounter, setRefreshCounter])

  const updatePassword: IUsePasswordContext['updatePassword'] = useCallback(async (password) => {
    try {
      await store.setItem<IPassword>(password.id, password)
      toast.success('Password updated!')
      setRefreshCounter(refreshCounter + 1)
    } catch (error) {
      console.error(error)
      toast.error('Unable to update password')
    }
  }, [refreshCounter, setRefreshCounter])

  const getPassword: IUsePasswordContext['getPassword'] = useCallback(async (id) => {
    try {
      const password = await store.getItem<IPassword>(id)
      return password
    } catch (error) {
      console.error(error)
      toast.error('Unable to fetch password data')
      return null
    }
  }, [])

  useEffect(() => {
    store
      .getItemsArray<IPassword>()
      .then(setPasswords)
  }, [refreshCounter])

  return (
    <UsePasswordContext.Provider
      value={{
        passwords,
        addPassword,
        removePassword,
        updatePassword,
        getPassword,
      }
      }>
      {children}
    </UsePasswordContext.Provider>
  )
}