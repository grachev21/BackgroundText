const fs = require("fs");
const path = require("path");

const postPath = path.join(__dirname, "post.json");

// Инициализация файла, если его нет
function initPost() {
  if (!fs.existsSync(postPath)) {
    fs.writeFileSync(postPath, JSON.stringify([]));
  }
}

function addPost(newPost) {
  try {
    const data = JSON.parse(fs.readFileSync(postPath, "utf-8"));
    data.push(newPost);
    fs.writeFileSync(postPath, JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Ошибка при добавлении слова:", error);
    throw new Error("Не удалось сохранить слово");
  }
}

// Экспортируем функции
module.exports = {
  initPost,
  addPost,
};
