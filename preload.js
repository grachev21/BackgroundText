// Импортируем необходимые модули из Electron
// contextBridge - позволяет безопасно предоставлять API из изолированного мира (preload) в мир рендерера
// ipcRenderer - используется для взаимодействия между процессами (отправка и получение сообщений)
const { contextBridge, ipcRenderer } = require("electron");

// Создаём мост между изолированным миром preload-скрипта и фронтендом
contextBridge.exposeInMainWorld(
  "electronAPI", // Имя объекта, который будет доступен в глобальном контексте окна (window.electronAPI)
  {
    // Определяем метод `addWord`, который будет вызываться из фронтенда
    // При вызове он отправляет IPC-сообщение в главный процесс с типом 'addWord' и переданным словом
    addPost: (post) => ipcRenderer.invoke("addPost", post),
    // `ipcRenderer.invoke` отправляет сообщение в главный процесс и ожидает Promise в ответ
  }
);

// Что делает этот код?

// Создаёт API для фронтенда:
// В объекте window (в контексте браузера) появится window.electronAPI, который содержит метод addWord.
// Это безопасный способ, потому что contextBridge изолирует код preload-скрипта от фронтенда.
// Отправляет сообщение в главный процесс:
// Когда фронтенд вызывает window.electronAPI.addWord("someWord"), ipcRenderer.invoke отправляет IPC-сообщение с типом 'addWord' и переданным словом.
// Главный процесс должен обрабатывать это сообщение через ipcMain.handle('addWord', ...).