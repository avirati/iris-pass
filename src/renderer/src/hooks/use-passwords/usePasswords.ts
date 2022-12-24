import { useContext } from 'react';

import { UsePasswordContext } from './usePasswords.context';

export const usePasswords = () => {
  const context = useContext(UsePasswordContext);
  if (!context) {
    throw new Error(
      'usePasswords hook must be used under a UsePasswordContext Provider'
    );
  }

  return { ...context };
};
