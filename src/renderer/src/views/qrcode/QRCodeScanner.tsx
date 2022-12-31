import React from 'react';

import { Box, Flex } from '../../shared-components';
import { usePasswordSync } from '../../hooks/use-password-sync';
import { useMasterPassword } from '../../hooks/use-master-password';

export const QRCodeScanner: React.FC = () => {
  const { disableLock, enableLock } = useMasterPassword();
  const { startMobileSync, stopSync } = usePasswordSync();
  React.useEffect(() => {
    disableLock();
    startMobileSync();
    return () => {
      enableLock();
      stopSync();
    };
  }, []);

  return (
    <Flex
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        mt: '64px',
      }}
    >
      <Box
        css={{
          size: '256px',
          border: '1px solid $brandGreen',
          borderRadius: '$0',
        }}
      />
    </Flex>
  );
};
