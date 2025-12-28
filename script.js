const menuToggle = document.querySelector("#menu-toggle");
const menuClose = document.querySelector("#menu-close");
const mobileMenu = document.querySelector("#mobile-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const openMenu = () => {
  mobileMenu.classList.remove("translate-x-full");
  menuToggle.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  mobileMenu.classList.add("translate-x-full");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!mobileMenu.classList.contains("translate-x-full")) {
      closeMenu();
    }
  });
});

const showFormMessage = (message, isError = false) => {
  formStatus.textContent = message;
  formStatus.classList.remove("hidden");
  formStatus.classList.toggle("text-red-400", isError);
  formStatus.classList.toggle("text-accent", !isError);
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const goal = contactForm.goal.value;
  const message = contactForm.message.value.trim();

  if (!name || !email || !goal || !message) {
    showFormMessage("Please fill in all required fields.", true);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormMessage("Please enter a valid email address.", true);
    return;
  }

  showFormMessage(
    "Thanks! Your message is ready to send. Connect a backend to submit the form."
  );
  contactForm.reset();
});
