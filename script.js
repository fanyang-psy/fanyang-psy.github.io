const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".primary-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#111713" : "#f4f1ea");
};

setTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  setTheme(nextTheme);
});

const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
  nav.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const handleHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
handleHeader();
window.addEventListener("scroll", handleHeader, { passive: true });

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        if (current) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-35% 0px -58%", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
document.querySelector("[data-year]").textContent = String(new Date().getFullYear());

