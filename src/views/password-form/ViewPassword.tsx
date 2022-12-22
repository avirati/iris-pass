import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Bin, Edit } from '@atom-learning/icons';

import { Flex, Form, Icon, toast } from 'shared-components';
import { ContentContainer } from 'components/content-container';
import { IPassword, usePasswords } from 'hooks/use-passwords';
import { DUMMY_PASS } from './constants';
import { EnhancedInput } from 'components/enhanced-input';
import { copyToClipboard } from 'utils';
import { PasswordCard } from 'components/password-card';
import {
  DarkActionIcon,
  InputField,
  SelectField,
} from 'components/form-fields';
import { categories } from 'globalConstants';

export const ViewPassword: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [fetchedPassword, setFetchedPassword] =
    React.useState<Optional<IPassword>>(null);
  const [passwordRevealed, setPasswordRevealed] =
    React.useState<boolean>(false);
  const [revealedPassword, setRevealedPassword] =
    React.useState<string>(DUMMY_PASS);

  const { getPassword, getPasswordEntry } = usePasswords();

  React.useEffect(() => {
    if (!fetchedPassword && id) {
      getPasswordEntry(id).then((password) => {
        if (password) {
          setFetchedPassword(password);
        } else {
          history.push('/#/');
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const copyPasswordToClipboard = async () => {
    if (fetchedPassword) {
      const password = await getPassword(fetchedPassword.id);
      copyToClipboard(password);
      toast.success('Copied to clipboard');
    }
  };

  const togglePasswordVisibility = async () => {
    if (passwordRevealed) {
      setRevealedPassword(DUMMY_PASS);
    } else {
      if (fetchedPassword) {
        const password = await getPassword(fetchedPassword.id);
        setRevealedPassword(password as string);
      }
    }
    setPasswordRevealed(!passwordRevealed);
  };

  if (!fetchedPassword) return null;

  return (
    <ContentContainer css={{ gap: '$4' }}>
      <PasswordCard password={fetchedPassword} />
      <Flex css={{ justifyContent: 'space-between' }}>
        <DarkActionIcon
          size='xl'
          label='delete-password'
          css={{ border: 'none', justifyContent: 'flex-end', size: '$2' }}
        >
          <Icon is={Bin} />
        </DarkActionIcon>
        <DarkActionIcon
          size='xl'
          label='edit-password'
          href={`/#/password/edit/${id}`}
          css={{ border: 'none', justifyContent: 'flex-start', size: '$2' }}
        >
          <Icon is={Edit} />
        </DarkActionIcon>
      </Flex>
      <Form
        onSubmit={() => null}
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '$4',
          border: '1px solid $tonal200',
          borderRadius: '$0',
          p: '$4',
        }}
      >
        <InputField
          label='Category'
          name='category'
          value={fetchedPassword.category}
          readOnly
        />
        <InputField
          label='Website'
          name='website'
          value={fetchedPassword.website}
          readOnly
        />
        <EnhancedInput
          label='Login'
          name='login'
          value={fetchedPassword.login}
          readOnly
          onCopy={() => copyToClipboard(fetchedPassword.login)}
        />
        <EnhancedInput
          label='Password'
          name='password'
          value={revealedPassword}
          readOnly
          type={passwordRevealed ? 'text' : 'password'}
          visible={passwordRevealed}
          onCopy={copyPasswordToClipboard}
          onVisibilityToggle={togglePasswordVisibility}
        />
      </Form>
    </ContentContainer>
  );
};
