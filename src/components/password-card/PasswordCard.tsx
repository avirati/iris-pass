import React from 'react'

import { IPassword } from 'hooks/use-passwords'
import { Flex, Heading, Link, Text } from 'shared-components'
import { parseWebsite } from 'utils'

interface IPasswordCard {
  password: IPassword
}

export const PasswordCard: React.FC<IPasswordCard> = ({ password }) => {
  const { website, login, id } = password
  const { heroLetter, hostname } = parseWebsite(website)

  return (
    <Flex
      as={Link}
      css={{
        gap: '$4',
        '&:before': { display: 'none' },
        '&:hover, &:active, &:focus': {
          color: '$tonal100',
          textDecoration: 'none',
        }
      }}
      href={`/#/password/view/${id}`}
    >
      <Flex css={{ minWidth: '$6', minHeight: '$6', border: '1px solid $primary', borderRadius: '$0', alignItems: 'center', justifyContent: 'center' }}>
        <Heading
          as="h2"
          size="lg"
          css={{
            textTransform: 'uppercase',
            color: '$primary'
          }}>
            {heroLetter}
        </Heading>
      </Flex>
      <Flex css={{ flexDirection: 'column', justifyContent: 'center', gap: '$4' }}>
        <Heading as="h3" size="sm" css={{ color: '$tonal400' }}>{hostname}</Heading>
        <Text size="sm" css={{ color: '$tonal300' }}>{login}</Text>
      </Flex>
    </Flex>
  )
}