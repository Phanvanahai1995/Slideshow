const slideContainer = document.querySelector(".container");
const slideInner = document.querySelector(".slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const dotContainer = document.querySelector(".dots");
// const interval = 3000;

let slides = document.querySelectorAll(".slide");
let index = 1;

// Dots

// Functions create dot
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const init = function () {
  createDots();
};

init();

// Active dot[0]
const dots = document.querySelectorAll(".dots__dot");
dots[0].classList.add("dots__dot--active");

// Remove all active dot

const removeActiveDot = function () {
  dots.forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
};

// Clone Slide first and last
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

firstSlide.id = "first-clone";
lastSlide.id = "last-clone";

slideInner.append(firstSlide);
slideInner.prepend(lastSlide);

let slideWidth = slides[index].clientWidth;

slideInner.style.transform = `translateX(${-slideWidth * index}px)`;

// Event slide
slideInner.addEventListener("transitionend", () => {
  slides = document.querySelectorAll(".slide");

  if (slides[index].id === firstSlide.id) {
    slideInner.style.transition = "none";
    index = 1;
    slideInner.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastSlide.id) {
    index = slides.length - 2;
    slideInner.style.transition = "none";
    slideInner.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

// function CSS slide

function slideCSS() {
  slideInner.style.transition = "0.7s ease-out";
  slideInner.style.transform = `translateX(${-slideWidth * index}px)`;
}

// function next slide
function handleMoveSlide() {
  slides = document.querySelectorAll(".slide");

  if (index >= slides.length - 1) return;
  index++;
  slideCSS();
  removeActiveDot();

  index < slides.length - 1
    ? dots[index - 1].classList.add("dots__dot--active")
    : dots[0].classList.add("dots__dot--active");
}

// function prev slide
function handlePrevSlide() {
  slides = document.querySelectorAll(".slide");

  if (index <= 0) return;
  index--;
  slideCSS();

  removeActiveDot();

  index > 0
    ? dots[index - 1].classList.add("dots__dot--active")
    : dots[dots.length - 1].classList.add("dots__dot--active");
}

// Event next and prev slide
nextBtn.addEventListener("click", handleMoveSlide);
prevBtn.addEventListener("click", handlePrevSlide);

// Event dots

dotContainer.addEventListener("click", function (e) {
  removeActiveDot();

  if (e.target.classList.contains("dots__dot")) {
    e.target.classList.add("dots__dot--active");
    const { slide } = e.target.dataset;
    index = slide;
    handleMoveSlide();
  }
});

// Event mouse

let flag = false;

slideContainer.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    flag = true;
  }
});

slideContainer.addEventListener("mousemove", function (e) {
  e.preventDefault();
  if (flag) {
    index++;
    slideCSS();
  }
});

slideContainer.addEventListener("mouseup", function (e) {
  flag = false;
});
