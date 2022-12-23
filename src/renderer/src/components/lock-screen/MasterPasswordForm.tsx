import React from 'react';

import { useMasterPassword } from '../../hooks/use-master-password';
import {
  Button,
  Form,
  PasswordField,
  CSS,
  toast,
  keyframes,
  Flex,
} from '../../shared-components';

interface IFormData {
  password: string;
  confirmPassword: string;
}

const fadeInAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const passwordFieldCSS: CSS = {
  'input, input:focus, input:active': {
    color: '$tonal400',
    borderColor: '$tonal400',
    bg: 'transparent',
  },
  'input:focus': {
    borderColor: '$tonal100',
    color: '$tonal100',
  },
};

const RegisterMasterPasswordForm: React.FC = () => {
  const { saveMasterPassword } = useMasterPassword();

  const onSubmit = async ({ password, confirmPassword }: IFormData) => {
    if (password === confirmPassword) {
      await saveMasterPassword(password);
      toast.success('Master Password saved!');
    } else {
      toast.error('Passwords do not match');
    }
  };

  return (
    <Flex
      css={{
        p: '$5',
        flexDirection: 'column',
        width: '100%',
        animation: `${fadeInAnimation} 1s`,
        animationFillMode: 'forwards',
        '@sm': { width: '300px' },
      }}
    >
      <Form
        onSubmit={(data) => onSubmit(data)}
        render={() => {
          return (
            <>
              <PasswordField
                name='password'
                placeholder='Enter Master Password'
                label=''
                required
                css={passwordFieldCSS}
              />
              <PasswordField
                name='confirmPassword'
                placeholder='Repeat Master Password'
                label=''
                required
                css={passwordFieldCSS}
              />
              <Button
                type='submit'
                css={{
                  width: '100%',
                  mt: '$4',
                  '&, &:hover, &:active, &:focus': {
                    bg: 'transparent !important',
                    border: '1px solid $tonal200 !important',
                    color: '$tonal200 !important',
                  },
                }}
                theme='neutral'
              >
                Save
              </Button>
            </>
          );
        }}
      />
    </Flex>
  );
};

const VerifyMasterPasswordForm: React.FC = () => {
  const { verifyMasterPassword } = useMasterPassword();

  const onSubmit = async ({ password }: Partial<IFormData>) => {
    const doesPasswordMatch = await verifyMasterPassword(password as string);
    if (doesPasswordMatch) {
      toast.success('Master Password verified!');
    } else {
      toast.error('Master Password mismatch! Please try again');
    }
  };

  return (
    <Flex
      css={{
        p: '$5',
        flexDirection: 'column',
        width: '100%',
        animation: `${fadeInAnimation} 1s`,
        animationFillMode: 'forwards',
        '@sm': { width: '300px' },
      }}
    >
      <Form
        onSubmit={(data) => onSubmit(data)}
        render={() => {
          return (
            <>
              <PasswordField
                name='password'
                placeholder='Enter Master Password'
                label=''
                required
                css={passwordFieldCSS}
              />
              <Button
                type='submit'
                css={{
                  width: '100%',
                  mt: '$4',
                  '&, &:hover, &:active, &:focus': {
                    bg: 'transparent !important',
                    border: '1px solid $tonal200 !important',
                    color: '$tonal200 !important',
                  },
                }}
                theme='neutral'
              >
                Verify
              </Button>
            </>
          );
        }}
      />
    </Flex>
  );
};

export const MasterPasswordForm: React.FC = () => {
  const { isMasterPasswordSaved } = useMasterPassword();
  return isMasterPasswordSaved ? (
    <VerifyMasterPasswordForm />
  ) : (
    <RegisterMasterPasswordForm />
  );
};
