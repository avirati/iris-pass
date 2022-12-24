import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDevice } from '../use-device';
import { IUsePasswordSyncContext } from './usePasswordSync.types';
import { QRCodeUtils } from '../../utils/qrcode';
import { CryptoUtil } from '../../utils/crypto';
import { useMasterPassword } from '../use-master-password';
import { toast } from '../../shared-components';
import { validateIP } from '../../utils';
import { UsePasswordSyncRepository } from './usePasswordSync.repository';

export const UsePasswordSyncContext =
  React.createContext<IUsePasswordSyncContext>({
    qrCode: '',
    isSyncing: false,
    startSync: () => null,
    stopSync: () => null,
  });

export const UsePasswordSyncProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [ip, setIP] = React.useState<string>('');
  const [qrCode, setQRCode] = React.useState<string>('');
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false);
  const { isAndroid, isElectron } = useDevice();
  const { masterPassword } = useMasterPassword();
  const history = useHistory();

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
      window.api.onSyncHandshake(({ input, output }) => {
        const successfulHandshake =
          CryptoUtil.decrypt(output, masterPassword!) === input;

        if (successfulHandshake) {
          toast.success('Handshake successful');
        } else {
          toast.success('Handshake unsuccessful');
        }

        window.api.syncHandshakeResult(successfulHandshake);
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
              }
            );
            if (data.success) {
              toast.success('Handshake successful');
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
  }, [ip, masterPassword, isAndroid]);

  const stopSync = React.useCallback(async () => {
    if (isElectron) {
      window.api.stopSyncServer();
    } else {
    }

    history.replace('/');
  }, []);

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
