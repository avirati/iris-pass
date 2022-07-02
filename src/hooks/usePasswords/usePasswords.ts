import { useContext } from 'react'

import { UsePasswordContext } from './usePasswords.context'

export const usePasswords = () => {
  const {
    passwords,
    addPassword,
    getPassword,
    removePassword,
    updatePassword,
  } = useContext(UsePasswordContext)

  return {
    passwords,
    addPassword,
    getPassword,
    removePassword,
    updatePassword
  }
}