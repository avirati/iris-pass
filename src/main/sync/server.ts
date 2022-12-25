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

app.post('/sync', (request, response) => {
  console.log(`Sync requested from ${request.ip}`);
  const handshake = request.body;
  browserWindow.webContents.send(IPCEvents.SYNC_HANDSHAKE, handshake);

  ipcMain.once(IPCEvents.SYNC_HANDSHAKE_RESULT, (event, success, passwords) => {
    response.status(200).json({ success, passwords });
  });
});

const start = (port: number, mainWindow: BrowserWindow) => {
  browserWindow = mainWindow;
  if (server?.listening) {
    console.error('Server already up');
    return;
  }
  server = app.listen(port, () => console.log('Sync server started'));
};

const stop = () => {
  if (!server?.listening) {
    console.error('Server already down');
    return;
  }
  server.close(() => console.log('Sync server stopped'));
};

export const SyncServer = { start, stop };
