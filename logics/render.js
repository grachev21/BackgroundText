import inputPost from "./frontendLogics/InputPost.js";
import loadPost from "./frontendLogics/loadPost.js";
import hideMeanign from "./frontendLogics/hideMeaning.js";

document.addEventListener("DOMContentLoaded", () => {
  inputPost();
  loadPost();
  hideMeanign();
});
