import { useContext } from 'react'

import { UsePasswordContext } from './usePasswords.context'

export const usePasswords = () => {
  const {
    passwords,
    getPassword,
    copyPassword,
    addPassword,
    getPasswordEntry,
    removePassword,
    updatePassword,
  } = useContext(UsePasswordContext)

  return {
    passwords,
    getPassword,
    copyPassword,
    addPassword,
    getPasswordEntry,
    removePassword,
    updatePassword
  }
}