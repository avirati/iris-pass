import React, { useEffect, useState } from 'react'
import { Lock } from '@atom-learning/icons'

import { Flex, Icon, keyframes, Heading } from 'shared-components'
import { useMasterPassword } from 'hooks/use-master-password'

import { MasterPasswordForm } from './MasterPasswordForm'

const unlockAnimation = (direction: -1 | 1) => keyframes({
  '0%': { transform: 'translateY(0)' },
  '80%': { transform: `translateY(${30 * direction}%)` },
  '100%': { transform: `translateY(${120 * direction}%)` }
})

const rotateAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

export const LockScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [shouldUnlock, setShouldUnlock] = useState<boolean>(false)
  const { masterPassword } = useMasterPassword()

  useEffect(() => {
    setShouldUnlock(Boolean(masterPassword))
    setTimeout(() => {
      setIsVisible(false)
    }, 2000)
  }, [masterPassword])

  if (!isVisible) {
    return null
  }

  return (
    <Flex css={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      flexDirection: 'column'
    }}>
      <Flex css={{
        bg: '$tonal600',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        animation: shouldUnlock ? `${unlockAnimation(-1)} 1s` : 'none',
        animationFillMode: 'forwards',
        animationDelay: '1s'
      }}>
        <Heading css={{
          color: '$tonal100',
          textTransform: 'uppercase'
        }}>
          Password Manager
        </Heading>
      </Flex>
      <Flex css={{
        bg: '$tonal600',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        animation: shouldUnlock ? `${unlockAnimation(1)} 1s` : 'none',
        animationFillMode: 'forwards',
        animationDelay: '1s',
        borderTop: '1px solid $tonal100'
      }}>
        <Icon
          is={Lock}
          size='lg'
          css={{
            border: '1px solid $tonal100',
            borderRadius: '$round',
            color: '$tonal100',
            top: '-49px',
            position: 'absolute',
            bg: '$tonal600',
            outline: 'none',
            p: '$5',
            animation: shouldUnlock ? `${rotateAnimation} 1s` : 'none',
            '&:hover, &:active, &:focus': {
              color: '$tonal100 !important',
              bg: '$tonal600 !important',
            }
          }}
        />
        <MasterPasswordForm />
      </Flex>
    </Flex>
  )
}