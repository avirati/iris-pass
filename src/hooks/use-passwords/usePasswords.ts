import { useContext } from 'react'

import { UsePasswordContext } from './usePasswords.context'

export const usePasswords = () => {
  const {
    passwords,
    copyPassword,
    addPassword,
    getPassword,
    removePassword,
    updatePassword,
  } = useContext(UsePasswordContext)

  return {
    passwords,
    copyPassword,
    addPassword,
    getPassword,
    removePassword,
    updatePassword
  }
}