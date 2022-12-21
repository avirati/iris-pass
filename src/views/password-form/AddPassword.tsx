import React from 'react';
import { useHistory } from 'react-router-dom';
import { Copy, Ok, Plus } from '@atom-learning/icons';

import { ContentContainer } from 'components/content-container';
import {
  ActionIcon,
  Button,
  CheckboxField,
  Flex,
  Form,
  Icon,
  InputField,
  SelectField,
  SliderField,
} from 'shared-components';
import { IPassword, usePasswords } from 'hooks/use-passwords';
import { categories } from 'globalConstants';
import { copyToClipboard, waitForSeconds } from 'utils';
import { generateRandomPassword } from 'randomizer';

type IFormData = Omit<IPassword, 'id'>;

export const AddPassword: React.FC = () => {
  const history = useHistory();
  const { addPassword } = usePasswords();

  const [generatedPassword, setGeneratedPassword] = React.useState<string>('');
  const [passwordCopied, setPasswordCopied] = React.useState<boolean>(false);
  const [passwordLength, setPasswordLength] = React.useState<number>(20);
  const [useLetters, setUseLetters] = React.useState<boolean>(true);
  const [useNumbers, setUseNumbers] = React.useState<boolean>(true);
  const [useUppercaseChars, setUseUppercaseChars] =
    React.useState<boolean>(false);
  const [useSymbols, setUseSymbols] = React.useState<boolean>(false);

  const onAddPassword = async (formData: IFormData) => {
    await addPassword(formData);
    history.push('/#/');
  };

  const copyPasswordToClipboard = async () => {
    await copyToClipboard(generatedPassword);
    setPasswordCopied(true);
    await waitForSeconds(2);
    setPasswordCopied(false);
  };

  React.useEffect(() => {
    const password = generateRandomPassword({
      passwordLength,
      useLetters,
      useNumbers,
      useSymbols,
      useUppercaseChars,
    });
    setGeneratedPassword(password);
  }, [passwordLength, useLetters, useNumbers, useUppercaseChars, useSymbols]);

  return (
    <ContentContainer>
      <Form
        onSubmit={(data) => onAddPassword(data)}
        css={{
          display: 'flex',
          gap: '$4',
          flexDirection: 'column',
          flexGrow: 1,
        }}
        render={() => {
          return (
            <>
              <SelectField
                name='category'
                label='Select a Category'
                fieldId='categories'
                autoComplete='off'
              >
                <option value=''>Select</option>
                {categories.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
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
                  type='text'
                  placeholder='Enter or Generate'
                  autoComplete='off'
                  value={generatedPassword}
                  onChange={(event) => setGeneratedPassword(event.target.value)}
                  css={{ flexGrow: 1 }}
                />
                <ActionIcon
                  label='copy-password'
                  appearance='outline'
                  size='lg'
                  onClick={copyPasswordToClipboard}
                >
                  <Icon is={passwordCopied ? Ok : Copy} />
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
                onCheckedChange={(checked) =>
                  setUseUppercaseChars(checked as boolean)
                }
              />
              <CheckboxField
                label='Include Symbols'
                name='useSymbols'
                checked={useSymbols}
                onCheckedChange={(checked) => setUseSymbols(checked as boolean)}
              />
              <Button type='submit'>
                <Icon is={Plus} />
                Add
              </Button>
            </>
          );
        }}
      />
    </ContentContainer>
  );
};
