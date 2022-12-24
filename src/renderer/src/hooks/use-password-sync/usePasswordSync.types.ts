export interface IUsePasswordSyncContext {
  qrCode: string;
  isSyncing: boolean;
  syncPasswords: () => void;
}
