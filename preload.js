const { contextBridge, ipcRenderer } = require("electron");

// const path = require("path")
// const os = require("os");

contextBridge.exposeInMainWorld("electronAPI", {
  addPost: (post) => ipcRenderer.invoke("addPost", post),
  checkPost: (pathPost) => ipcRenderer.invoke("checkPost", pathPost),
  deletePost: (index) => ipcRenderer.invoke("deletePost", index),
  readJson: (pathPost) => ipcRenderer.invoke("readJson", pathPost),
});
