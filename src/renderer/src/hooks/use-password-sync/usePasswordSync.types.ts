export interface IUsePasswordSyncContext {
  qrCode: string;
  isSyncing: boolean;
  startElectronSync: () => void;
  startMobileSync: () => void;
  stopSync: () => void;
}
