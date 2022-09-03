import React, { useCallback, useEffect, useState } from 'react'
import { Copy, Ok, Eye, EyeClosed } from '@atom-learning/icons'
import { useHistory, useParams } from 'react-router-dom'

import { ContentContainer } from 'components/content-container'
import { ActionIcon, Icon, Button, Form, Flex, InputField, SliderField, CheckboxField, SelectField } from 'shared-components'
import { categories } from 'globalConstants'
import { generateRandomPassword } from 'randomizer'
import { copyToClipboard, waitForSeconds } from 'utils'
import { IPassword, usePasswords } from 'hooks/use-passwords'

type IFormData = Omit<IPassword, 'id'>

export const PasswordForm: React.FC = () => {
  const [fetchedPassword, setFetchedPassword] = useState<Optional<IPassword>>(null)

  const [generatedPassword, setGeneratedPassword] = useState<string>('')
  const [passwordCopied, setPasswordCopied] = useState<boolean>(false)

  const [passwordLength, setPasswordLength] = useState<number>(20)
  const [useLetters, setUseLetters] = useState<boolean>(true)
  const [useNumbers, setUseNumbers] = useState<boolean>(true)
  const [useUppercaseChars, setUseUppercaseChars] = useState<boolean>(false)
  const [useSymbols, setUseSymbols] = useState<boolean>(false)
  const [passwordRevealed, setPasswordRevealed] = useState<boolean>(false)

  const { addPassword, getPassword, updatePassword } = usePasswords()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const isAddMode = !id

  useEffect(() => {
    const password = generateRandomPassword({
      passwordLength,
      useLetters,
      useNumbers,
      useSymbols,
      useUppercaseChars
    })
    setGeneratedPassword(password)
  }, [
    passwordLength,
    useLetters,
    useNumbers,
    useUppercaseChars,
    useSymbols,

    setGeneratedPassword
  ])

  const copyPasswordToClipboard = useCallback(async () => {
    if (generatedPassword) {
      await copyToClipboard(generatedPassword)
      setPasswordCopied(true)
      await waitForSeconds(2)
      setPasswordCopied(false)
    }
  }, [generatedPassword, setPasswordCopied])

  const onSubmit = useCallback(async (formData: IFormData) => {
    if (isAddMode) {
      await addPassword(formData)
    } else {
      await updatePassword({
        ...formData,
        id
      })
    }
    history.push('/#/')
  }, [addPassword, history, id, isAddMode, updatePassword])

  const togglePasswordVisibility = useCallback(() => {
    setPasswordRevealed(!passwordRevealed)
  }, [passwordRevealed, setPasswordRevealed])

  useEffect(() => {
    if (!isAddMode && !fetchedPassword) {
      getPassword(id)
        .then((password) => {
          if (password) {
            setFetchedPassword(password)
          } else {
            history.push('/#/')
          }
        })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ContentContainer>
      <Form
        onSubmit={(data) => onSubmit(data)}
        css={{ display: 'flex', gap: '$4', flexDirection: 'column', flexGrow: 1 }}
        render={() => {
          return (
            <>
              <SelectField name='category' label='Select a Category' fieldId='categories' autoComplete='off'>
                <option value=''>Select</option>
                {
                  categories.map((value) => <option value={value} key={value} selected={value === fetchedPassword?.category}>{value}</option>)
                }
              </SelectField>
              <InputField
                label='Website'
                name='website'
                placeholder='Website (e.g. https://google.com)'
                autoComplete='off'
                defaultValue={fetchedPassword?.website}
              />
              <InputField
                label='Login'
                name='login'
                placeholder='Login (e.g. you@example.com)'
                autoComplete='off'
                defaultValue={fetchedPassword?.login}
              />
              <Flex css={{ alignItems: 'flex-end', gap: '$2' }}>
                {
                  isAddMode ? (
                    <InputField
                      label='Password'
                      name='password'
                      placeholder='Enter or Generate'
                      autoComplete='off'
                      defaultValue={generatedPassword}
                      css={{ flexGrow: 1 }}
                    />
                  ) : (
                    <InputField
                      label='Password'
                      name='password'
                      type={passwordRevealed ? 'text' : 'password'}
                      placeholder='Enter or Generate'
                      autoComplete='off'
                      defaultValue={passwordRevealed ? fetchedPassword?.password : 'NOTTHEPASSWORDYOUWANT'}
                      css={{ flexGrow: 1 }}
                    />
                  )
                }
                <ActionIcon label='copy-password' appearance='outline' size='lg' onClick={copyPasswordToClipboard}>
                  <Icon is={passwordCopied ? Ok : Copy} />
                </ActionIcon>
                {
                  !isAddMode && (
                    <ActionIcon label={passwordRevealed ? 'hide-password' : 'reveal-password'} appearance='outline' size='lg' onClick={togglePasswordVisibility}>
                      <Icon is={passwordRevealed ? Eye : EyeClosed} />
                    </ActionIcon>
                  )
                }
              </Flex>
              <SliderField
                label={`Password Length (${passwordLength})`}
                name='passwordLength'
                defaultValue={[passwordLength]}
                value={[passwordLength]}
                min={8}
                max={100}
                outputLabel={() => ''}
                onValueChange={([value]) => setPasswordLength(value)}
              />
              <CheckboxField
                label='Include Letters'
                name='useLetters'
                checked={useLetters}
                onCheckedChange={(checked) => setUseLetters(checked as boolean)}
              />
              <CheckboxField
                label='Include Numbers'
                name='useNumbers'
                checked={useNumbers}
                onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
              />
              <CheckboxField
                label='Include Uppercase Characters'
                name='useUppercaseChars'
                checked={useUppercaseChars}
                onCheckedChange={(checked) => setUseUppercaseChars(checked as boolean)}
              />
              <CheckboxField
                label='Include Symbols'
                name='useSymbols'
                checked={useSymbols}
                onCheckedChange={(checked) => setUseSymbols(checked as boolean)}
              />
              <Button type="submit">{isAddMode ? 'Add' : 'Update'}</Button>
            </>
          )
        }}
      />
    </ContentContainer>
  )
}