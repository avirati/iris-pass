import React from 'react';
import { LockAlt } from '@atom-learning/icons';

import { Flex, Icon, Link, Text } from 'shared-components';

export const Header: React.FC = () => {
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
          size='lg'
          css={{
            color: '$tonal100',
            textTransform: 'uppercase',
          }}
        >
          Password Manager
        </Text>
      </Link>
    </Flex>
  );
};
