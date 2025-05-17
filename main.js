const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

const fs = require('fs');

// Путь к JSON-файлу
const wordsPath = path.join('./dict.json');

// Создаем файл если его нет
if (!fs.existsSync(wordsPath)) {
    fs.writeFileSync(wordsPath, JSON.stringify([]));
}


// Обработчик для добавления слова
ipcMain.handle('addWord', async (event, newWord) => {
    try {
        // Читаем текущие данные
        const data = JSON.parse(fs.readFileSync(wordsPath, 'utf-8'));

        // Добавляем новое слово
        data.push(newWord);

        // Записываем обратно
        fs.writeFileSync(wordsPath, JSON.stringify(data, null, 2));

        return { success: true };
    } catch (error) {
        throw new Error('Не удалось сохранить слово');
    }
});

// Автоперезагрузка при изменении файлов
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
})

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + "./icons/cb666985-6ddc-4c7f-8557-109890574e42.jpg",
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })


    Menu.setApplicationMenu(null);

    win.loadFile('index.html')
    win.webContents.openDevTools(); // Раскомментируйте для отладки
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})