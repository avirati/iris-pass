import { render } from '@testing-library/react'

import { Category } from 'globalConstants'
import { IPassword } from 'hooks/usePasswords'

import { PasswordCard } from './PasswordCard'

const password: IPassword = {
  id: 'test-id',
  category: Category.BUSINESS,
  login: 'test-login',
  password: 'test-password',
  website: 'https://www.google.com'
}

describe('PasswordCard Component', () => {
  it('renders', () => {
    const { container } = render(<PasswordCard password={password}/>)
    expect(container).toMatchSnapshot()
  })
})