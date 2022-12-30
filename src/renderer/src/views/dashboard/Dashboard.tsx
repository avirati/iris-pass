import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { Box, DataTable, Table } from '../../shared-components';
import { ContentContainer } from '../../components/content-container';
import { IPassword, usePasswords } from '../../hooks/use-passwords';
import { PasswordCard } from '../../components/password-card';
import { AddEntryButton } from '../../components/add-entry-button';
import { fieldCSS } from '../../components/form-fields';

import { EmptyPasswordScreen } from './EmptyPasswordScreen';

const columnHelper = createColumnHelper<IPassword>();

const columns = [
  columnHelper.accessor('website', {
    cell: (info) => (
      <PasswordCard password={info.row.original} css={{ mb: '$4' }} />
    ),
  }),
  columnHelper.accessor('login', {
    cell: (info) => <Box css={{ display: 'none' }}>{info.getValue()}</Box>,
  }),
];

export const Dashboard: React.FC = () => {
  const { passwords } = usePasswords();

  return (
    <ContentContainer css={{ gap: '$4', '& > label': { display: 'none' } }}>
      {passwords.length > 0 ? (
        <>
          <DataTable
            columns={columns}
            data={passwords as any}
            key={passwords.length}
          >
            <DataTable.GlobalFilter
              label=''
              name=''
              css={{
                position: 'sticky',
                top: '-$5',
                bg: '$tonal500',
                '& > input': { ...fieldCSS },
              }}
            />
            <Table>
              <DataTable.Body
                css={{ bg: 'transparent', '& td': { p: 0, border: 'none' } }}
              />
            </Table>
          </DataTable>
        </>
      ) : (
        <EmptyPasswordScreen />
      )}
      <AddEntryButton />
    </ContentContainer>
  );
};
