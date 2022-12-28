import { Storage } from './storage';

export const masterPasswordStore = new Storage(
  'iris-pass-master-password-store'
);

export const deviceStore = new Storage('iris-pass-device-store');

export const passwordStore = new Storage('iris-pass');
