export interface IUsePasswordSyncContext {
  qrCode: string;
  isSyncing: boolean;
  startSync: () => void;
  stopSync: () => void;
}
