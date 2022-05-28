import React, { useEffect, useState } from 'react'

import { ContentContainer } from 'components/content-container'
import { Button, Form, InputField, SliderField, CheckboxField, SelectField } from 'shared-components'
import { categories } from 'globalConstants'
import { generateRandomPassword } from 'randomizer'

const onSubmit = (value: any) => {
  console.log(value)
}

export const PasswordForm: React.FC = () => {
  const [generatedPassword, setGeneratedPassword] = useState<string>()

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
  return (
    <ContentContainer>
      <Form
        onSubmit={onSubmit}
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
              <InputField
                label='Password'
                name='password'
                placeholder='Enter or Generate'
                autoComplete='off'
                value={generatedPassword}
              />
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