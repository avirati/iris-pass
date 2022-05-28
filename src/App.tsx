import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Text } from 'shared-components'
import { Header } from 'components/header';
import { Dashboard } from 'views/dashboard'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Text size="xl" css={{ color: 'white' }}>Password Manager</Text>
      </Header>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}