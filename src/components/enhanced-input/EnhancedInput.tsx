import React from 'react';
import { Ok, Copy, Eye, EyeClosed } from '@atom-learning/icons';

import { ActionIcon, Flex, Icon, Input } from 'shared-components';
import { waitForSeconds } from 'utils';

interface IEnhancedInputProps extends React.ComponentProps<typeof Input> {
  visible?: boolean;
  onCopy?: () => void;
  onVisibilityToggle?: () => void;
}

export const EnhancedInput: React.FC<IEnhancedInputProps> = ({
  visible,
  onCopy,
  onVisibilityToggle,
  ...props
}) => {
  const [valueCopied, setValueCopied] = React.useState<boolean>(false);

  const onCopyClicked = async () => {
    onCopy?.();
    setValueCopied(true);
    await waitForSeconds(2);
    setValueCopied(false);
  };

  return (
    <Flex css={{ alignItems: 'flex-end', gap: '$2' }}>
      <Input {...props} />
      {onCopy && (
        <ActionIcon
          label='copy-value'
          appearance='outline'
          size='lg'
          onClick={onCopyClicked}
        >
          <Icon is={valueCopied ? Ok : Copy} />
        </ActionIcon>
      )}
      {onVisibilityToggle && (
        <ActionIcon
          label={visible ? 'hide-value' : 'reveal-value'}
          appearance='outline'
          size='lg'
          onClick={onVisibilityToggle}
        >
          <Icon is={visible ? Eye : EyeClosed} />
        </ActionIcon>
      )}
    </Flex>
  );
};
