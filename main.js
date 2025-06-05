const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs/promises");
const os = require("os");

// The path to the file
// const postPath = path.join(app.getPath('userData'), 'post.json');
const postPath = path.join(os.homedir(), "Documents", "post.json");

// Initialization File
async function initializePostsFile() {
  try {
    await fs.access(postPath);
  } catch {
    await fs.writeFile(postPath, JSON.stringify([]));
  }
}

// *** POST READER ***
ipcMain.handle("readJson", async () => {
  try {
    const data = await fs.readFile(postPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error;
  }
});

// *** CHECK POST JSON FILE ***
const postPathRead = path.join(__dirname, "post.json");
ipcMain.handle("checkPost", async () => {
  try {
    const data = await fs.readFile(postPathRead, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("It was not possible to read the data", error);
    throw error;
  }
});

// *** PROCESSOR ADDING POST ***
ipcMain.handle("addPost", async (event, newPost) => {
  try {
    await initializePostsFile();
    const data = await fs.readFile(postPath, "utf-8");
    const posts = JSON.parse(data);
    // Checking the structure of the new post
    if (!newPost.po || !newPost.me) {
      throw new Error("Некорректная структура поста");
    }
    posts.push(newPost);
    await fs.writeFile(postPath, JSON.stringify(posts, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Add post error:", error);
    throw new Error(`Ошибка при добавлении: ${error.message}`);
  }
});

// *** LAST REMOVAL HANDLER ***
ipcMain.handle("deletePost", async (event, index) => {
  try {
    await initializePostsFile();

    const data = await fs.readFile(postPath, "utf-8");
    const posts = JSON.parse(data);
    console.log(posts, data);

    if (index < 0 || index >= posts.length) {
      console.error(`Invalid index: ${index}, posts length: ${posts.length}`);
      return false;
    }

    posts.splice(index, 1);
    await fs.writeFile(postPath, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error("Delete post error:", error);
    throw new Error(`Ошибка при удалении: ${error.message}`);
  }
});

ipcMain.on("quit-app", () => {
  app.quit();
});

// AUTO RE -PROCUREMENT
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  hardResetMethod: "exit",
});

// Добавьте это перед созданием окна
function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    x: 0,
    y: 0,
    frame: false,
    alwaysOnTop: false,
    skipTaskbar: true,
    show: true,
    icon: path.join(__dirname, "icons", "icon.png"), // или .ico на Windows
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.webContents.openDevTools();
  win.loadFile("index.html");

  // Трюк, чтобы окно стало позади всех
  win.setAlwaysOnTop(true, "screen-saver");
  win.setVisibleOnAllWorkspaces(true);
  win.showInactive(); // показать, не фокусируя
  win.setAlwaysOnTop(false); // снять поверх
}

app.whenReady().then(() => {
  initializePostsFile().then(createWindow);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
