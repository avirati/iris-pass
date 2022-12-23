import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ContentContainer } from 'components/content-container';
import { PasswordCard } from 'components/password-card';
import { IPassword, usePasswords } from 'hooks/use-passwords';
import { Flex, Heading, Stack, Text, toast } from 'shared-components';
import { DarkButton } from 'components/form-fields';

export const DeletePassword: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [fetchedPassword, setFetchedPassword] =
    React.useState<Optional<IPassword>>(null);

  const { getPasswordEntry, removePassword } = usePasswords();

  React.useEffect(() => {
    if (!fetchedPassword && id) {
      getPasswordEntry(id).then((password) => {
        if (password) {
          setFetchedPassword(password);
        } else {
          toast.error('Unable to fetch password data. Please retry.');
          history.goBack();
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  const onDeletePassword = async () => {
    if (!fetchedPassword) {
      toast.error('Unable to delete password data. Please retry.');
      return;
    }

    await removePassword(fetchedPassword?.id);
    history.replace('/');
  };

  if (!fetchedPassword) return null;

  return (
    <ContentContainer css={{ gap: '$6' }}>
      <PasswordCard password={fetchedPassword} />
      <Flex
        css={{
          flexDirection: 'column',
          gap: '$5',
          border: '1px solid $tonal200',
          borderRadius: '$0',
          p: '$4',
        }}
      >
        <Heading as='h4' size='sm' css={{ color: '$tonal200' }}>
          Are you sure you want to delete this password?
        </Heading>
        <Text css={{ color: '$tonal200' }}>
          This will remove the saved password permanently from this device
        </Text>
        <Stack gap='2' direction='row' justify='end'>
          <DarkButton size='sm' onClick={() => history.goBack()}>
            Cancel
          </DarkButton>
          <DarkButton size='sm' onClick={onDeletePassword}>
            Delete password
          </DarkButton>
        </Stack>
      </Flex>
    </ContentContainer>
  );
};
