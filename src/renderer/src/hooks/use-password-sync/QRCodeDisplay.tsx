import React from 'react';
import { Close } from '@atom-learning/icons';

import {
  ActionIcon,
  Flex,
  Icon,
  Image,
  keyframes,
  Text,
} from '../../shared-components';
import { usePasswordSync } from './usePasswordSync';

interface IQRCodeDisplayProps {
  image: string;
}

const fadeInAnimation = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const QRCodeDisplay: React.FC<IQRCodeDisplayProps> = ({ image }) => {
  const { clearQRCode } = usePasswordSync();
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        flexDirection: 'column',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        bg: 'rgba(0, 0, 0, 0.8)',
        pt: '64px',
        px: '$5',
        animation: `${fadeInAnimation} 0.5s`,
        animationFillMode: 'forwards',
        gap: '$5',
      }}
    >
      <ActionIcon
        label='close-qr-code'
        onClick={clearQRCode}
        css={{
          color: 'white',
          position: 'absolute',
          top: '$4',
          right: '$5',
          '& > svg': { size: '32px' },
          '&:not(:disabled):hover, &:not(:disabled):active, &:not(:disabled):focus':
            { color: 'white' },
        }}
      >
        <Icon is={Close} />
      </ActionIcon>
      <Image src={image} />
      <Text css={{ color: '$tonal200', textAlign: 'center' }}>
        Please scan this QR code from your mobile app to begin sync
      </Text>
    </Flex>
  );
};
