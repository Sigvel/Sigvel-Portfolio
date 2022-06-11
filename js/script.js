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

// Currently on section

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

// Contact
const form = document.querySelector("#contact-form");
const formSuccess = document.querySelector(".form-success");

const formName = document.querySelector("#your-name");
const nameError = document.querySelector("#nameError");

const formEmail = document.querySelector("#your-email");
const emailError = document.querySelector("#emailError");

const formSubject = document.querySelector("#your-subject");
const subjectError = document.querySelector("#subjectError");

const formMessage = document.querySelector("#your-message");
const messageError = document.querySelector("textarea");

function inputValidation(event) {
  const targetId = event.target.id;
  const targetValue = event.target.value;

  switch (targetId) {
    case "your-name": {
      formName.style.background = checkInputLength(targetValue, 5) ? "lightgreen" : "lightcoral";
      break;
    }
    case "your-email": {
      formEmail.style.background = checkEmailValidation(targetValue) ? "lightgreen" : "lightcoral";
      break;
    }
    case "your-subject": {
      formSubject.style.background = checkInputLength(targetValue, 15) ? "lightgreen" : "lightcoral";
      break;
    }
    case "your-message": {
      messageError.style.background = checkInputLength(targetValue, 25) ? "lightgreen" : "lightcoral";
      break;
    }
  }
}

form.addEventListener("input", inputValidation);
form.addEventListener("submit", formValidation);

function checkInputLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkEmailValidation(email) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatches = pattern.test(email);
  return patternMatches;
}

function formValidation(evnt) {
  evnt.preventDefault();

  const contactForm = evnt.target;
  const formContactUrl = "https://landson.site/thefunction/wp-json/contact-form-7/v1/contact-forms/232/feedback";

  if (checkInputLength(formName.value, 5) && checkEmailValidation(formEmail.value) && checkInputLength(formSubject.value, 15) && checkInputLength(formMessage.value, 25)) {
    formSuccess.innerHTML = `<p class="successMessage">Your message was submitted successfully!</p>`;

    let objectData = new FormData(contactForm);

    fetch(formContactUrl, {
      method: "POST",
      body: objectData,
    })
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  }
}
