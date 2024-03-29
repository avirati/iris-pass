import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      getLocalIP: () => void;
      onGetLocalIPSuccess: (callback: (ip: string) => void) => void;
      startSyncServer: () => void;
      stopSyncServer: () => void;
      onSyncHandshake: (
        callback: (handshake: {
          input: string;
          output: string;
          passwords: any[];
        }) => void
      ) => void;
      syncHandshakeResult: (
        success: boolean,
        passwords: Record<string, any>
      ) => void;
    };
  }
}
