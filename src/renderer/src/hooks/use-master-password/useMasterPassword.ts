import { useContext } from 'react';

import { UseMasterPasswordContext } from './useMasterPassword.context';

export const useMasterPassword = () => {
  const context = useContext(UseMasterPasswordContext);
  if (!context) {
    throw new Error(
      'useMasterPassword hook must be used under a UseMasterPasswordContext Provider'
    );
  }

  return {
    ...context,
  };
};
