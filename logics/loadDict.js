
const loadDict = () => {
    // Загружаем JSON и передаем его данные в renderList
    fetch('./dict.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }
            return response.json();
        })
        .then(data => {
            // Предполагаем, что data - это массив или объект с нужными данными
            renderList(data);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
            // Можно показать сообщение об ошибке пользователю
            document.getElementById("element-container").textContent = "Не удалось загрузить данные";
        });

    // Модифицированная функция renderList для работы с данными из JSON
    function renderList(items) {
        const listContainer = document.getElementById("element-container");
        listContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых элементов

        // Проверяем, является ли items массивом
        if (!Array.isArray(items)) {
            console.error('Ожидался массив элементов');
            return;
        }

        items.forEach((item) => {
            const wordPair = document.createElement("div");
            wordPair.className = "word-pair";

            // Предполагаем, что item - это объект с полями en и ru
            const enWord = document.createElement("p");
            enWord.className = "en";
            enWord.textContent = item.en || item.word || item; // Разные варианты на случай разной структуры данных

            const ruWord = document.createElement("p");
            ruWord.className = "ru";
            ruWord.textContent = item.ru || item.translation || item; // Разные варианты на случай разной структуры данных

            wordPair.appendChild(enWord);
            wordPair.appendChild(ruWord);
            listContainer.appendChild(wordPair);
        });
    }
}
export default loadDict;