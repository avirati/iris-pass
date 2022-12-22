import React from 'react';
import { Plus } from '@atom-learning/icons';

import { Button, Icon } from 'shared-components';

export const AddEntryButton: React.FC = () => {
  return (
    <Button
      href='/#/password/add'
      size='lg'
      appearance='outline'
      theme='neutral'
      css={{
        p: '$4',
        borderRadius: '$round',
        height: 'unset',
        position: 'fixed',
        bottom: '$4',
        right: '$4',
      }}
    >
      <Icon is={Plus} css={{ mr: 0 }} />
    </Button>
  );
};
