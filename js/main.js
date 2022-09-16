// S T A R T  -  L A N D I N G  -  P A G E

// NAVBAR VARS
const header = document.querySelector(".header");
const navbarMain = document.querySelector(".nav--1");
const navbarSecondary = document.querySelector(".nav--2");
const navLinks = document.querySelectorAll(".nav--2 .nav-link");

// MODAL VARS
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// ALL SECTIONS
const allSections = document.querySelectorAll(".section");

// FEATURES SECTION VARS
const sectionFeatures = document.getElementById("section--1");
const allImgs = document.querySelectorAll(".features-img");

// OPERATIONS SECTION VARS
const operationsSec = document.querySelector(".operations");

// TESTIMONIALS VARS
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots");

// BUTTONS VARS
const btnModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".close-modal");
const btnLearnMore = document.querySelector(".learn-more");
const btnNextSlide = document.querySelector(".slider_btn--right");
const btnPrevSlide = document.querySelector(".slider_btn--left");

// START NAVBAR HOVER OVER LISTS

navbarSecondary.addEventListener("mouseover", function (e) {
  const link = e.target;
  if (link.classList.contains("nav-link")) {
    navLinks.forEach((li) => {
      li.style.opacity = 0.5;
    });
    link.style.opacity = 1;
  }
});

navbarSecondary.addEventListener("mouseleave", function () {
  navLinks.forEach((li) => {
    li.style.opacity = 1;
  });
});

// END NAVBAR HOVER OVER LISTS

// START MODAL CLICKS

const openModal = function () {
  modal.classList.remove("opacity-0");
  modal.style.visibility = "visible";
  overlay.classList.remove("d-none");
};

const closeModal = function () {
  modal.classList.add("opacity-0");
  modal.style.visibility = "hidden";
  overlay.classList.add("d-none");
};

btnModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// END MODAL CLICKS

// S T A R T    S C R O L L    B E H A V I O R S

// START LEARN MORE BTN SCROLLING

btnLearnMore.addEventListener("click", function (e) {
  const s1Coords = sectionFeatures.getBoundingClientRect();
  window.scrollTo({
    left: s1Coords.left,
    top: s1Coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});
// END LEARN MORE BTN SCROLLING

// START NAV CLICKS TO SCROLL TO THEIR SECTIONS

navbarSecondary.addEventListener("click", function (e) {
  e.preventDefault();
  const link = e.target;
  if (link.classList.contains("btn--show-modal")) return;
  if (link.classList.contains("nav-link")) {
    const id = link.getAttribute("href");
    const section = document.querySelector(id);
    const secCoords = section.getBoundingClientRect();
    window.scrollTo({
      left: secCoords.left,
      top: secCoords.top + window.pageYOffset,
      behavior: "smooth",
    });
  }
});

// END NAV CLICKS TO SCROLL TO THEIR SECTIONS

// E N D    S C R O L L    B E H A V I O R S

// START OPERATIONS TABS

operationsSec.addEventListener("click", function (e) {
  const tab = e.target.closest(".btn_operation-tab");
  if (!tab) return;
  // console.log(tabs);
  const dataTab = tab.dataset.tab;
  const opContent = document.querySelectorAll(".operations-content");
  const opTab = document.querySelectorAll(".btn_operation-tab");

  opContent.forEach((op) => op.classList.add("d-none"));
  opTab.forEach((op) => op.classList.remove("operations__tab--active"));
  document
    .querySelector(`.operations_content--${dataTab}`)
    .classList.remove("d-none");
  tab.classList.add("operations__tab--active");
});

// END OPERATIONS TABS

// START TESTIMONIALS SLIDES

let currSlide = 0;

const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots-dot border-0 fs-5" data-slide="${i}"><i class="fa-solid fa-circle" ></i></button>`
    );
  });
};

createDots();

