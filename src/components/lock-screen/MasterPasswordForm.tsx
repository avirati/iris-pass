import React from 'react'

import { ContentContainer } from 'components/content-container'
import { useMasterPassword } from 'hooks/use-master-password'
import { Button, Form, PasswordField, CSS, ValidationError, toast } from 'shared-components'

interface IFormData {
  password: string
  confirmPassword: string
}

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
  const { setMasterPassword } = useMasterPassword()

  const onSubmit = ({ password, confirmPassword }: IFormData) => {
    if (password === confirmPassword) {
      setMasterPassword(password)
    } else {
      toast.error('Passwords do not match')
    }
  }

  return (
    <ContentContainer css={{ width: '100%', '@sm': { width: '300px' } }}>
      <Form onSubmit={(data) => onSubmit(data)} render={() => {
        return (
          <>
            <PasswordField
              name="password"
              placeholder="Enter Master Password"
              label=""
              required
              css={passwordFieldCSS}
            />
            <PasswordField
              name="confirmPassword"
              placeholder="Repeat Master Password"
              label=""
              required
              css={passwordFieldCSS}
            />
            <Button
              type="submit"
              css={{
                width: '100%',
                mt: '$4',
                '&, &:hover, &:active, &:focus': {
                  bg: 'transparent !important',
                  border: '1px solid $tonal200 !important',
                  color: '$tonal200 !important',
                }
              }}
              theme="neutral"
            >
              Submit
            </Button>
          </>
        )
      }}/>
    </ContentContainer>
  )
}