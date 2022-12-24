import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDevice } from '../use-device';
import { IUsePasswordSyncContext } from './usePasswordSync.types';
import { QRCodeUtils } from '../../utils/qrcode';
import { CryptoUtil } from '../../utils/crypto';
import { useMasterPassword } from '../use-master-password';
import { toast } from '../../shared-components';
import { toDictionary, validateIP } from '../../utils';
import { UsePasswordSyncRepository } from './usePasswordSync.repository';
import { IPassword, usePasswords } from '../use-passwords';
import { passwordStore } from '../../storage';

export const UsePasswordSyncContext =
  React.createContext<IUsePasswordSyncContext>({
    qrCode: '',
    isSyncing: false,
    startSync: () => null,
    stopSync: () => null,
  });

const mergePasswords = (
  arrayOne: IPassword[],
  arrayTwo: IPassword[]
): Record<string, IPassword> => {
  const dictionaryOne = toDictionary<IPassword>(arrayOne, 'id');
  const dictionaryTwo = toDictionary<IPassword>(arrayTwo, 'id');
  const mergedDictionary: Record<string, IPassword> = {};

  for (const key in dictionaryOne) {
    if (dictionaryTwo[key]) {
      if (
        (dictionaryOne[key].updatedAt || 0) >
        (dictionaryTwo[key].updatedAt || 0)
      ) {
        mergedDictionary[key] = {
          ...dictionaryTwo[key],
          ...dictionaryOne[key],
        };
      } else {
        mergedDictionary[key] = {
          ...dictionaryOne[key],
          ...dictionaryTwo[key],
        };
      }
    } else {
      mergedDictionary[key] = dictionaryOne[key];
    }
  }

  for (const key in dictionaryTwo) {
    if (dictionaryOne[key]) {
      if (
        (dictionaryTwo[key].updatedAt || 0) >
        (dictionaryOne[key].updatedAt || 0)
      ) {
        mergedDictionary[key] = {
          ...dictionaryOne[key],
          ...dictionaryTwo[key],
        };
      } else {
        mergedDictionary[key] = {
          ...dictionaryTwo[key],
          ...dictionaryOne[key],
        };
      }
    } else {
      mergedDictionary[key] = dictionaryTwo[key];
    }
  }

  return mergedDictionary;
};

export const UsePasswordSyncProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [ip, setIP] = React.useState<string>('');
  const [qrCode, setQRCode] = React.useState<string>('');
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false);
  const { isAndroid, isElectron } = useDevice();
  const { masterPassword } = useMasterPassword();
  const history = useHistory();
  const { passwords, refresh } = usePasswords();

  React.useEffect(() => {
    if (isElectron) {
      window.api.onGetLocalIPSuccess(setIP);
      window.api.getLocalIP();
    }
  }, [isElectron]);

  const startSync = React.useCallback(async () => {
    if (isElectron) {
      const encryptedEndpoint = CryptoUtil.encrypt(ip, masterPassword!);
      const data = await QRCodeUtils.generate(encryptedEndpoint);
      setQRCode(data);
      history.push('/qrcode/viewer');

      window.api.startSyncServer();
      window.api.onSyncHandshake(({ input, output, ...rest }) => {
        const successfulHandshake =
          CryptoUtil.decrypt(output, masterPassword!) === input;

        let mergedPasswords: Record<string, IPassword> = {};
        if (successfulHandshake) {
          toast.success('Handshake successful');

          mergedPasswords = mergePasswords(
            rest.passwords as IPassword[],
            passwords
          );
          passwordStore.setItems(mergedPasswords).then(() => {
            toast.success('Device passwords synced');
            refresh();
          });
        } else {
          toast.success('Handshake unsuccessful');
        }
        window.api.syncHandshakeResult(successfulHandshake, mergedPasswords);
        window.api.stopSyncServer();
        history.replace('/');
      });
    } else if (isAndroid) {
      history.push('/qrcode/scanner');
      try {
        const data = await QRCodeUtils.scan();
        if (data) {
          const decryptedEndpoint = CryptoUtil.decrypt(data, masterPassword!);
          const isValidEndpoint = validateIP(decryptedEndpoint);
          if (isValidEndpoint) {
            const input = String(Date.now());
            const data = await UsePasswordSyncRepository.sync(
              decryptedEndpoint,
              {
                input,
                output: CryptoUtil.encrypt(input, masterPassword!),
                passwords,
              }
            );
            if (data.success) {
              toast.success('Handshake successful');
              passwordStore.setItems(data.passwords).then(() => {
                toast.success('Device passwords synced');
                refresh();
              });
            } else {
              toast.error('Handshake unsuccessful');
            }
            history.replace('/');
          } else {
            toast.error(
              'Unable to sync. Your identity did not match with the other device'
            );
          }
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  }, [history, ip, isAndroid, isElectron, masterPassword, passwords, refresh]);

  const stopSync = React.useCallback(async () => {
    if (isElectron) {
      window.api.stopSyncServer();
    }
    history.replace('/');
  }, [history, isElectron]);

  return (
    <UsePasswordSyncContext.Provider
      value={{
        qrCode,
        isSyncing,
        startSync,
        stopSync,
      }}
    >
      {children}
    </UsePasswordSyncContext.Provider>
  );
};
