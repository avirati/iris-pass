import React, { createContext, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { toast } from 'shared-components'
import * as Storage from 'storage'

import { IPassword, IUsePasswordContext } from './usePasswords.types'

export const UsePasswordContext = createContext<IUsePasswordContext>({
  passwords: [],
  addPassword: () => Promise.resolve(),
  removePassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve()
})

export const UsePasswordProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [passwords, setPasswords] = useState<IPassword[]>([])

  const addPassword: IUsePasswordContext['addPassword'] = useCallback(async ({
    category,
    login,
    password,
    website
  }) => {
    const id = uuid()
    try {
      await Storage.setItem(id, {
        id,
        category,
        login,
        password,
        website
      })

      toast.success('Password saved !')
    } catch (error) {
      console.error(error)
      toast.error('Unable to save password')
    }
  }, [])

  const removePassword: IUsePasswordContext['removePassword'] = useCallback(async (id) => {
    try {
      await Storage.removeItem(id)
      toast.success('Password removed !')
    } catch (error) {
      console.error(error)
      toast.error('Unable to remove password')
    }
  }, [])

  const updatePassword: IUsePasswordContext['updatePassword'] = useCallback(async (password) => {
    try {
      await Storage.setItem<IPassword>(password.id, password)
      toast.success('Password updated !')
    } catch (error) {
      console.error(error)
      toast.error('Unable to update password')
    }
  }, [])

  useEffect(() => {
    Storage
    .getItemsArray<IPassword>()
    .then(setPasswords)
  }, [])

  return (
    <UsePasswordContext.Provider value={{ passwords, addPassword, removePassword, updatePassword }}>
      {children}
    </UsePasswordContext.Provider>
  )
}