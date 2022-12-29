import { Storage } from './storage';

export const masterPasswordStore = new Storage(
  'irispass-master-password-store'
);

export const deviceStore = new Storage('irispass-device-store');

export const passwordStore = new Storage('irispass');
