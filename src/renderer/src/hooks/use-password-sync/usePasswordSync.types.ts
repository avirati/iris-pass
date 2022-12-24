export interface IUsePasswordSyncContext {
  isSyncing: boolean;
  isQRCodeActive: boolean;
  syncPasswords: () => void;
  clearQRCode: () => void;
}
