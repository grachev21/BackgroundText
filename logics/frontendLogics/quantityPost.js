const quantityPost = () => {
  fetch("./post.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки файла");
      }
      return response.json();
    })
    .then((data) => {
      lengthValue(data);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    });

  const lengthValue = (item) => {
    let quantity = document.getElementById("quantity");
    quantity.textContent = item.length;
  };
};

export default quantityPost;
