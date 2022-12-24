import React, { createContext, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { toast } from '../../shared-components';
import { passwordStore } from '../../storage';
import { CryptoUtil } from '../../utils/crypto';
import { useMasterPassword } from '../../hooks/use-master-password';
import { copyToClipboard } from '../../utils';
import { LockScreen } from '../../components/lock-screen';
import { IPassword, IUsePasswordContext } from './usePasswords.types';

export const UsePasswordContext = createContext<IUsePasswordContext>({
  passwords: [],
  getPassword: () => Promise.resolve(null),
  copyPassword: () => Promise.resolve(),
  addPassword: () => Promise.resolve(),
  removePassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  getPasswordEntry: () => Promise.resolve(null),
  refresh: () => null,
});

export const UsePasswordProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const { masterPassword, isUserAuthenticated } = useMasterPassword();

  const refresh = React.useCallback(
    () => setRefreshCounter(refreshCounter + 1),
    [refreshCounter]
  );

  const addPassword: IUsePasswordContext['addPassword'] = useCallback(
    async ({ category, login, password, website }) => {
      const id = uuid();
      try {
        const encryptedPassword = CryptoUtil.encrypt(
          password,
          masterPassword as string
        );
        await passwordStore.setItem(id, {
          id,
          category,
          login,
          password: encryptedPassword,
          website,
          createdAt: Date.now(),
        });

        toast.success('Password saved!');
        refresh();
      } catch (error) {
        console.error(error);
        toast.error('Unable to save password');
      }
    },
    [masterPassword, refresh]
  );

  const removePassword: IUsePasswordContext['removePassword'] = useCallback(
    async (id) => {
      try {
        await passwordStore.removeItem(id);
        toast.success('Password removed!');
        refresh();
      } catch (error) {
        console.error(error);
        toast.error('Unable to remove password');
      }
    },
    [refresh]
  );

  const updatePassword: IUsePasswordContext['updatePassword'] = useCallback(
    async ({ category, id, login, password, website }) => {
      try {
        const encryptedPassword = CryptoUtil.encrypt(
          password,
          masterPassword as string
        );
        await passwordStore.setItem(id, {
          id,
          category,
          login,
          password: encryptedPassword,
          website,
          updatedAt: Date.now(),
        });
        toast.success('Password updated!');
        refresh();
      } catch (error) {
        console.error(error);
        toast.error('Unable to update password');
      }
    },
    [masterPassword, refresh]
  );

  const getPasswordEntry: IUsePasswordContext['getPasswordEntry'] = useCallback(
    async (id) => {
      try {
        const password = await passwordStore.getItem<IPassword>(id);
        return password;
      } catch (error) {
        console.error(error);
        toast.error('Unable to fetch password data');
        return null;
      }
    },
    []
  );

  const getPassword: IUsePasswordContext['getPassword'] = useCallback(
    async (id) => {
      try {
        const password = await passwordStore.getItem<IPassword>(id);
        if (password && masterPassword) {
          return CryptoUtil.decrypt(password.password, masterPassword);
        } else {
          throw new Error('Fetched password is falsy');
        }
      } catch (error) {
        console.error(error);
        toast.error('Unable to fetch password data');
        return null;
      }
    },
    [masterPassword]
  );

  const copyPassword: IUsePasswordContext['copyPassword'] = useCallback(
    async (id) => {
      try {
        const password = await passwordStore.getItem<IPassword>(id);
        if (password && masterPassword) {
          const decryptedPassword = CryptoUtil.decrypt(
            password.password,
            masterPassword
          );
          await copyToClipboard(decryptedPassword);
          toast.success('Copied to clipboard');
        } else {
          throw new Error('Fetched password is falsy');
        }
      } catch (error) {
        console.error(error);
        toast.error('Unable to fetch password data');
      }
    },
    [masterPassword]
  );

  useEffect(() => {
    passwordStore.getItemsArray<IPassword>().then(setPasswords);
  }, [refreshCounter]);

  return (
    <UsePasswordContext.Provider
      value={{
        passwords,
        getPassword,
        copyPassword,
        addPassword,
        removePassword,
        updatePassword,
        getPasswordEntry,
        refresh,
      }}
    >
      {isUserAuthenticated
        ? children
        : React.Children.map(
            children as React.ReactElement,
            (child: React.ReactElement) =>
              child.type === LockScreen ? child : null
          )}
    </UsePasswordContext.Provider>
  );
};
