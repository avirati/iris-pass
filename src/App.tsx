import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import { Header } from 'components/header';
import { LockScreen } from 'components/lock-screen';
import { Dashboard } from 'views/dashboard'
import { PasswordForm } from 'views/password-form';
import { AlertProvider, ToastProvider } from 'shared-components'
import { UsePasswordProvider } from 'hooks/use-passwords';
import { UseMasterPasswordProvider } from 'hooks/use-master-password/useMasterPassword.context';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AlertProvider>
        <UseMasterPasswordProvider>
          <UsePasswordProvider>
            <LockScreen />
            <Header />
            <HashRouter>
              <Switch>
                <Route path="/password/add" render={() => <PasswordForm mode='add'/>}/>
                <Route path="/password/edit/:id" render={() => <PasswordForm mode='edit'/>}/>
                <Route path="/password/view/:id" render={() => <PasswordForm mode='view'/>}/>
                <Route path="/" component={Dashboard}/>
              </Switch>
            </HashRouter>
          </UsePasswordProvider>
        </UseMasterPasswordProvider>
      </AlertProvider>
    </ToastProvider>
  )
}