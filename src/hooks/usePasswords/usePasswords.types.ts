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
  addPassword: (password: IPassword) => Promise<void>
  removePassword: (id: IPassword['id']) => Promise<void>
  updatePassword: (password: IPassword) => Promise<void>
}