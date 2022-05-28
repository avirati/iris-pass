import { render } from '@testing-library/react'

import { PasswordForm } from './PasswordForm'

describe('PasswordForm Component', () => {
  it('renders', () => {
    const { container } = render(<PasswordForm />)
    expect(container).toMatchSnapshot()
  })
})