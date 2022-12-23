import React from 'react';

import { CSS, Flex } from '../../shared-components';

interface IContentContainer {
  children?: React.ReactNode;
  css?: CSS;
}

export const ContentContainer: React.FC<IContentContainer> = ({
  children,
  css,
}) => {
  return (
    <Flex
      css={{
        p: '$5',
        flexDirection: 'column',
        height: 'calc(100vh - 128px)',
        bg: '$tonal500',
        overflowY: 'auto',
        ...css,
      }}
    >
      {children}
    </Flex>
  );
};
