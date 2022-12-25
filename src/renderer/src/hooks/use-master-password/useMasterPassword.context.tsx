import React from 'react';
import { SHA256 } from 'crypto-js';
import { v4 as UUID } from 'uuid';

import { masterPasswordStore, deviceStore } from '../../storage';
import { CryptoUtil } from '../../utils/crypto';
import { toast } from '../../shared-components';

import { IUseMasterPasswordContext } from './useMasterPassword.types';

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
    saveMasterPassword: () => Promise.resolve(),
    verifyMasterPassword: () => Promise.resolve(false),
    lock: () => null,
    disableLock: () => null,
    enableLock: () => null,
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
  const [canLock, setCanLock] = React.useState<boolean>(true);

  React.useEffect(() => {
    masterPasswordStore.hasItem('validatorText').then((value) => {
      setIsMasterPasswordSaved(value);
    });
    masterPasswordStore.getItem('email').then((value) => {
      if (value) {
        setEmail(value as string);
      }
    });
  }, [refreshCounter]);

  const getHashedPassword = (email: string, password: string) =>
    SHA256(`${email}|${password}`).toString();

  const saveMasterPassword = React.useCallback(
    async (email: string, password: string) => {
      const hashedPassword = getHashedPassword(email, password);
      const deviceId = (await deviceStore.getItem<string>(
        'deviceId'
      )) as string;
      const validatorText = CryptoUtil.encrypt(deviceId, hashedPassword);
      await masterPasswordStore.setItem('validatorText', validatorText);
      await masterPasswordStore.setItem('email', email);
      setRefreshCounter(refreshCounter + 1);
      setEmail(email);
      setMasterPassword(hashedPassword);
    },
    [refreshCounter]
  );

  const verifyMasterPassword = React.useCallback(
    async (password: string): Promise<boolean> => {
      if (!email) {
        toast.error('Could not retrieve account');
        return false;
      }
      const hashedPassword = getHashedPassword(email, password);
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
    },
    [email]
  );

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
        saveMasterPassword,
        verifyMasterPassword,
        lock,
        enableLock,
        disableLock,
      }}
    >
      {children}
    </UseMasterPasswordContext.Provider>
  );
};
