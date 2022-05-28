import React from 'react'

import { Flex } from 'shared-components'

interface IContentContainer {
  children?: React.ReactNode
}

export const ContentContainer: React.FC<IContentContainer> = ({ children }) => {
  return (
    <Flex
      css={{
        p: '$5'
      }}
    >
      {children}
    </Flex>
  )
}