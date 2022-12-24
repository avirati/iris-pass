import QRCode from 'qrcode';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const scan = async () => {
  // Check camera permission
  // This is just a simple example, check out the better checks below
  await BarcodeScanner.checkPermission({ force: true });

  // make background of WebView transparent
  // note: if you are using ionic this might not be enough, check below
  BarcodeScanner.hideBackground();

  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

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
