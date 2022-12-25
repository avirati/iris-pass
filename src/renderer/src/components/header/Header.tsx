import React from 'react';
import { ArrowLeft, Rotate, LockAlt, Qr } from '@atom-learning/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

import {
  Flex,
  Heading,
  Icon,
  keyframes,
  styled,
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
  const { isUserAuthenticated, lock } = useMasterPassword();
  const { isSyncing } = usePasswordSync();
  const location = useLocation();
  const history = useHistory();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    if (isAndroid) {
      CapacitorApp.removeAllListeners();
      CapacitorApp.addListener('backButton', () => {
        if (!isHome) {
          history.goBack();
        } else {
          CapacitorApp.exitApp();
        }
      });
      CapacitorApp.addListener('pause', lock);
    }
  }, [history, isAndroid, isHome, lock]);

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
      <Flex
        css={{
          display: 'flex',
          alignItems: 'center',
          '&:hover, &:active, &:focus': {
            textDecoration: 'none',
          },
        }}
      >
        {isHome ? (
          <Icon is={LockAlt} css={{ color: '$tonal100', mr: '$2' }} />
        ) : (
          <StyledActionIcon
            size='md'
            label='go-back'
            css={{ color: '$tonal100', mr: '$2', border: 'none', size: '24px' }}
            onClick={() => history.goBack()}
          >
            <Icon is={ArrowLeft} />
          </StyledActionIcon>
        )}
        <Heading
          as='h1'
          size='xs'
          css={{
            color: '$tonal100',
            textTransform: 'uppercase',
          }}
        >
          Password Manager
        </Heading>
      </Flex>
      {isUserAuthenticated && (
        <StyledActionIcon
          label='sync'
          loading={isAndroid && isSyncing}
          onClick={() =>
            history.push(isElectron ? '/qrcode/viewer' : '/qrcode/scanner')
          }
          css={{ border: 'none', size: '24px' }}
        >
          <Icon is={isElectron ? Qr : Rotate} />
        </StyledActionIcon>
      )}
    </Flex>
  );
};
