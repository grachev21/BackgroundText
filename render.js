const checkbox = document.getElementById("hideMeaning");
const listContainer = document.getElementById("element-container");

// *** FUNCTION FOR DISPLAYING MESSAGES ***
function showMessage(text, color = "green") {
  const messageEl = document.getElementById("message");
  messageEl.setAttribute("style", `color: ${color}`);
  messageEl.textContent = text;
  setTimeout(() => (messageEl.textContent = ""), 3000);
}

// *** READING JSON FILE ***
async function readJson() {
  const globalData = await window.electronAPI.readJson();
  listContainer.innerHTML = "";
  globalData.forEach((item) => {
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
  alphabetPointer();
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
    const display = this.checked ? "rgb(242, 90, 125)" : "";
    document.querySelectorAll(".post-pair > .me").forEach((element) => {
      element.style.backgroundColor = display;
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
    if (event.target.value.length === 0) {
      mePost.textContent = "";
    }
    const data = await window.electronAPI.checkPost();

    const value = data.find((item) => item.post === event.target.value);
    if (value != undefined) {
      mePost.textContent = value["meaning"];
    } else {
      mePost.textContent = "";
    }
  });
}

// ADDING A NEW POST
function addPost() {
  document.getElementById("addPost").addEventListener("click", async () => {
    const poPost = document.getElementById("poPost").value.trim();
    const mePost = document.getElementById("mePost").textContent;

    if (!poPost || !mePost) {
      showMessage("Поле должно быть заполнено!", "red");
      return;
    }

    try {
      const allPosts = await window.electronAPI.readJson();
      const result = allPosts.find((p) => p.po === poPost);
      if (result === undefined) {
        await window.electronAPI.addPost({ po: poPost, me: mePost });
        showMessage("Слово успешно добавлено!");
        document.getElementById("mePost").textContent = "";
        readJson();
        document.getElementById("poPost").value = "";
        document.getElementById("mePost").value = "";
      } else {
        showMessage("Это слово уже есть в вашем словаре!", "red");
        const elements = document.querySelectorAll(".post-pair");
        const word = Array.from(elements).find((el) => el.textContent.includes(poPost));
        word.setAttribute("style", "border: 1px, solid red; border-radius: 12px;");
        setTimeout(() => word.removeAttribute("style"), 3000);
        document.getElementById("poPost").value = "";
        document.getElementById("mePost").textContent = "";
      }
    } catch (error) {
      console.error("Ошибка добавления:", error);
      showMessage(`Ошибка при добавлении слова: ${error.message}`, "red");
    }
  });
}

const alphabetPointer = () => {
  const alphabet = document.querySelectorAll(".alphabetPointer > p");
  const allWords = document.querySelectorAll(".post-pair > .po");

  alphabet.forEach((item) => {
    item.addEventListener("mouseover", (e) => {
      allWords.forEach((item) => {
        if (item.textContent[0] === e.target.textContent) {
          item.classList.add("pointerWord");
        }
      });
    });
    item.addEventListener("mouseout", (e) => {
      allWords.forEach((item) => {
        if (item.textContent[0] === e.target.textContent) {
          item.classList.remove("pointerWord");
        }
      });
    });
  });
};

const quitApp = () => {
  document.getElementById("quit-app").addEventListener("click", () => {
    window.electronAPI.quitApp();
  });
};

// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
function init() {
  readJson();
  addPost();
  hideMeaning();
  checkPost();
  quitApp();
}

init();
