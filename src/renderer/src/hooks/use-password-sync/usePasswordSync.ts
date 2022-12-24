import { useContext } from 'react';

import { UsePasswordSyncContext } from './usePasswordSync.context';

export const usePasswordSync = () => {
  const context = useContext(UsePasswordSyncContext);
  if (!context) {
    throw new Error(
      'usePasswordSync hook must be used under a UsePasswordSyncContext Provider'
    );
  }

  return {
    ...context,
  };
};
