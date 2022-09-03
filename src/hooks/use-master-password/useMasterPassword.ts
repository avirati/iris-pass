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
    masterPassword,
    isMasterPasswordSaved,
    saveMasterPassword,
    verifyMasterPassword
  }
}