import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'

import { Header } from 'components/header';
import { Dashboard } from 'views/dashboard'
import { PasswordForm } from 'views/password-form';
import { ToastProvider } from 'shared-components'
import { UsePasswordProvider } from 'hooks/usePasswords';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <UsePasswordProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/password-form" element={<PasswordForm />}/>
          </Routes>
        </HashRouter>
      </UsePasswordProvider>
    </ToastProvider>
  )
}