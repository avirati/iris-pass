import React from 'react';

import { Flex, Image, Text } from '../../shared-components';
import { usePasswordSync } from '../../hooks/use-password-sync';

export const QRCodeViewer: React.FC = () => {
  const { qrCode, stopSync } = usePasswordSync();

  React.useEffect(() => stopSync, [stopSync]);

  return (
    <Flex
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        mt: '64px',
        flexDirection: 'column',
        gap: '$5',
      }}
    >
      <Image src={qrCode} />
      <Text css={{ color: '$tonal200', textAlign: 'center' }}>
        Please scan this QR code from your mobile app to begin sync
      </Text>
    </Flex>
  );
};
