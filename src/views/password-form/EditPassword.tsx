import React from 'react';
import { Ok, Copy } from '@atom-learning/icons';
import { useHistory, useParams } from 'react-router-dom';

import { Flex, Form, Icon } from '../../shared-components';
import { generateRandomPassword } from '../../randomizer';
import { ContentContainer } from '../../components/content-container';
import { categories } from '../../globalConstants';
import { useMasterPassword } from '../../hooks/use-master-password';
import { IPassword, usePasswords } from '../../hooks/use-passwords';
import {
  CheckboxField,
  DarkActionIcon,
  DarkButton,
  InputField,
  SelectField,
  SliderField,
} from '../../components/form-fields';

type IFormData = Omit<IPassword, 'id'>;

export const EditPassword: React.FC = () => {
  const [fetchedPassword, setFetchedPassword] =
    React.useState<Optional<IPassword>>(null);

  const [revealedPassword, setRevealedPassword] = React.useState<string>();
  const [passwordCopied, setPasswordCopied] = React.useState<boolean>(false);
  const [passwordLength, setPasswordLength] = React.useState<number>(20);
  const [useLetters, setUseLetters] = React.useState<boolean>(true);
  const [useNumbers, setUseNumbers] = React.useState<boolean>(true);
  const [useUppercaseChars, setUseUppercaseChars] =
    React.useState<boolean>(false);
  const [useSymbols, setUseSymbols] = React.useState<boolean>(false);

  const { getPassword, getPasswordEntry, updatePassword, copyPassword } =
    usePasswords();
  const { masterPassword } = useMasterPassword();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const onEditPassword = async ({
    category,
    login,
    password,
    website,
  }: IFormData) => {
    await updatePassword({
      category,
      login,
      password,
      website,
      id,
    });
    history.replace(`/#/password/view/${id}`);
  };

  const copyPasswordToClipboard = async () => {
    if (fetchedPassword?.id) {
      setPasswordCopied(true);
      await copyPassword(fetchedPassword.id);
      setPasswordCopied(false);
    }
  };

  React.useEffect(() => {
    if (!fetchedPassword && masterPassword) {
      getPasswordEntry(id)
        .then((password) => {
          if (password) {
            setFetchedPassword(password);
            return getPassword(password.id);
          } else {
            history.push('/#/');
            return Promise.resolve('');
          }
        })
        .then((decryptedPassword?: string | null) => {
          if (decryptedPassword) {
            setRevealedPassword(decryptedPassword);
          }
        });
    }
    // eslint-disable-next-line
  }, [masterPassword]);

  React.useEffect(() => {
    const password = generateRandomPassword({
      passwordLength,
      useLetters,
      useNumbers,
      useSymbols,
      useUppercaseChars,
    });
    setRevealedPassword(password);
  }, [passwordLength, useLetters, useNumbers, useUppercaseChars, useSymbols]);

  return (
    <ContentContainer>
      <Form
        onSubmit={(data) => onEditPassword(data)}
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
                  <option
                    value={value}
                    key={value}
                    selected={value === fetchedPassword?.category}
                  >
                    {value}
                  </option>
                ))}
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
                <InputField
                  label='Password'
                  name='password'
                  type='text'
                  placeholder='Enter or Generate'
                  autoComplete='off'
                  value={revealedPassword}
                  onChange={(event) => setRevealedPassword(event.target.value)}
                  css={{ flexGrow: 1 }}
                />
                <DarkActionIcon
                  label='copy-password'
                  appearance='outline'
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
                onValueChange={([value]) => setPasswordLength(value)}
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
