const html = `
    <div class="modal-window">
        <span class="del">Удалить</span>
        <span class="meaning">номер</span>
    </div>
`;
const modalWindow = () => {
  window.onload = function () {
    const listPosts = document.querySelectorAll(".post-pair");
    if (listPosts) {
      listPosts.forEach((listPosts) => {
        listPosts.insertAdjacentHTML("afterbegin", html);
        listPosts.addEventListener("mouseover", () => {
          const element = listPosts.querySelector(".modal-window");
          element.style.opacity = "100%";
        });
        listPosts.addEventListener("mouseout", () => {
          const element = listPosts.querySelector(".modal-window");
          element.style.opacity = "0%";
        });
      });
    }
  };
};
export default modalWindow;
