import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import { IPCEvents } from '../IPCEvents';

// Custom APIs for renderer
const api = {
  getLocalIP: () => {
    ipcRenderer.send(IPCEvents.GET_LOCAL_IP);
  },
  onGetLocalIPSuccess: (callback: (ip: string) => void) => {
    ipcRenderer.on(IPCEvents.GET_LOCAL_IP_SUCCESS, (event, localIP) =>
      callback(localIP)
    );
  },
  startSyncServer: () => {
    ipcRenderer.send(IPCEvents.START_SYNC_SERVER);
  },
  stopSyncServer: () => {
    ipcRenderer.send(IPCEvents.STOP_SYNC_SERVER);
  },
  onSyncHandshake: (
    callback: (handshake: { input: string; output: string }) => void
  ) => {
    ipcRenderer.once(IPCEvents.SYNC_HANDSHAKE, (event, handshake) =>
      callback(handshake)
    );
  },
  syncHandshakeResult: (success: boolean, passwords: Record<string, any>) => {
    ipcRenderer.send(IPCEvents.SYNC_HANDSHAKE_RESULT, success, passwords);
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
