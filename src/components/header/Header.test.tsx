import { render } from '@testing-library/react'

import { Header } from './Header'

describe('Header Component', () => {
  it('renders', () => {
    const { container } = render(<Header>Application Name</Header>)
    expect(container).toMatchSnapshot()
  })
})