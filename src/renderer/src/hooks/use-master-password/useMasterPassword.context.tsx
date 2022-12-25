import React, { useCallback, useEffect, useState, createContext } from 'react';
import { SHA256 } from 'crypto-js';
import { v4 as UUID } from 'uuid';

import { masterPasswordStore, deviceStore } from '../../storage';
import { CryptoUtil } from '../../utils/crypto';

import { IUseMasterPasswordContext } from './useMasterPassword.types';

(async () => {
  const deviceIdStored = await deviceStore.hasItem('deviceId');
  if (!deviceIdStored) {
    await deviceStore.setItem('deviceId', UUID());
  }
})();

export const UseMasterPasswordContext =
  createContext<IUseMasterPasswordContext>({
    masterPassword: null,
    isMasterPasswordSaved: false,
    isUserAuthenticated: false,
    saveMasterPassword: () => Promise.resolve(),
    verifyMasterPassword: () => Promise.resolve(false),
    lock: () => null,
  });

export const UseMasterPasswordProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const [isMasterPasswordSaved, setIsMasterPasswordSaved] =
    useState<boolean>(false);
  const [masterPassword, setMasterPassword] = useState<string | null>(null);

  useEffect(() => {
    masterPasswordStore.hasItem('validatorText').then((value) => {
      setIsMasterPasswordSaved(value);
    });
  }, [refreshCounter]);

  const saveMasterPassword = useCallback(
    async (password: string) => {
      const hashedPassword = SHA256(password).toString();
      const deviceId = (await deviceStore.getItem<string>(
        'deviceId'
      )) as string;
      const validatorText = CryptoUtil.encrypt(deviceId, hashedPassword);
      await masterPasswordStore.setItem('validatorText', validatorText);
      setRefreshCounter(refreshCounter + 1);
      setMasterPassword(hashedPassword);
    },
    [refreshCounter]
  );

  const verifyMasterPassword = async (password: string): Promise<boolean> => {
    const hashedPassword = SHA256(password).toString();
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
  };

  const lock = () => setMasterPassword(null);

  return (
    <UseMasterPasswordContext.Provider
      value={{
        masterPassword,
        isUserAuthenticated: Boolean(masterPassword),
        isMasterPasswordSaved,
        saveMasterPassword,
        verifyMasterPassword,
        lock,
      }}
    >
      {children}
    </UseMasterPasswordContext.Provider>
  );
};
