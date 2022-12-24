import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      getLocalIP: () => void;
      onGetLocalIPSuccess: (callback: (ip: string) => void) => void;
    };
  }
}
