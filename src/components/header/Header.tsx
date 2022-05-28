import React from 'react'

import { Flex } from 'shared-components'

interface IHeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<IHeaderProps> = ({ children }) => {
  return (
    <Flex
      css={{
        height: '$6',
        backgroundColor: '$tonal600',
        alignItems: 'center',
        px: '$5'
      }}
    >
      {children}
    </Flex>
  )
}