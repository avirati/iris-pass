import React from 'react';
import { Dashboard } from '@atom-learning/icons';

import { EmptyState, Icon } from 'shared-components';

export const EmptyPasswordScreen: React.FC = () => {
  return (
    <EmptyState size='sm'>
      <EmptyState.Image
        as={Icon}
        is={Dashboard}
        size='xl'
        css={{ color: '$tonal200', my: 'auto' }}
      />
      <EmptyState.Title>No passwords found!</EmptyState.Title>
      <EmptyState.Body>
        Generate most secure passwords in a click! And sync them across devices
        :)
      </EmptyState.Body>
    </EmptyState>
  );
};