const activateDots = function (slide) {
  document.querySelectorAll(".dots-dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots-dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  activateDots(slide);
};

goToSlide(0);

const nextSlide = function () {
  currSlide++;
  if (currSlide === slides.length) {
    currSlide = 0;
  }
  goToSlide(currSlide);
};

const prevSlide = function () {
  currSlide--;
  if (currSlide < 0) {
    currSlide = slides.length - 1;
  }
  goToSlide(currSlide);
};

btnNextSlide.addEventListener("click", nextSlide);
btnPrevSlide.addEventListener("click", prevSlide);

document.addEventListener("keyup", function (e) {
  e.key === "ArrowRight"
    ? nextSlide()
    : e.key === "ArrowLeft"
    ? prevSlide()
    : "";
});
dotsContainer.addEventListener("click", function (e) {
  const dotClick = e.target.closest(".dots-dot");
  if (dotClick.classList.contains("dots-dot")) {
    const { slide } = dotClick.dataset;
    console.log(slide);
    goToSlide(slide);
  }
});

// END TESTIMONIALS SLIDES

// START FIXED NAV ONSCROLL

const nav2Height = navbarSecondary.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === true) {
    navbarMain.classList.remove("sticky_nav--1");
    navbarSecondary.classList.remove("sticky_nav--2");
  } else {
    navbarMain.classList.add("sticky_nav--1");
    navbarSecondary.classList.add("sticky_nav--2");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: `500px`,
});

headerObserver.observe(header);

// END FIXED NAV ONSCROLL

// START REVEALING SECTIONS
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
// END REVEALING SECTIONS

// START LAZY IMGS
const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
    observer.unobserve(entry.target);
  });
};
const imgsObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

allImgs.forEach((img) => {
  imgsObserver.observe(img);
});

// END LAZY IMGS

// START COOKIES
const cookies = document.querySelector(".cookies");
const btnCookies = document.querySelector(".btn-cookies");

const useCookies = function () {
  cookies.classList.remove("opacity-0");
  btnCookies.addEventListener("click", function () {
    cookies.classList.add("opacity-0");
  });
};
setTimeout(useCookies, 4000);

// END COOKIES

// E N D  -  L A N D I N G  -  P A G E

// S T A R T   A C C O U N T   F U N C T I O N A L I T Y

const account1 = {
  owner: "Ehab Elsayed Mohamed Hussein",
  pin: 1111,
  movements: [400, 700, 1200, -250, 820, -100, 5000, -150, 4270],
  interestRate: 1.2, // %
};

const account2 = {
  owner: "Ahmed Mohamed Roshdy",
  pin: 2222,
  movements: [200, 450, 6100, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.5, // %
};
const account3 = {
  owner: "Gamal Ismail Mohamed Elserafy",
  pin: 3333,
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7, // %
};
const account4 = {
  owner: "Younis Magdy Galal",
  pin: 4444,
  movements: [430, 1000, 700, 50, 90, 910],
  interestRate: 1, // %
};

// array of objects
const accounts = [account1, account2, account3, account4];

// general
const landingPage = document.querySelector(".landing-page");
const userAccPage = document.querySelector(".user-account");
const movement = document.querySelector(".movements");
const balanceVal = document.querySelector(".balance__value");
const welcomeMsg = document.querySelector(".welcome-msg");
const formHint = document.querySelector(".form-hint");

const loginValidationMsg = document.querySelector(".login_incorrect--msg");

// inputs
const usernameInput = document.querySelector(".user-input");
const pinInput = document.querySelector(".password-input");
const inputTransferTo = document.querySelector(".transfer--to");
const inputTransferAmount = document.querySelector(".transfer--amount");
const inputLoan = document.querySelector(".loan--amount");
const inputConfirmUser = document.querySelector("#confirm-user");
const inputConfirmPin = document.querySelector("#confirm-pin");

// btns
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnLogin = document.querySelector(".login__btn");
const btnCloseAcc = document.querySelector(".form__btn--closeAccount");
const btnMinimizeFormHint = document.querySelector(".minimize_form--hint");
const btnCloseFormHint = document.querySelector(".close_form--hint");
const btnLogout = document.querySelector(".logout");

setTimeout(() => {
  formHint.classList.remove("opacity-0");
}, 5000);

btnMinimizeFormHint.addEventListener("click", function () {
  formHint.classList.toggle("opacity-25");
});
btnCloseFormHint.addEventListener("click", function () {
  formHint.classList.add("opacity-0");
});

const getUsername = function () {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .slice(0, 2)
      .map((name) => name[0])
      .join("");
  });
};
getUsername();

const updateUI = function (acc) {
  // DISPLAY MOVEMENTS
  displayMovements(acc);

  // DISPLAY SUMMARY
  calcBalance(acc);

  // Welcome Message

  // DISPLAY BALANCE
  calcDisplaySummary(acc);
};

