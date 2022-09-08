import React, { useCallback, useEffect, useState } from 'react'
import { Copy, Ok, Eye, EyeClosed } from '@atom-learning/icons'
import { useHistory, useParams } from 'react-router-dom'

import { ContentContainer } from 'components/content-container'
import {
  ActionIcon,
  Icon,
  Button,
  Form,
  Flex,
  InputField,
  SliderField,
  CheckboxField,
  SelectField,
  useAlert,
  toast
} from 'shared-components'
import { categories } from 'globalConstants'
import { generateRandomPassword } from 'randomizer'
import { copyToClipboard, waitForSeconds } from 'utils'
import { IPassword, usePasswords } from 'hooks/use-passwords'

import { DUMMY_PASS } from './constants'

type IFormData = Omit<IPassword, 'id'>

export const PasswordForm: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [fetchedPassword, setFetchedPassword] = useState<Optional<IPassword>>(null)
  const [revealedPassword, setRevealedPassword] = useState<string>(DUMMY_PASS)

  const [generatedPassword, setGeneratedPassword] = useState<string>('')
  const [passwordCopied, setPasswordCopied] = useState<boolean>(false)

  const [passwordLength, setPasswordLength] = useState<number>(20)
  const [useLetters, setUseLetters] = useState<boolean>(true)
  const [useNumbers, setUseNumbers] = useState<boolean>(true)
  const [useUppercaseChars, setUseUppercaseChars] = useState<boolean>(false)
  const [useSymbols, setUseSymbols] = useState<boolean>(false)
  const [passwordRevealed, setPasswordRevealed] = useState<boolean>(false)

  const { addPassword, getPassword, getPasswordEntry, updatePassword, removePassword, copyPassword } = usePasswords()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { showAlert } = useAlert()
  const isAddMode = !id
  const isViewMode = Boolean(id)

  useEffect(() => {
    if (!isEditMode || !isAddMode) return

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
    isEditMode,
    isAddMode,

    setGeneratedPassword
  ])

  const copyPasswordToClipboard = useCallback(async () => {
    if (generatedPassword) {
      await copyToClipboard(generatedPassword)
      setPasswordCopied(true)
      await waitForSeconds(2)
      setPasswordCopied(false)
    } else if (fetchedPassword) {
      await copyPassword(fetchedPassword.id)
      setPasswordCopied(true)
      await waitForSeconds(2)
      setPasswordCopied(false)
    } else {
      toast.error('Unable to copy password!')
    }
  }, [copyPassword, fetchedPassword, generatedPassword])

  const onDeletePasswordClicked = () => {
    showAlert({
      id: 'delete-password-confirmation',
      title: 'Are you sure you want to delete this password?',
      description: 'This will remove the saved password permanently from this device',
      confirmActionText: 'Delete password',
      cancelActionText: 'Cancel',
      onAction: async (result) => {
        if (result && fetchedPassword) {
          await removePassword(fetchedPassword.id)
          history.replace('/')
        }
      }
    })
  }

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

  const togglePasswordVisibility = useCallback(async () => {
    if (passwordRevealed) {
      setRevealedPassword(DUMMY_PASS)
    } else {
      if (fetchedPassword) {
        const password = await getPassword(fetchedPassword.id)
        setRevealedPassword(password as string)
      }
    }
    setPasswordRevealed(!passwordRevealed)
  }, [fetchedPassword, getPassword, passwordRevealed])

  useEffect(() => {
    if (!isAddMode && !fetchedPassword) {
      getPasswordEntry(id)
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
                      defaultValue={revealedPassword}
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
              {
                (isEditMode || isAddMode) && (
                  <>
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
                  </>
                )
              }
              <Flex css={{ gap: '$4', justifyContent: 'space-between' }}>
                {isViewMode && isEditMode && <Button theme="danger" onClick={onDeletePasswordClicked}>Delete</Button>}
                {isAddMode && <Button type="submit">Add</Button>}
                {!isAddMode && isEditMode && <Button type="submit">Update</Button>}
                {!isAddMode && !isEditMode && <Button onClick={() => setIsEditMode(true)} css={{ ml: 'auto' }}>Edit</Button>}
              </Flex>
            </>
          )
        }}
      />
    </ContentContainer>
  )
}