import { BrowserWindow, ipcMain } from 'electron';
import express from 'express';
import { Server } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { IPCEvents } from '../../IPCEvents';

let server: Server;
let browserWindow: BrowserWindow;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post<void, any, { input: string; output: string }>(
  '/sync',
  (request, response) => {
    const handshake = request.body;
    browserWindow.webContents.send(IPCEvents.SYNC_HANDSHAKE, handshake);

    ipcMain.once(IPCEvents.SYNC_HANDSHAKE_RESULT, (event, success) => {
      response.status(200).json({ success });
    });
  }
);

const start = (port: number, mainWindow: BrowserWindow) => {
  browserWindow = mainWindow;
  server = app.listen(port, () =>
    console.log(`Sync server started on PORT ${port}`)
  );
};

const stop = () => {
  server.close(() => console.log('Sync server stopped'));
};

export const SyncServer = { start, stop };
