import { Storage } from './storage';

export const masterPasswordStore = new Storage(
  'password-manager-master-password-store'
);

export const deviceStore = new Storage('password-manager-device-store');

export const passwordStore = new Storage('password-manager');
