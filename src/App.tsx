import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import { Header } from 'components/header';
import { LockScreen } from 'components/lock-screen';
import { Dashboard } from 'views/dashboard'
import { PasswordForm } from 'views/password-form';
import { ToastProvider } from 'shared-components'
import { UsePasswordProvider } from 'hooks/use-passwords';
import { UseMasterPasswordProvider } from 'hooks/use-master-password/useMasterPassword.context';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <UseMasterPasswordProvider>
        <UsePasswordProvider>
          <LockScreen />
          <Header />
          <HashRouter>
            <Switch>
              <Route path="/password/add" component={PasswordForm}/>
              <Route path="/password/update/:id" component={PasswordForm}/>
              <Route path="/" component={Dashboard}/>
            </Switch>
          </HashRouter>
        </UsePasswordProvider>
      </UseMasterPasswordProvider>
    </ToastProvider>
  )
}