document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-ready");

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const revealButton = document.querySelector("#reveal-intelligence");
  const intelligenceDetail = document.querySelector("#intelligence-detail");

  const syncHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  revealButton?.addEventListener("click", () => {
    if (!intelligenceDetail) return;

    const isRevealed = intelligenceDetail.hidden;
    intelligenceDetail.hidden = !isRevealed;
    revealButton.classList.toggle("is-revealed", isRevealed);
    revealButton.setAttribute("aria-expanded", String(isRevealed));
    revealButton.firstChild.textContent = isRevealed
      ? "Conceal intelligence "
      : "Reveal intelligence ";
  });

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.querySelector("[data-back-to-top]")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
