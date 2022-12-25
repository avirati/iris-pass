import React from 'react';
import { User } from '@atom-learning/icons';

import { useMasterPassword } from '../../hooks/use-master-password';
import {
  Button,
  Form,
  toast,
  keyframes,
  Flex,
  Text,
  Stack,
  Icon,
  Box,
  Image,
} from '../../shared-components';
import { CheckboxField, InputField } from '../form-fields';
import { useBiometrics } from '../../hooks/use-biometrics';
import Fingerprint from './fingerprint.svg';

interface IFormData {
  biometrics?: boolean;
  email: string;
  password: string;
  confirmPassword: string;
}

const fadeInAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const RegisterMasterPasswordForm: React.FC = () => {
  const { saveMasterPassword } = useMasterPassword();
  const { isBiometricsAvailable } = useBiometrics();

  const onSubmit = async ({
    password,
    confirmPassword,
    email,
    biometrics,
  }: IFormData) => {
    if (password === confirmPassword) {
      await saveMasterPassword(email, password, biometrics);
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
              <InputField
                name='email'
                type='email'
                placeholder='Enter Your Email'
                label=''
                required
              />
              <InputField
                name='password'
                type='password'
                placeholder='Enter Master Password'
                label=''
                required
              />
              <InputField
                name='confirmPassword'
                type='password'
                placeholder='Repeat Master Password'
                label=''
                required
              />
              {isBiometricsAvailable && (
                <CheckboxField
                  label='Enable fingerprint based login'
                  name='biometrics'
                  css={{ mt: '$5' }}
                />
              )}
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
  const { isBiometricsAvailable } = useBiometrics();
  const { verifyMasterPassword, verifyBiometrics, email, isBiometricSaved } =
    useMasterPassword();

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
      <Stack
        css={{
          color: '$tonal400',
          border: '1px solid $tonal400',
          borderRadius: '$0',
          px: '$3',
          py: '$2',
        }}
      >
        <Icon is={User} />
        <Text css={{ color: '$tonal400' }}>{email}</Text>
      </Stack>
      <Form
        onSubmit={(data) => onSubmit(data)}
        render={() => {
          return (
            <>
              <InputField
                name='password'
                type='password'
                placeholder='Enter Master Password'
                label=''
                required
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
              {isBiometricsAvailable && isBiometricSaved && (
                <Box
                  css={{ size: '48px', mx: 'auto', mt: '$5' }}
                  onClick={verifyBiometrics}
                >
                  <Image src={Fingerprint} />
                </Box>
              )}
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
