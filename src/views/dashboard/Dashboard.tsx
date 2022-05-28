import React from 'react'

import { ContentContainer } from 'components/content-container'
import { usePasswords } from 'hooks/usePasswords'
import { PasswordCard } from 'components/password-card'

export const Dashboard: React.FC = () => {
  const { passwords } = usePasswords()

  return (
    <ContentContainer css={{ gap: '$4' }}>
      {
        passwords.map((password) => <PasswordCard password={password} key={password.id}/>)
      }
    </ContentContainer>
  )
}