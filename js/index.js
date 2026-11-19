document.querySelectorAll(".video-facade").forEach((facade) => {
  facade.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    const videoId = facade.dataset.videoId;
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    iframe.title = facade.dataset.videoTitle;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
  });
});

const searchInput = document.getElementById("mountainSearch");

if (searchInput) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const mountainCards = document.querySelectorAll(".booking-card");
  const noMountains = document.getElementById("noMountains");
  let currentFilter = "all";

  function filterMountains() {
    const searchValue = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    mountainCards.forEach((card) => {
      const matchesSearch = ["name", "country", "difficulty"].some((key) =>
        card.dataset[key].toLowerCase().includes(searchValue)
      );
      const matchesFilter = currentFilter === "all" || card.dataset.country === currentFilter;
      card.style.display = matchesSearch && matchesFilter ? "" : "none";
      if (matchesSearch && matchesFilter) visibleCount++;
    });

    noMountains.style.display = visibleCount === 0 ? "block" : "none";
  }

  searchInput.addEventListener("input", filterMountains);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      filterMountains();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100
    });
  }

  const counters = document.querySelectorAll(".counter");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseInt(counter.textContent, 10);
      if (reduceMotion) {
        counter.textContent = target.toString();
        observer.unobserve(counter);
        return;
      }

      let startTime;
      function updateCounter(timestamp) {
        if (startTime === undefined) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 1000, 1);
        counter.textContent = Math.floor(target * progress).toString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
          observer.unobserve(counter);
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }, { threshold: 0.3 });

  counters.forEach((counter) => counterObserver.observe(counter));

  const intro = document.querySelector(".intro-screen");
  if (intro) {
    if (sessionStorage.getItem("alpineIntroPlayed") === "true") {
      intro.style.display = "none";
    } else {
      intro.addEventListener("animationend", (event) => {
        if (event.animationName === "introFade") {
          sessionStorage.setItem("alpineIntroPlayed", "true");
          intro.style.display = "none";
        }
      });
    }
  }

  if (typeof window.GLightbox === "function") {
    window.GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }
});
