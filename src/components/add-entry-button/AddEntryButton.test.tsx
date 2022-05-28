import { render } from '@testing-library/react'

import { AddEntryButton } from './AddEntryButton'

describe('AddEntryButton Component', () => {
  it('renders', () => {
    const { container } = render(<AddEntryButton />)
    expect(container).toMatchSnapshot()
  })
})