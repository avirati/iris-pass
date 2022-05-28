import { render } from '@testing-library/react'

import { ContentContainer } from './ContentContainer'

describe('ContentContainer Component', () => {
  it('renders', () => {
    const { container } = render(<ContentContainer>Content</ContentContainer>)
    expect(container).toMatchSnapshot()
  })

})