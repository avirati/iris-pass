import { ContentContainer } from 'components/content-container'
import React from 'react'

import { Button, Form, PasswordField, CSS } from 'shared-components'

const passwordFieldCSS: CSS = {
  'input, input:focus, input:active': {
    color: '$tonal400',
    borderColor: '$tonal400',
    bg: 'transparent',
  },
  'input:focus': {
    borderColor: '$tonal100',
    color: '$tonal100',
  }
}

export const MasterPasswordForm: React.FC = () => {
  return (
    <ContentContainer css={{ width: '100%', '@sm': { width: '300px' } }}>
      <Form onSubmit={(data) => console.log(data)}>
        <PasswordField
          name="password"
          placeholder="Enter Master Password"
          label=""
          css={passwordFieldCSS}
        />
        <PasswordField
          name="confirmPassword"
          placeholder="Repeat Master Password"
          label=""
          css={passwordFieldCSS}
        />
        <Button
          type="submit"
          css={{
            width: '100%',
            bg: 'transparent',
            border: '1px solid $tonal200',
            color: '$tonal200',
            mt: '$4'
          }}
          theme="neutral"
        >
          Submit
        </Button>
      </Form>
    </ContentContainer>
  )
}