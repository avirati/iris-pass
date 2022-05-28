import React from 'react'

import { CSS, Flex } from 'shared-components'

interface IContentContainer {
  children?: React.ReactNode
  css?: CSS
}

export const ContentContainer: React.FC<IContentContainer> = ({ children, css }) => {
  return (
    <Flex
      css={{
        p: '$5',
        flexDirection: 'column',
        ...css
      }}
    >
      {children}
    </Flex>
  )
}