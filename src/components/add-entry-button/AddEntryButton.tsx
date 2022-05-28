import React from 'react'
import { Plus } from '@atom-learning/icons'

import { Button, Icon } from 'shared-components'

export const AddEntryButton: React.FC = () => {
  return (
    <Button href="/new" size="lg" appearance="outline" theme="neutral" css={{ px: '$4' }}>
      <Icon is={Plus} css={{ mr: 0 }}/>
    </Button>
  )
}