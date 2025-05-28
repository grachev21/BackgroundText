const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  addPost: (post) => ipcRenderer.invoke("addPost", post),
  checkPost: (pathPost) => ipcRenderer.invoke("checkPost", pathPost),
  deletePost: (index) => ipcRenderer.invoke("deletePost", index),
  readJson: (pathPost) => ipcRenderer.invoke("readJson", pathPost),
  quitApp: () => ipcRenderer.send("quit-app"),
});
