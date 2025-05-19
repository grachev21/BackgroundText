const checkbox = document.getElementById("hideMeaning");

const hideMeaning = () => {
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
};

export default hideMeaning;
