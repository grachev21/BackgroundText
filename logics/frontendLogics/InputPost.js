const inputPost = () => {
  document.getElementById("addPost").addEventListener("click", async () => {
    const poPost = document.getElementById("poPost").value.trim();
    const mePost = document.getElementById("mePost").value.trim();
    const messageEl = document.getElementById("message");

    if (!poPost || !mePost) {
      messageEl.textContent = "Оба поля должны быть заполнены!";
      messageEl.style.color = "red";
      return;
    }

    try {
      // Отправляем данные в main-процесс
      await window.electronAPI.addPost({ po: poPost, me: mePost });

      messageEl.textContent = "Слово успешно добавлено!";
      messageEl.style.color = "green";

      // Очищаем поля ввода
      document.getElementById("poPost").value = "";
      document.getElementById("mePost").value = "";
    } catch (error) {
      messageEl.textContent = "Ошибка при добавлении слова: " + error.message;
      messageEl.style.color = "red";
    }
  });
};

export default inputPost;
