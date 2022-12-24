import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Header } from './components/header';
import { LockScreen } from './components/lock-screen';
import { Dashboard } from './views/dashboard';
import {
  AddPassword,
  DeletePassword,
  EditPassword,
  ViewPassword,
} from './views/password-form';
import { AlertProvider, ToastProvider } from './shared-components';
import { UsePasswordProvider } from './hooks/use-passwords';
import { UseMasterPasswordProvider } from './hooks/use-master-password';
import { UsePasswordSyncProvider } from './hooks/use-password-sync';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AlertProvider>
        <UseMasterPasswordProvider>
          <UsePasswordProvider>
            <LockScreen />
            <UsePasswordSyncProvider>
              <Header />
            </UsePasswordSyncProvider>
            <HashRouter>
              <Switch>
                <Route path='/password/add' component={AddPassword} />
                <Route path='/password/edit/:id' component={EditPassword} />
                <Route path='/password/view/:id' component={ViewPassword} />
                <Route path='/password/delete/:id' component={DeletePassword} />
                <Route path='/' component={Dashboard} />
              </Switch>
            </HashRouter>
          </UsePasswordProvider>
        </UseMasterPasswordProvider>
      </AlertProvider>
    </ToastProvider>
  );
};
