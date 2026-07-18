/*
  ===== LIEN DE TELECHARGEMENT =====
  Après avoir créé ta Release GitHub, le fichier .exe doit avoir le même nom
  que celui qui se trouve à la fin de l'URL ci-dessous.

  Exemple si ton fichier se nomme mon-launcher.exe :
  const DOWNLOAD_URL = "https://github.com/hypcarlitoo/fortnite-launcher/releases/latest/download/mon-launcher.exe";
*/
const DOWNLOAD_URL = "https://github.com/hypcarlitoo/fortnite-launcher/releases/latest/download/HYPCARLITOO-Fortnite-Launcher-Setup.exe";

const views = [...document.querySelectorAll("[data-view]")];
const routes = [...document.querySelectorAll("[data-route]")];
const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.innerHTML = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3800);
}

function showView() {
  const requested = window.location.hash.slice(1);
  const name = views.some((view) => view.dataset.view === requested) ? requested : "accueil";

  views.forEach((view) => {
    view.classList.toggle("active", view.dataset.view === name);
  });

  routes.forEach((route) => {
    route.setAttribute("aria-current", route.dataset.route === name ? "page" : "false");
  });

  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.title = `${name.charAt(0).toUpperCase() + name.slice(1)} — HYPCARLITOO Launcher`;
}

routes.forEach((route) => {
  route.addEventListener("click", () => {
    // Si le joueur clique déjà sur l'onglet ouvert, on remet la page en haut.
    if (window.location.hash === `#${route.dataset.route}`) showView();
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".download-link").forEach((link) => {
  link.href = DOWNLOAD_URL;
  link.addEventListener("click", () => {
    showToast("<strong>Téléchargement :</strong> ouverture de la dernière version publiée.");
  });
});

window.addEventListener("hashchange", showView);
document.querySelector("#year").textContent = new Date().getFullYear();
showView();
