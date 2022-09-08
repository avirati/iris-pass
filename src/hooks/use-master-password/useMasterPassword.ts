import { useContext } from 'react'

import { UseMasterPasswordContext } from './useMasterPassword.context'

export const useMasterPassword = () => {
  const context = useContext(UseMasterPasswordContext)
  if (!context) {
    throw new Error('useMasterPassword hook must be used under a UseMasterPasswordContext Provider')
  }

  const {
    masterPassword,
    isMasterPasswordSaved,
    saveMasterPassword,
    verifyMasterPassword
  } = context

  return {
    masterPassword: '28096a441e8c34c2c1063ce523598fc6e070417e4a03cf6af651c7ba0b5c6f1e',
    isMasterPasswordSaved,
    saveMasterPassword,
    verifyMasterPassword
  }
}