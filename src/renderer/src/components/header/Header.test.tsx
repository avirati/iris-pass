import { render } from '@testing-library/react'

import { Header } from './Header'

describe('Header Component', () => {
  it('renders', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })
})