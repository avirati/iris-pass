import { Category } from 'globalConstants'

export interface IPassword {
  id: string
  category: Category
  login: string
  password: string
  website: string
}

export interface IUsePasswordContext {
  passwords: IPassword[]
  getPassword: (id: IPassword['id']) => Promise<IPassword | null>
  addPassword: (password: Omit<IPassword, 'id'>) => Promise<void>
  removePassword: (id: IPassword['id']) => Promise<void>
  updatePassword: (password: IPassword) => Promise<void>
}