// user who logsIn
let currentAccount;

const login = function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === usernameInput.value);
  if (currentAccount?.pin === Number(pinInput.value)) {
    landingPage.classList.add("d-none");
    navbarSecondary.classList.add("d-none");
    document
      .querySelector(".user_account--outer")
      .classList.remove("overflow-hidden");
    userAccPage.style.transform = "translateX(0)";
    welcomeText(currentAccount);
    usernameInput.value = pinInput.value = "";
    updateUI(currentAccount);
    loginValidationMsg.parentElement.classList.add("d-none");
  } else {
    loginValidationMsg.parentElement.classList.remove("d-none");
    loginValidationMsg.textContent = "username or pin is incorrect! ⛔";
  }
};
btnLogin.addEventListener("click", login);

// displaying movs
const displayMovements = function (acc) {
  movement.innerHTML = "";
  acc?.movements.forEach((mov, i) => {
    const D_W = mov < 0 ? "withdrawal" : "deposit";

    movement.insertAdjacentHTML(
      "afterbegin",
      `<div
    class="row movements-details border-bottom border-1 p-5 align-items-center"
  >
    <div class=" ${
      D_W === "withdrawal" ? "col-md-3 p-0" : "col-md-2"
    } mob-style">
      <div
        class="movements-type ${
          D_W === "withdrawal" ? "w-100" : ""
        } d-flex justify-content-center align-items-center rounded-pill movements_type--${D_W}"
      >
        <h6>${i + 1} ${D_W}</h6>
      </div>
    </div>
    <div class="col-md-6 offset-md-1 movements-date mob-style">
      12/03/2022
    </div>
    <div class= " ${
      D_W === "withdrawal" ? "col-md-2" : "col-md-3"
    } movements-value mob-style">$${mov}</div>
  </div>
`
    );
  });
};

const calcBalance = function (acc) {
  acc.curBalance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  balanceVal.textContent = `$${acc.curBalance}`;
};

const welcomeText = function (acc) {
  const name = acc.owner.split(" ").slice(0, 1).join(" ");
  welcomeMsg.textContent = `Good Evening, ${name}`;
  welcomeMsg.style.fontSize = "1.7rem";
};

const transferMoney = function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    inputTransferTo.value &&
    inputTransferTo.value !== currentAccount.username &&
    receiverAcc &&
    currentAccount.curBalance >= amount
  ) {
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = "";
  }
};
btnTransfer.addEventListener("click", transferMoney);

const loanTransfer = function (e) {
  e.preventDefault();
  const amount = Number(inputLoan.value);
  const loanCond = currentAccount.movements.some((mov) => mov >= amount * 0.1);
  if (loanCond) {
    currentAccount.movements.push(amount);
    displayMovements(currentAccount);
    calcBalance(currentAccount);
    balanceVal.textContent = `$${currentAccount.curBalance}`;
    inputLoan.value = "";
  }
};
btnLoan.addEventListener("click", loanTransfer);

const backToLandingPage = function () {
  landingPage.classList.remove("d-none");
  navbarSecondary.classList.remove("d-none");
  document
    .querySelector(".user_account--outer")
    .classList.add("overflow-hidden");
  userAccPage.style.transform = "translateX(100%)";
  usernameInput.value = pinInput.value = "";
  loginValidationMsg.parentElement.classList.add("d-none");
};

const closeAccount = function (e) {
  e.preventDefault();
  const confirmPin = Number(inputConfirmPin.value);
  if (
    inputConfirmUser.value === currentAccount.username &&
    confirmPin === currentAccount.pin
  ) {
    const accIndex = accounts.findIndex(
      (acc) => acc.username === inputConfirmUser.value && acc.pin === confirmPin
    );
    accounts.splice(accIndex, 1);
    backToLandingPage();
  }
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  document.querySelector(".summary__value--in").textContent = `$${income}`;

  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  document.querySelector(".summary__value--out").textContent = `$${Math.abs(
    outcome
  )}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  document.querySelector(
    ".summary__value--interest"
  ).textContent = `$${interest}`;
};
btnCloseAcc.addEventListener("click", closeAccount);
btnLogout.addEventListener("click", backToLandingPage);

// E N D   A C C O U N T   F U N C T I O N A L I T Y
