import React from 'react'

import { Flex, Link } from 'shared-components'
import { AddEntryButton } from 'components/add-entry-button'

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
        top: 0
      }}
    >
      <Link
        href="/#/"
        size="lg"
        css={{
          color: '$tonal100',
          textTransform: 'uppercase',
          '&:hover, &:active, &:focus': {
            color: '$tonal100',
            textDecoration: 'none',
          }
        }}
      >
        Password Manager
      </Link>
      <AddEntryButton />
    </Flex>
  )
}