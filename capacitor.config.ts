import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.avinashv.irispass',
  appName: 'IRISPass',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    buildOptions: {
      keystoreAlias: process.env.APK_KEYSTORE_ALIAS,
      keystoreAliasPassword: process.env.APK_KEYSTORE_ALIAS_PASS,
      keystorePath: process.env.APK_KEYSTORE_PATH,
      keystorePassword: process.env.APK_KEYSTORE_PASS,
      releaseType: 'APK',
    },
  },
};

export default config;
