import React from 'react';
import { SHA256 } from 'crypto-js';
import { v4 as UUID } from 'uuid';

import { masterPasswordStore, deviceStore } from '../../storage';
import { CryptoUtil } from '../../utils/crypto';
import { toast } from '../../shared-components';

import { IUseMasterPasswordContext } from './useMasterPassword.types';
import { useBiometrics } from '../use-biometrics';

(async () => {
  const deviceIdStored = await deviceStore.hasItem('deviceId');
  if (!deviceIdStored) {
    await deviceStore.setItem('deviceId', UUID());
  }
})();

export const UseMasterPasswordContext =
  React.createContext<IUseMasterPasswordContext>({
    email: null,
    masterPassword: null,
    isMasterPasswordSaved: false,
    isUserAuthenticated: false,
    isBiometricSaved: false,
    saveMasterPassword: () => Promise.resolve(),
    verifyMasterPassword: () => Promise.resolve(false),
    lock: () => null,
    disableLock: () => null,
    enableLock: () => null,
    verifyBiometrics: () => Promise.resolve(false),
  });

export const UseMasterPasswordProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [refreshCounter, setRefreshCounter] = React.useState<number>(0);
  const [isMasterPasswordSaved, setIsMasterPasswordSaved] =
    React.useState<boolean>(false);
  const [masterPassword, setMasterPassword] = React.useState<string | null>(
    null
  );
  const [email, setEmail] = React.useState<string | null>(null);
  const [isBiometricSaved, setIsBiometricSaved] =
    React.useState<boolean>(false);
  const [canLock, setCanLock] = React.useState<boolean>(true);

  const { saveCredentials, verifyCredentials, verifyIdentity } =
    useBiometrics();

  React.useEffect(() => {
    masterPasswordStore.hasItem('validatorText').then((value) => {
      setIsMasterPasswordSaved(value);
    });
    masterPasswordStore.getItem('email').then((value) => {
      if (value) {
        setEmail(value as string);
      }
    });
    masterPasswordStore.getItem('biometrics').then((value) => {
      if (value) {
        setIsBiometricSaved(value as boolean);
      }
    });
  }, [refreshCounter]);

  const getHashedPassword = (email: string, password: string) =>
    SHA256(`${email}|${password}`).toString();

  const saveMasterPassword = React.useCallback(
    async (email: string, password: string, enableBiometrics?: boolean) => {
      const hashedPassword = getHashedPassword(email, password);

      if (enableBiometrics) {
        const isVerified = await verifyIdentity();
        if (isVerified) {
          await saveCredentials(email, hashedPassword);
          await masterPasswordStore.setItem('biometrics', true);
        } else {
          toast.error('Unable to verify identity. Biometrics not saved');
          return;
        }
      }

      const deviceId = (await deviceStore.getItem<string>(
        'deviceId'
      )) as string;
      const validatorText = CryptoUtil.encrypt(deviceId, hashedPassword);
      await masterPasswordStore.setItem('validatorText', validatorText);
      await masterPasswordStore.setItem('email', email);
      setRefreshCounter(refreshCounter + 1);
      setEmail(email);
      setMasterPassword(hashedPassword);
      toast.success('Master Password saved!');
    },
    [refreshCounter, saveCredentials, verifyIdentity]
  );

  const verify = React.useCallback(async (hashedPassword: string) => {
    const storedDeviceId = (await deviceStore.getItem<string>(
      'deviceId'
    )) as string;
    const storedValidatorText = await masterPasswordStore.getItem<string>(
      'validatorText'
    );
    try {
      const deviceId = CryptoUtil.decrypt(
        storedValidatorText as string,
        hashedPassword
      );
      const doesMatch = deviceId === storedDeviceId;
      if (doesMatch) {
        setMasterPassword(hashedPassword);
      }
      return doesMatch;
    } catch (error) {
      return false;
    }
  }, []);

  const verifyMasterPassword = React.useCallback(
    async (password: string): Promise<boolean> => {
      if (!email) {
        toast.error('Could not retrieve account');
        return false;
      }
      const hashedPassword = getHashedPassword(email, password);
      return verify(hashedPassword);
    },
    [email, verify]
  );

  const verifyBiometrics = React.useCallback(async () => {
    const credentials = await verifyCredentials();
    if (!credentials) {
      return false;
    }

    const { username, password } = credentials;
    if (username !== email) {
      return false;
    }

    return verify(password);
  }, [email, verify, verifyCredentials]);

  const lock = React.useCallback(() => {
    canLock && setMasterPassword(null);
  }, [canLock]);

  const disableLock = () => setCanLock(false);
  const enableLock = () => setCanLock(true);

  return (
    <UseMasterPasswordContext.Provider
      value={{
        email,
        masterPassword,
        isUserAuthenticated: Boolean(masterPassword),
        isMasterPasswordSaved,
        isBiometricSaved,
        saveMasterPassword,
        verifyMasterPassword,
        verifyBiometrics,
        lock,
        enableLock,
        disableLock,
      }}
    >
      {children}
    </UseMasterPasswordContext.Provider>
  );
};
