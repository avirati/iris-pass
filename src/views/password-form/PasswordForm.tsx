import React, { useCallback, useEffect, useState } from 'react'
import { Copy, Ok } from '@atom-learning/icons'
import { v4 as uuid } from 'uuid'

import { ContentContainer } from 'components/content-container'
import { ActionIcon, Icon, Button, Form, Flex, InputField, SliderField, CheckboxField, SelectField, toast } from 'shared-components'
import { categories, Category } from 'globalConstants'
import { generateRandomPassword } from 'randomizer'
import { copyToClipboard, waitForSeconds } from 'utils'
import * as Storage from 'storage'

interface IFormData {
  category: Category
  website: string
  login: string
  password: string
}

const onSubmit = async ({ category, login, password, website }: IFormData) => {
  const id = uuid()
  try {
    await Storage.setItem(id, {
      id,
      category,
      login,
      password,
      website
    })

    toast.success('Password saved !')
  } catch (error) {
    console.error(error)
    toast.error('Unable to save password')
  }
}

export const PasswordForm: React.FC = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>()
  const [passwordCopied, setPasswordCopied] = useState<boolean>(false)

  const [passwordLength, setPasswordLength] = useState<number>(20)
  const [useLetters, setUseLetters] = useState<boolean>(true)
  const [useNumbers, setUseNumbers] = useState<boolean>(true)
  const [useUppercaseChars, setUseUppercaseChars] = useState<boolean>(false)
  const [useSymbols, setUseSymbols] = useState<boolean>(false)

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
                  categories.map((value) => <option value={value} key={value}>{value}</option>)
                }
              </SelectField>
              <InputField
                label='Website'
                name='website'
                placeholder='Website (e.g. https://google.com)'
                autoComplete='off'
              />
              <InputField
                label='Login'
                name='login'
                placeholder='Login (e.g. you@example.com)'
                autoComplete='off'
              />
              <Flex css={{ alignItems: 'flex-end', gap: '$2' }}>
                <InputField
                  label='Password'
                  name='password'
                  placeholder='Enter or Generate'
                  autoComplete='off'
                  value={generatedPassword}
                  css={{ flexGrow: 1 }}
                />
                <ActionIcon label='copy-password' appearance='outline' size='lg' onClick={copyPasswordToClipboard}>
                  <Icon is={passwordCopied ? Ok : Copy}/>
                </ActionIcon>
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
              <Button type="submit">Submit</Button>
            </>
          )
        }}
      />
    </ContentContainer>
  )
}