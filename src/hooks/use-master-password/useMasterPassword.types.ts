export interface IUseMasterPasswordContext {
  masterPassword: string | null
  isMasterPasswordSaved: boolean
  saveMasterPassword: (password: string) => Promise<void>
  verifyMasterPassword: (password: string) => Promise<boolean>
}