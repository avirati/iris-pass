import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Edit } from '@atom-learning/icons';

import {
  Button,
  Flex,
  Icon,
  Label,
  Link,
  Stack,
  Text,
  toast,
} from 'shared-components';
import { ContentContainer } from 'components/content-container';
import { IPassword, usePasswords } from 'hooks/use-passwords';
import { DUMMY_PASS } from './constants';
import { EnhancedInput } from 'components/enhanced-input';
import { copyToClipboard } from 'utils';

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

  return (
    <ContentContainer>
      <Flex css={{ gap: '$5', flexDirection: 'column', flexGrow: 1 }}>
        <Stack direction='column'>
          <Label>Category</Label>
          <Text>{fetchedPassword?.category}</Text>
        </Stack>
        <Stack direction='column'>
          <Label>Website</Label>
          <Link href={fetchedPassword?.website}>
            {fetchedPassword?.website}
          </Link>
        </Stack>
        <Stack direction='column'>
          <Label>Login</Label>
          <EnhancedInput
            value={fetchedPassword?.login}
            name='login'
            onCopy={() => copyToClipboard(fetchedPassword?.login)}
          />
        </Stack>
        <Stack direction='column'>
          <Label>Password</Label>
          <EnhancedInput
            value={revealedPassword}
            name='password'
            visible={passwordRevealed}
            type={passwordRevealed ? 'text' : 'password'}
            onCopy={copyPasswordToClipboard}
            onVisibilityToggle={togglePasswordVisibility}
          />
        </Stack>
        <Link as={Button} href={`/#/password/edit/${id}`}>
          <Icon is={Edit} />
          Edit
        </Link>
      </Flex>
    </ContentContainer>
  );
};
