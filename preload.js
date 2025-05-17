const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    addWord: (word) => ipcRenderer.invoke('addWord', word)
});