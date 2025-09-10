import React from 'react';
import { Dashboard } from '@atom-learning/icons';

import { EmptyState, Icon } from '../../shared-components';

export const EmptyPasswordScreen: React.FC = () => {
  return (
    <EmptyState size='sm' css={{ my: 'auto', '& svg': { size: '84px' } }}>
      <EmptyState.Image as={Icon} is={Dashboard} css={{ color: '$tonal200' }} />
      <EmptyState.Title css={{ color: '$tonal200' }}>
        No passwords found!
      </EmptyState.Title>
      <EmptyState.Body css={{ color: '$tonal200' }}>
        Generate most secure passwords in a click!
      </EmptyState.Body>
    </EmptyState>
  );
};
