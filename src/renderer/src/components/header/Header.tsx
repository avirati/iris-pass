import React from 'react';
import { Rotate, LockAlt, Qr } from '@atom-learning/icons';

import {
  Flex,
  Icon,
  keyframes,
  Link,
  styled,
  Text,
} from '../../shared-components';
import { DarkActionIcon } from '../form-fields';
import { usePasswordSync } from '../../hooks/use-password-sync';
import { useMasterPassword } from '../../hooks/use-master-password';
import { useDevice } from '../../hooks/use-device';

const rotatingAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const StyledActionIcon = styled(DarkActionIcon, {
  '& > svg': { size: '32px' },
  variants: {
    loading: {
      true: {
        animation: `${rotatingAnimation} 2s linear infinite`,
      },
    },
  },
});

export const Header: React.FC = () => {
  const { isAndroid, isElectron } = useDevice();
  const { isUserAuthenticated } = useMasterPassword();
  const { isSyncing, syncPasswords } = usePasswordSync();

  return (
    <Flex
      css={{
        height: '$6',
        backgroundColor: '$tonal600',
        alignItems: 'center',
        px: '$5',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
      }}
    >
      <Link
        href='/#/'
        css={{
          display: 'flex',
          alignItems: 'center',
          '&:hover, &:active, &:focus': {
            textDecoration: 'none',
          },
        }}
      >
        <Icon is={LockAlt} css={{ color: '$tonal100', mr: '$2' }} />
        <Text
          as='span'
          size={isAndroid ? 'md' : 'lg'}
          css={{
            color: '$tonal100',
            textTransform: 'uppercase',
          }}
        >
          Password Manager
        </Text>
      </Link>
      {isUserAuthenticated && (
        <StyledActionIcon
          label='sync'
          loading={isAndroid && isSyncing}
          onClick={syncPasswords}
          css={{ border: 'none' }}
        >
          <Icon is={isElectron ? Qr : Rotate} />
        </StyledActionIcon>
      )}
    </Flex>
  );
};
