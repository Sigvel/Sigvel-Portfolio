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

// Nav on scrolling show
const header = document.querySelector("header");
const nav = document.querySelector("nav");

const headerOptions = {
  rootMargin: "-50px 0px 0px 0px",
};

const headerObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}, headerOptions);

headerObserver.observe(header);

// Current on section

const sections = document.querySelectorAll("section");
const navListItem = document.querySelectorAll("nav li");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navListItem.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
});

// Contact Page
