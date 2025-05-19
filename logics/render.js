import inputPost from "./frontendLogics/InputPost.js";
import loadPost from "./frontendLogics/loadPost.js";
import hideMeanign from "./frontendLogics/hideMeaning.js";
import quiantityPost from "./frontendLogics/quantityPost.js";
import modalWindow from "./frontendLogics/modalWindow.js";

document.addEventListener("DOMContentLoaded", () => {
  inputPost();
  loadPost();
  hideMeanign();
  quiantityPost();
  modalWindow();
});
