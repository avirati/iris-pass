import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDevice } from '../use-device';
import { IUsePasswordSyncContext } from './usePasswordSync.types';
import { QRCodeUtils } from '../../utils/qrcode';
import { CryptoUtil } from '../../utils/crypto';
import { useMasterPassword } from '../use-master-password';
import { toast } from '@atom-learning/components';

export const UsePasswordSyncContext =
  React.createContext<IUsePasswordSyncContext>({
    qrCode: '',
    isSyncing: false,
    syncPasswords: () => null,
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

  const syncPasswords = React.useCallback(async () => {
    if (isElectron) {
      const encryptedEndpoint = CryptoUtil.encrypt(ip, masterPassword!);
      const data = await QRCodeUtils.generate(encryptedEndpoint);
      setQRCode(data);
      history.push('/qrcode/viewer');
    } else if (isAndroid) {
      history.push('/qrcode/scanner');
      try {
        const data = await QRCodeUtils.scan();
        if (data) {
          const decryptedEndpoint = CryptoUtil.decrypt(data, masterPassword!);
          console.log(decryptedEndpoint);
          history.replace('/');
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  }, [ip, masterPassword, isAndroid]);

  return (
    <UsePasswordSyncContext.Provider
      value={{
        qrCode,
        isSyncing,
        syncPasswords,
      }}
    >
      {children}
    </UsePasswordSyncContext.Provider>
  );
};
