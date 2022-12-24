import React from 'react';

import { useDevice } from '../use-device';
import { IUsePasswordSyncContext } from './usePasswordSync.types';
import { QRCodeUtils } from '../../utils/qrcode';
import { QRCodeDisplay } from './QRCodeDisplay';
import { CryptoUtil } from '../../utils/crypto';
import { useMasterPassword } from '../use-master-password';

export const UsePasswordSyncContext =
  React.createContext<IUsePasswordSyncContext>({
    isSyncing: false,
    isQRCodeActive: false,
    syncPasswords: () => null,
    clearQRCode: () => null,
  });

export const UsePasswordSyncProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [ip, setIP] = React.useState<string>('');
  const [qrCode, setQRCode] = React.useState<string>();
  const [isSyncing, setIsSyncing] = React.useState<boolean>(false);
  const [isQRCodeActive, setIsQRCodeActive] = React.useState<boolean>(false);
  const { isMobile } = useDevice();
  const { masterPassword } = useMasterPassword();

  React.useEffect(() => {
    window.api.onGetLocalIPSuccess(setIP);
    window.api.getLocalIP();
  }, []);

  const syncPasswords = React.useCallback(async () => {
    if (isMobile) {
      const data = await QRCodeUtils.scan();
      console.log(data);
    } else {
      setIsQRCodeActive(true);
      const encryptedEndpoint = CryptoUtil.encrypt(ip, masterPassword!);
      const data = await QRCodeUtils.generate(encryptedEndpoint);
      setQRCode(data);
    }
  }, [ip, masterPassword]);

  const clearQRCode = () => {
    setQRCode('');
    setIsQRCodeActive(false);
  };

  return (
    <UsePasswordSyncContext.Provider
      value={{
        isSyncing,
        isQRCodeActive,
        syncPasswords,
        clearQRCode,
      }}
    >
      {!isMobile && qrCode && <QRCodeDisplay image={qrCode} />}
      {children}
    </UsePasswordSyncContext.Provider>
  );
};
