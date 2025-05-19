const loadPost = () => {
  // Загружаем JSON и передаем его данные в renderList
  fetch("./post.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки файла");
      }
      return response.json();
    })
    .then((data) => {
      renderList(data);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });

  function renderList(items) {
    const listContainer = document.getElementById("element-container");
    listContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых элементов

    items.forEach((item) => {
      const postPair = document.createElement("div");
      postPair.className = "post-pair";

      const poPost = document.createElement("p");
      poPost.className = "po";
      poPost.textContent = item.po;

      const mePost = document.createElement("p");
      mePost.className = "me";
      mePost.textContent = item.me;
      postPair.appendChild(poPost);
      postPair.appendChild(mePost);
      listContainer.appendChild(postPair);
    });
  }
};
export default loadPost;
