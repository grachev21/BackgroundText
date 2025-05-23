const checkbox = document.getElementById("hideMeaning");
const listContainer = document.getElementById("element-container");

// *** FUNCTION FOR DISPLAYING MESSAGES ***
function showMessage(text, color = "green") {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  setTimeout(() => (messageEl.textContent = ""), 3000);
}

// *** READING JSON FILE ***
async function readJson() {
  const data = await window.electronAPI.readJson();
  listContainer.innerHTML = "";
  data.forEach((item) => {
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
  quiantityPost();
  modalWindow();
  setupDeleteHandlers();
}

// *** DISPLAY OF THE NUMBER OF POSTS ***
function quiantityPost() {
  const listPosts = document.querySelectorAll(".post-pair");
  const quantity = document.getElementById("quantity");
  quantity.textContent = listPosts.length;
}

// *** HIDING OF THE VALUES ***
function hideMeaning() {
  if (!checkbox) return;
  const handleCheckboxChange = function () {
    const display = this.checked ? "none" : "block";
    document.querySelectorAll(".post-pair > .me").forEach((element) => {
      element.style.display = display;
    });
  };
  checkbox.addEventListener("change", handleCheckboxChange);
  handleCheckboxChange.call(checkbox);
}

// *** MODAL WINDOW FOR POSTS ***
function modalWindow() {
  const listPosts = document.querySelectorAll(".post-pair");
  if (!listPosts.length) return;

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
      const element = item.querySelector(".modal-window");
      element.style.opacity = "100%";
      element.style.zIndex = "50";
    });

    item.addEventListener("mouseout", () => {
      item.style.border = "1px solid var(--background-color)";
      const element = item.querySelector(".modal-window");
      element.style.opacity = "0%";
      element.style.zIndex = "-50";
    });
  });
}

// *** REMOVAL OF POSTS ***
function setupDeleteHandlers() {
  const deleteButtons = document.querySelectorAll(".delete");
  console.log(deleteButtons);

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        const success = await window.electronAPI.deletePost(index);
        if (success) {
          showMessage("Пост успешно удален!");
          readJson();
        } else {
          throw new Error("Не удалось удалить пост");
        }
      } catch (error) {
        console.error("Ошибка удаления:", error);
        showMessage(`Ошибка удаления: ${error.message}`, "red");
      }
    });
  });
}

async function checkPost() {
  let mePost = document.getElementById("mePost");
  document.getElementById("poPost").addEventListener("input", async (event) => {
    // console.log("Текущее значение:", event.target.value);
    const data = await window.electronAPI.checkPost();

    const value = data.find((item) => item.post === event.target.value);
    if (value != undefined) {
      mePost.textContent = value["meaning"];
    } else {
      mePost.textContent = "";
    }
    if (event.target.value.length === 0) {
      mePost.textContent = "";
    }
    // data.forEach((value) => {
    // data.map((value) => {
    //   const foundKey = Object.keys(value).find((key) => value[key] === event.target.value);
    //   if (foundKey != undefined) {
    //     mePost.textContent = value["meaning"];
    //   }
    //   // if (foundKey == undefined) {
    //   //   mePost.textContent = "xxx";
    //   // }
    // });
  });

  // poPost.document.addEventListener("change", () => {
  //   // console.log("message");
  //   // console.log(await window.electronAPI.checkPost());
  // });
}

// ADDING A NEW POST
function addPost() {
  document.getElementById("addPost").addEventListener("click", async () => {
    const poPost = document.getElementById("poPost").value.trim();
    const mePost = document.getElementById("mePost").value.trim();

    console.log(poPost);
    if (!poPost || !mePost) {
      showMessage("Оба поля должны быть заполнены!", "red");
      return;
    }
    try {
      await window.electronAPI.addPost({ po: poPost, me: mePost });
      showMessage("Слово успешно добавлено!");

      readJson();

      document.getElementById("poPost").value = "";
      document.getElementById("mePost").value = "";
    } catch (error) {
      console.error("Ошибка добавления:", error);
      showMessage(`Ошибка при добавлении слова: ${error.message}`, "red");
    }
  });
}

// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
function init() {
  readJson();
  addPost();
  hideMeaning();
  checkPost();
}

init();
