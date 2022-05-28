import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Text } from 'shared-components'
import { Header } from 'components/header';
import { Dashboard } from 'views/dashboard'
import { AddEntryButton } from 'components/add-entry-button';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Text size="lg" css={{ color: '$tonal100', textTransform: 'uppercase' }}>Password Manager</Text>
        <AddEntryButton />
      </Header>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}