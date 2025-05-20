const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  addPost: (post) => ipcRenderer.invoke("addPost", post),
});
