import React from 'react'

import { Flex, Heading } from 'shared-components'

export const EmptyPasswordScreen: React.FC = () => {
  return (
    <Flex css={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Heading
        as="h3"
        size="sm"
        css={{
          color: '$tonal400',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'normal'
        }}
      >
        No Saved Passwords yet :)
      </Heading>
    </Flex>
  )
}