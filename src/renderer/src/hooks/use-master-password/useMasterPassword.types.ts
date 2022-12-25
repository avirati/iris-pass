export interface IUseMasterPasswordContext {
  email: string | null;
  masterPassword: string | null;
  isMasterPasswordSaved: boolean;
  isUserAuthenticated: boolean;
  isBiometricSaved: boolean;
  saveMasterPassword: (
    email: string,
    password: string,
    enableBiometrics?: boolean
  ) => Promise<void>;
  verifyMasterPassword: (password: string) => Promise<boolean>;
  verifyBiometrics: () => Promise<boolean>;
  lock: () => void;
  enableLock: () => void;
  disableLock: () => void;
}
