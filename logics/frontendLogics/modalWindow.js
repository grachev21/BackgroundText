const modalWindow = () => {
  window.onload = function () {
    const listPosts = document.querySelectorAll(".post-pair");
    if (listPosts) {
      const html = /*html*/ `
      <div class="modal-window">
          <span class="del">Удалить</span>
          <span class="meaning">номер</span>
      </div>
`;
      console.log("loaded list post");
      listPosts.forEach((listPosts) => {
        listPosts.insertAdjacentHTML("afterbegin", html);
        listPosts.addEventListener("mouseover", () => {
          const element = listPosts.querySelector(".modal-window");
          element.style.opacity = "100%";
          console.log("show");
        });
        listPosts.addEventListener("mouseout", () => {
          const element = listPosts.querySelector(".modal-window");
          element.style.opacity = "0%";
          console.log("hide");
        });
      });
    }
  };
};
export default modalWindow;
