const  inputWords = () => {
    document.getElementById('addWord').addEventListener('click', async () => {
        const enWord = document.getElementById('enWord').value.trim();
        const ruWord = document.getElementById('ruWord').value.trim();
        const messageEl = document.getElementById('message');

        if (!enWord || !ruWord) {
            messageEl.textContent = "Оба поля должны быть заполнены!";
            messageEl.style.color = "red";
            return;
        }

        try {
            // Отправляем данные в main-процесс
            await window.electronAPI.addWord({ en: enWord, ru: ruWord });

            messageEl.textContent = "Слово успешно добавлено!";
            messageEl.style.color = "green";

            // Очищаем поля ввода
            document.getElementById('enWord').value = '';
            document.getElementById('ruWord').value = '';
        } catch (error) {
            messageEl.textContent = "Ошибка при добавлении слова: " + error.message;
            messageEl.style.color = "red";
        }
    });
}

export default inputWords