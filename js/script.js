const arrowNext = document.querySelector("#next");
const arrowPrevious = document.querySelector("#previous");
const itemsContainer = document.getElementById("main-slider");
const sliderItem = document.getElementsByClassName("slider-item");

arrowNext.addEventListener("click", () => {
  itemsContainer.append(sliderItem[0]);
});

arrowPrevious.addEventListener("click", () => {
  itemsContainer.prepend(sliderItem[sliderItem.length - 1]);
});
