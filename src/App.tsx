import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Add } from '@atom-learning/icons'

import { ActionIcon, Icon, Text } from 'shared-components'
import { Header } from 'components/header';
import { Dashboard } from 'views/dashboard'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Text size="lg" css={{ color: '$tonal100', textTransform: 'uppercase' }}>Password Manager</Text>
        <ActionIcon label="add-password" theme="primary">
          <Icon is={Add}/>
        </ActionIcon>
      </Header>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}