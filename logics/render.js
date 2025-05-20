const checkbox = document.getElementById("hideMeaning");
const listContainer = document.getElementById("element-container");

// DOWNLOADING POSTS FROM THE LOCAL JSON FILE
function loadPost() {
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
    // Clean the container before adding new elements
    listContainer.innerHTML = "";

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

    // Call pop -up windows since you need to wait until the functions are completed
    quiantityPost();
    modalWindow();
  }
}

// DISPLAY OF THE NUMBER OF POSTS
function quiantityPost() {
  let listPosts = document.querySelectorAll(".post-pair");
  let quantity = document.getElementById("quantity");
  quantity.textContent = listPosts.length;
}

// HIDE THE MEANING
function hideMeaning() {
  const handleCheckboxChange = function () {
    if (this.checked) {
      document.querySelectorAll(".post-pair > .me").forEach((element) => {
        element.style.display = "none";
      });
    } else {
      document.querySelectorAll(".post-pair > .me").forEach((element) => {
        element.style.display = "block";
      });
    }
  };

  if (checkbox) {
    checkbox.addEventListener("change", handleCheckboxChange);
    handleCheckboxChange.call(checkbox);
  }
}

// DISPLAYS A WINDOW WITH INFORMATION ABOUT THE POST AND THE DELETE BUTTON
function modalWindow() {
  let listPosts = document.querySelectorAll(".post-pair");
  if (listPosts) {
    const html = /*html*/ `
      <div class="modal-window">
        <span class="number"></span>
        <span class="meaning"></span>
        <span class="delete">Удалить</span>
      </div>
`;
    listPosts.forEach((item, index) => {
      item.insertAdjacentHTML("afterbegin", html);
      item.querySelector(".number").textContent = index + 1;
      item.querySelector(".meaning").textContent = item.querySelector(".me").textContent;
      item.addEventListener("mouseover", () => {
        item.style.border = "1px solid white";
        let element = item.querySelector(".modal-window");
        element.style.opacity = "100%";
        element.style.zIndex = "50";
      });
      item.addEventListener("mouseout", () => {
        item.style.border = "1px solid var(--background-color)";
        let element = item.querySelector(".modal-window");
        element.style.opacity = "0%";
        element.style.zIndex = "-50";
      });
    });
  }
}

// ADDING A NEW POST
function inputPost() {
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
      // send data to the Main process
      await window.electronAPI.addPost({ po: poPost, me: mePost });
      messageEl.textContent = "Слово успешно добавлено!";
      messageEl.style.color = "green";

      // Cleanse input fields
      document.getElementById("poPost").value = "";
      document.getElementById("mePost").value = "";
    } catch (error) {
      messageEl.textContent = "Ошибка при добавлении слова: " + error.message;
      messageEl.style.color = "red";
    }
  });
}

inputPost();
loadPost();
hideMeaning();
