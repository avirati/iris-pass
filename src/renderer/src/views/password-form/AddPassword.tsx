import React from 'react';
import { useHistory } from 'react-router-dom';
import { Copy, Ok, Refresh } from '@atom-learning/icons';

import { ContentContainer } from '../../components/content-container';
import { Flex, Form, Icon } from '../../shared-components';
import { IPassword, usePasswords } from '../../hooks/use-passwords';
import { categories } from '../../globalConstants';
import { copyToClipboard, waitForSeconds } from '../../utils';
import { generateRandomPassword } from '../../randomizer';
import {
  InputField,
  SelectField,
  SliderField,
  CheckboxField,
  DarkButton,
  DarkActionIcon,
} from '../../components/form-fields';

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
  const [refreshIndex, setRefreshIndex] = React.useState<number>(0);

  const onAddPassword = async (formData: IFormData) => {
    await addPassword(formData);
    history.push('/');
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
  }, [
    passwordLength,
    useLetters,
    useNumbers,
    useUppercaseChars,
    useSymbols,
    refreshIndex,
  ]);

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
                required
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
                autoCapitalize='off'
                required
              />
              <InputField
                label='Login'
                name='login'
                placeholder='Login (e.g. you@example.com)'
                autoComplete='off'
                autoCapitalize='off'
                required
              />
              <Flex css={{ alignItems: 'flex-end', gap: '$2' }}>
                <InputField
                  label='Password'
                  name='password'
                  type='text'
                  placeholder='Enter or Generate'
                  autoComplete='off'
                  autoCapitalize='off'
                  value={generatedPassword}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setGeneratedPassword(event.target.value)
                  }
                  css={{ flexGrow: 1 }}
                  required
                />
                <DarkActionIcon
                  label='regenerate-password'
                  size='lg'
                  onClick={() => setRefreshIndex(refreshIndex + 1)}
                >
                  <Icon is={Refresh} />
                </DarkActionIcon>
                <DarkActionIcon
                  label='copy-password'
                  size='lg'
                  onClick={copyPasswordToClipboard}
                >
                  <Icon is={passwordCopied ? Ok : Copy} />
                </DarkActionIcon>
              </Flex>
              <SliderField
                label={`Password Length (${passwordLength})`}
                name='passwordLength'
                defaultValue={[passwordLength]}
                value={[passwordLength]}
                min={8}
                max={100}
                outputLabel={() => ''}
                onValueChange={([value]: number[]) => setPasswordLength(value)}
                css={{
                  '& > span > span:last-child': {
                    bg: '$tonal50',
                    borderRadius: '$round',
                  },
                }}
              />
              <CheckboxField
                label='Include Letters'
                name='useLetters'
                checked={useLetters}
                onCheckedChange={(checked: boolean) =>
                  setUseLetters(checked as boolean)
                }
              />
              <CheckboxField
                label='Include Numbers'
                name='useNumbers'
                checked={useNumbers}
                onCheckedChange={(checked: boolean) =>
                  setUseNumbers(checked as boolean)
                }
              />
              <CheckboxField
                label='Include Uppercase Characters'
                name='useUppercaseChars'
                checked={useUppercaseChars}
                onCheckedChange={(checked: boolean) =>
                  setUseUppercaseChars(checked as boolean)
                }
              />
              <CheckboxField
                label='Include Symbols'
                name='useSymbols'
                checked={useSymbols}
                onCheckedChange={(checked: boolean) =>
                  setUseSymbols(checked as boolean)
                }
              />
              <DarkButton
                type='submit'
                css={{ px: '$3', width: '100%', mt: '$4' }}
              >
                SAVE
              </DarkButton>
            </>
          );
        }}
      />
    </ContentContainer>
  );
};
