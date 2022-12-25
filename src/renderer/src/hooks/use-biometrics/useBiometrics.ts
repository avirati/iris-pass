import React from 'react';
import { NativeBiometric } from 'capacitor-native-biometric';

const server = 'password-manager.avinashv.dev';

export const useBiometrics = () => {
  const [isBiometricsAvailable, setIsBiometricsAvailable] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    NativeBiometric.isAvailable().then(({ isAvailable }) =>
      setIsBiometricsAvailable(isAvailable)
    );
  }, []);

  const saveCredentials = async (email: string, password: string) =>
    NativeBiometric.setCredentials({
      username: email,
      password,
      server,
    });

  const deleteCredentials = () => NativeBiometric.deleteCredentials({ server });

  const verifyCredentials = async () => {
    try {
      await NativeBiometric.verifyIdentity({
        title: 'Password Manager',
        subtitle: 'Biometric Authentication',
      });

      return NativeBiometric.getCredentials({ server });
    } catch (error) {
      return null;
    }
  };

  const verifyIdentity = async () => {
    try {
      await NativeBiometric.verifyIdentity({
        title: 'Password Manager',
        subtitle: 'Biometric Authentication',
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    isBiometricsAvailable,

    saveCredentials,
    deleteCredentials,
    verifyCredentials,
    verifyIdentity,
  };
};
