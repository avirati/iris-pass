import React from 'react';
import { Ok, Copy, Eye, EyeClosed } from '@atom-learning/icons';

import { Flex, Icon } from '../../shared-components';
import { waitForSeconds } from '../../utils';
import { DarkActionIcon, InputField } from '../../components/form-fields';

interface IEnhancedInputProps extends React.ComponentProps<typeof InputField> {
  visible?: boolean;
  onCopy?: () => void;
  onVisibilityToggle?: () => void;
}

export const EnhancedInput: React.FC<IEnhancedInputProps> = ({
  visible,
  onCopy,
  onVisibilityToggle,
  css,
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
      <InputField css={{ width: '100%', ...css }} {...props} />
      {onCopy && (
        <DarkActionIcon
          label='copy-value'
          appearance='outline'
          size='lg'
          onClick={onCopyClicked}
          css={{ minWidth: '40px' }}
        >
          <Icon is={valueCopied ? Ok : Copy} />
        </DarkActionIcon>
      )}
      {onVisibilityToggle && (
        <DarkActionIcon
          label={visible ? 'hide-value' : 'reveal-value'}
          appearance='outline'
          size='lg'
          onClick={onVisibilityToggle}
          css={{ minWidth: '40px' }}
        >
          <Icon is={visible ? Eye : EyeClosed} />
        </DarkActionIcon>
      )}
    </Flex>
  );
};
