import React from 'react';

import { IPassword } from '../../hooks/use-passwords';
import { CSS, Flex, Heading, Link, Text } from '../../shared-components';
import { parseWebsite } from '../../utils';

interface IPasswordCard {
  password: IPassword;
  css?: CSS;
}

const ellipsisCSS: CSS = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const PasswordCard: React.FC<IPasswordCard> = ({ password, css }) => {
  const { website, login, id } = password;
  const { heroLetter, hostname } = parseWebsite(website);

  return (
    <Flex
      as={Link}
      css={{
        gap: '$4',
        '&:before': { display: 'none' },
        '&:hover, &:active, &:focus': {
          color: '$tonal100',
          textDecoration: 'none',
        },
        ...css,
      }}
      href={`#/password/view/${id}`}
    >
      <Flex
        css={{
          minWidth: '$5',
          minHeight: '$5',
          border: '1px solid $tonal200',
          borderRadius: '$0',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Heading
          as='h2'
          size='lg'
          css={{
            textTransform: 'uppercase',
            color: '$tonal200',
          }}
        >
          {heroLetter}
        </Heading>
      </Flex>
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '$2',
          maxWidth: '250px',
        }}
      >
        <Heading
          as='h3'
          size='md'
          css={{ pb: '$1', color: '$tonal200', ...ellipsisCSS }}
        >
          {hostname}
        </Heading>
        <Text size='sm' css={{ pb: '$1', color: '$tonal200', ...ellipsisCSS }}>
          {login}
        </Text>
      </Flex>
    </Flex>
  );
};
