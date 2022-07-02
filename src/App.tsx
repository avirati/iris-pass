import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'

import { Header } from 'components/header';
import { Dashboard } from 'views/dashboard'
import { PasswordForm } from 'views/password-form';
import { ToastProvider } from 'shared-components'
import { UsePasswordProvider } from 'hooks/usePasswords';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <UsePasswordProvider>
        <Header />
        <HashRouter>
          <Switch>
            <Route path="/password/add" component={PasswordForm}/>
            <Route path="/password/update/:id" component={PasswordForm}/>
            <Route path="/" component={Dashboard}/>
          </Switch>
        </HashRouter>
      </UsePasswordProvider>
    </ToastProvider>
  )
}