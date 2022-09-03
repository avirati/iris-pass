import React from 'react'

import { ContentContainer } from 'components/content-container'
import { usePasswords } from 'hooks/use-passwords'
import { PasswordCard } from 'components/password-card'

import { EmptyPasswordScreen } from './EmptyPasswordScreen'

export const Dashboard: React.FC = () => {
  const { passwords } = usePasswords()

  return (
    <ContentContainer css={{ gap: '$4', height: 'calc(100vh - 128px)' }}>
      {
        passwords.length > 0
          ? passwords.map((password) => <PasswordCard password={password} key={password.id}/>)
          : <EmptyPasswordScreen />
      }
    </ContentContainer>
  )
}