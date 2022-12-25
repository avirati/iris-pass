export interface IUseMasterPasswordContext {
  email: string | null;
  masterPassword: string | null;
  isMasterPasswordSaved: boolean;
  isUserAuthenticated: boolean;
  saveMasterPassword: (email: string, password: string) => Promise<void>;
  verifyMasterPassword: (password: string) => Promise<boolean>;
  lock: () => void;
  enableLock: () => void;
  disableLock: () => void;
}
