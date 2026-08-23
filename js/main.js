import { images } from "./images.js";
import { portfolio } from "./data.js";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  setupLoader();
  setupNavigation();
  setupScrollProgress();
  setupReveal();
  setupRoleTyping();
  setupImageFallbacks();
  renderCertificates();
  setupProjectModal();
  setupSmoothLinks();
  $("#year").textContent = new Date().getFullYear();
});

// ============================================================
// LOADER
// ============================================================

function setupLoader() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1800);
}

// ============================================================
// NAVIGATION
// ============================================================

function setupNavigation() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");

  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$("#navMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ============================================================
// SCROLL PROGRESS
// ============================================================

function setupScrollProgress() {
  const bar = $("#scrollProgress");

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${percentage}%`;
  }, { passive: true });
}

// ============================================================
// REVEAL ANIMATION
// ============================================================

function setupReveal() {
  const items = $$(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((el) => observer.observe(el));
}

// ============================================================
// HERO ROLE TYPING
// ============================================================

function setupRoleTyping() {
  const el = $("#roleText");
  if (!el) return;

  const roles = portfolio.roles;
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const role = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = role.slice(0, charIndex);

      if (charIndex === role.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      el.textContent = role.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(tick, deleting ? 45 : 85);
  };

  tick();
}

// ============================================================
// IMAGE FALLBACK
// ============================================================

function setupImageFallbacks() {
  $$("img[data-image]").forEach((img) => {
    img.loading = "lazy";

    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied === "true") return;

      img.dataset.fallbackApplied = "true";

      const fallback = img.dataset.fallback || "./assets/images/profile/profile-placeholder.svg";
      img.src = fallback;
      img.classList.add("image-fallback");
    });
  });
}

// ============================================================
// CERTIFICATES
// ============================================================

function renderCertificates() {
  const grid = $("#certificateGrid");
  if (!grid) return;

  grid.innerHTML = portfolio.certificates.map((certificate, index) => {
    const src = images.certificates[index] || "./assets/images/certificates/certificate-placeholder.svg";

    return `
      <button class="certificate-card reveal"
              type="button"
              data-certificate="${escapeAttribute(src)}"
              data-title="${escapeAttribute(certificate.title)}">
        <div class="certificate-thumb image-frame certificate-image">
          <img
            data-image
            src="${escapeAttribute(src)}"
            alt="${escapeAttribute(certificate.title)}"
            data-fallback="./assets/images/certificates/certificate-placeholder.svg"
          >
          <span class="certificate-view">View ↗</span>
        </div>
        <div class="certificate-meta">
          <div>
            <span>${escapeHTML(certificate.category)}</span>
            <h3>${escapeHTML(certificate.title)}</h3>
          </div>
          <b>${escapeHTML(certificate.year)}</b>
        </div>
      </button>
    `;
  }).join("");

  setupImageFallbacks();

  $$(".certificate-card").forEach((card) => {
    card.addEventListener("click", () => {
      openModal([card.dataset.certificate], 0, card.dataset.title);
    });
  });

  // Reveal items generated after initial DOM load
  requestAnimationFrame(() => {
    $$(".certificate-card").forEach((el) => el.classList.add("is-visible"));
  });
}

// ============================================================
// PROJECT MODAL / GALLERY
// ============================================================

let modalState = {
  images: [],
  index: 0,
  title: "",
};

function setupProjectModal() {
  const modal = $("#imageModal");
  if (!modal) return;

  $$("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.project);
      const project = images.projects[index];

      if (!project) return;

      openModal(project.images, 0, project.title);
    });
  });

  $("#modalPrev")?.addEventListener("click", () => moveModal(-1));
  $("#modalNext")?.addEventListener("click", () => moveModal(1));

  $$("[data-modal-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    const open = modal.classList.contains("is-open");
    if (!open) return;

    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") moveModal(-1);
    if (event.key === "ArrowRight") moveModal(1);
  });
}

function openModal(gallery, index, title) {
  const modal = $("#imageModal");
  const image = $("#modalImage");

  modalState = {
    images: gallery.filter(Boolean),
    index,
    title,
  };

  $("#modalTitle").textContent = title;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  updateModalImage();
}

function updateModalImage() {
  const image = $("#modalImage");
  const current = modalState.images[modalState.index];

  image.src = current || "./assets/images/projects/project-placeholder.svg";
  image.alt = modalState.title;
  $("#modalCounter").textContent =
    `${modalState.index + 1} / ${modalState.images.length}`;

  const multiple = modalState.images.length > 1;
  $("#modalPrev").disabled = !multiple;
  $("#modalNext").disabled = !multiple;
}

function moveModal(direction) {
  const total = modalState.images.length;
  if (total <= 1) return;

  modalState.index = (modalState.index + direction + total) % total;
  updateModalImage();
}

function closeModal() {
  const modal = $("#imageModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  $("#modalImage").src = "";
}

// ============================================================
// SMOOTH LINKS
// ============================================================

function setupSmoothLinks() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = $(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

// ============================================================
// UTILITIES
// ============================================================

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}
