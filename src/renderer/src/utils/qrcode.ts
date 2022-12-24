import QRCode from 'qrcode';
import {
  BarcodeScanner,
  CameraDirection,
  SupportedFormat,
} from '@capacitor-community/barcode-scanner';
import { toast } from '../shared-components';
import { waitForSeconds } from '../utils';

const scan = async () => {
  // Check camera permission
  // This is just a simple example, check out the better checks below
  const { granted } = await BarcodeScanner.checkPermission({ force: true });

  if (!granted) {
    toast.error(
      'We need the permission to use Camera in order to sync passwords, please allow it in App Settings.',
      { duration: 2000 }
    );

    await waitForSeconds(2);
    await BarcodeScanner.openAppSettings();

    return;
  }

  // make background of WebView transparent
  // note: if you are using ionic this might not be enough, check below
  BarcodeScanner.hideBackground();

  const result = await BarcodeScanner.startScan({
    cameraDirection: CameraDirection.BACK,
    targetedFormats: [SupportedFormat.QR_CODE],
  }); // start scanning and wait for a result
  await BarcodeScanner.stopScan();

  // if the result has content
  if (result.hasContent) {
    return result.content;
  } else {
    throw new Error('Unable to read QR Code. Please try again.');
  }
};

const generate = (data: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    QRCode.toDataURL(canvas, data, (error, url) => {
      if (error) reject(error);
      else resolve(url);
    });
  });

export const QRCodeUtils = {
  generate,
  scan,
};
