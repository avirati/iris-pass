export interface IUseMasterPasswordContext {
  masterPassword: string | null;
  isMasterPasswordSaved: boolean;
  isUserAuthenticated: boolean;
  saveMasterPassword: (password: string) => Promise<void>;
  verifyMasterPassword: (password: string) => Promise<boolean>;
  lock: () => void;
}
