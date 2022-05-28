import React from 'react'

import { ContentContainer } from 'components/content-container'
import { Button, Form, InputField } from 'shared-components'

const onSubmit = (value: any) => {
  console.log(value)
}

export const PasswordForm: React.FC = () => {
  return (
    <ContentContainer>
      <Form onSubmit={onSubmit} css={{ display: 'flex', gap: '$4', flexDirection: 'column' }}>
        <InputField label='Website' name='website' placeholder='Website (e.g. https://google.com)'/>
        <InputField label='Login' name='login' placeholder='Login (e.g. you@example.com)'/>
        <Button type="submit">Submit</Button>
      </Form>
    </ContentContainer>
  )
}