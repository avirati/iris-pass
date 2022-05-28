import { useContext } from 'react'

import { UsePasswordContext } from './usePasswords.context'

export const usePasswords = () => {
  const {
    passwords,
    addPassword,
    removePassword,
    updatePassword,
  } = useContext(UsePasswordContext)

  return {
    passwords,
    addPassword,
    removePassword,
    updatePassword
  }
}