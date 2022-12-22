import React, { createContext, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { toast } from 'shared-components';
import { Storage } from 'storage';

import { IPassword, IUsePasswordContext } from './usePasswords.types';
import { CryptoUtil } from 'utils/crypto';
import { useMasterPassword } from 'hooks/use-master-password';
import { copyToClipboard } from 'utils';
import { LockScreen } from 'components/lock-screen';

export const UsePasswordContext = createContext<IUsePasswordContext>({
  passwords: [],
  getPassword: () => Promise.resolve(null),
  copyPassword: () => Promise.resolve(),
  addPassword: () => Promise.resolve(),
  removePassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  getPasswordEntry: () => Promise.resolve(null),
});

const store = new Storage('password-manager');

export const UsePasswordProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const { masterPassword, isUserAuthenticated } = useMasterPassword();

  const addPassword: IUsePasswordContext['addPassword'] = useCallback(
    async ({ category, login, password, website }) => {
      const id = uuid();
      try {
        const encryptedPassword = CryptoUtil.encrypt(
          password,
          masterPassword as string
        );
        await store.setItem(id, {
          id,
          category,
          login,
          password: encryptedPassword,
          website,
        });

        toast.success('Password saved!');
        setRefreshCounter(refreshCounter + 1);
      } catch (error) {
        console.error(error);
        toast.error('Unable to save password');
      }
    },
    [masterPassword, refreshCounter]
  );

  const removePassword: IUsePasswordContext['removePassword'] = useCallback(
    async (id) => {
      try {
        await store.removeItem(id);
        toast.success('Password removed!');
        setRefreshCounter(refreshCounter + 1);
      } catch (error) {
        console.error(error);
        toast.error('Unable to remove password');
      }
    },
    [refreshCounter, setRefreshCounter]
  );

  const updatePassword: IUsePasswordContext['updatePassword'] = useCallback(
    async ({ category, id, login, password, website }) => {
      try {
        const encryptedPassword = CryptoUtil.encrypt(
          password,
          masterPassword as string
        );
        await store.setItem(id, {
          id,
          category,
          login,
          password: encryptedPassword,
          website,
        });
        toast.success('Password updated!');
        setRefreshCounter(refreshCounter + 1);
      } catch (error) {
        console.error(error);
        toast.error('Unable to update password');
      }
    },
    [refreshCounter, masterPassword, setRefreshCounter]
  );

  const getPasswordEntry: IUsePasswordContext['getPasswordEntry'] = useCallback(
    async (id) => {
      try {
        const password = await store.getItem<IPassword>(id);
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
        const password = await store.getItem<IPassword>(id);
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
        const password = await store.getItem<IPassword>(id);
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
    store.getItemsArray<IPassword>().then(setPasswords);
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
