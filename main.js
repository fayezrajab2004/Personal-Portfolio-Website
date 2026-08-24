const typewriterTitles = [
    "Backend Developer",
    "Laravel Developer",
    "Software Development Student"
];

const typewriterText = document.querySelector(".typewriter-text");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const topButton = document.getElementById("topButton");

let titleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function runTypewriter() {
    const currentTitle = typewriterTitles[titleIndex];
    characterIndex += isDeleting ? -1 : 1;
    typewriterText.textContent = currentTitle.slice(0, characterIndex);
    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && characterIndex === currentTitle.length) {
        isDeleting = true;
        delay = 1400;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % typewriterTitles.length;
        delay = 250;
    }

    window.setTimeout(runTypewriter, delay);
}

function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function updateScrollControls() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollableHeight > 0 ? Math.min((window.scrollY / scrollableHeight) * 100, 100) : 0;
    scrollProgress.style.width = `${percentage}%`;
    topButton.classList.toggle("visible", window.scrollY > 350);
}

setTheme(localStorage.getItem("theme") === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
});

window.addEventListener("scroll", updateScrollControls, { passive: true });
topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();
updateScrollControls();
runTypewriter();
