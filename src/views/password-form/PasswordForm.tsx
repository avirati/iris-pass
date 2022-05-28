import React from 'react'

import { ContentContainer } from 'components/content-container'
import { Button, Form, InputField, PasswordField, SliderField, CheckboxField, SelectField } from 'shared-components'
import { categories } from 'globalConstants'

const onSubmit = (value: any) => {
  console.log(value)
}

export const PasswordForm: React.FC = () => {
  return (
    <ContentContainer>
      <Form onSubmit={onSubmit} css={{ display: 'flex', gap: '$4', flexDirection: 'column', flexGrow: 1 }}>
        <SelectField name='category' label='Select a Category' fieldId='categories'>
          <option value=''>Select</option>
          {
            categories.map((value) => <option value={value} key={value}>{value}</option>)
          }
        </SelectField>
        <InputField label='Website' name='website' placeholder='Website (e.g. https://google.com)'/>
        <InputField label='Login' name='login' placeholder='Login (e.g. you@example.com)'/>
        <PasswordField label='Password' name='password' placeholder='Enter or Generate'/>
        <SliderField label='Password Length' name='passwordLength' defaultValue={[20]} min={8} max={100} outputLabel={(value) => `Selected Password Length : ${value}`}/>
        <CheckboxField label='Include Letters' name='useLetters'/>
        <CheckboxField label='Include Uppercase Characters' name='useUppercaseChars'/>
        <CheckboxField label='Include Numbers' name='useNumbers'/>
        <CheckboxField label='Include Symbols' name='useSymbols'/>
        <Button type="submit">Submit</Button>
      </Form>
    </ContentContainer>
  )
}