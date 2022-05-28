import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'

import { Header } from 'components/header';
import { Dashboard } from 'views/dashboard'
import { PasswordForm } from 'views/password-form';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/password-form" element={<PasswordForm />}/>
      </Routes>
    </HashRouter>
  )
}