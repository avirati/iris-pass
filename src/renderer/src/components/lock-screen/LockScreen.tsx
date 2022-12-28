import React, { useEffect, useState } from 'react';

import { Box, Flex, keyframes, Heading, Image } from '../../shared-components';
import { useMasterPassword } from '../../hooks/use-master-password';
import { waitForSeconds } from '../../utils';

import { MasterPasswordForm } from './MasterPasswordForm';

const unlockAnimation = (direction: -1 | 1) =>
  keyframes({
    '0%': { transform: 'translateY(0)' },
    '80%': { transform: `translateY(${30 * direction}%)` },
    '100%': { transform: `translateY(${120 * direction}%)` },
  });

export const LockScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [shouldUnlock, setShouldUnlock] = useState<boolean>(false);
  const { masterPassword } = useMasterPassword();

  useEffect(() => {
    const isMasterPasswordSet = Boolean(masterPassword);
    setShouldUnlock(isMasterPasswordSet);
    waitForSeconds(2).then(() => setIsVisible(!isMasterPasswordSet));
  }, [masterPassword]);

  if (!isVisible) {
    return null;
  }

  return (
    <Flex
      css={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        flexDirection: 'column',
      }}
    >
      <Flex
        css={{
          bg: 'black',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          animation: shouldUnlock ? `${unlockAnimation(-1)} 1s` : 'none',
          animationFillMode: 'forwards',
          animationDelay: '1s',
        }}
      >
        <Heading css={{ color: '$tonal200' }}>IRISPass</Heading>
      </Flex>
      <Flex
        css={{
          bg: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'relative',
          animation: shouldUnlock ? `${unlockAnimation(1)} 1s` : 'none',
          animationFillMode: 'forwards',
          animationDelay: '1s',
          '@media only screen and (min-height: 500px)': {
            borderTop: '1px solid $tonal200',
          },
        }}
      >
        <Flex
          css={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid $tonal200',
            borderRadius: '$round',
            color: '$tonal200',
            top: '-50px',
            position: 'absolute',
            bg: '$tonal600',
            outline: 'none',
            '&:hover, &:active, &:focus': {
              color: '$tonal200 !important',
              bg: '$tonal600 !important',
            },
            '@media only screen and (min-height: 500px)': {
              display: 'flex',
            },
          }}
        >
          <Box
            css={{
              size: '100px',
            }}
          >
            <Image src='/icon.svg' />
          </Box>
        </Flex>
        <MasterPasswordForm />
      </Flex>
    </Flex>
  );
};
