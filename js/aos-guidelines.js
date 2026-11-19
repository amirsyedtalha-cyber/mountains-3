document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 900,
      once: true,
      offset: 100,
      easing: "ease-in-out"
    });
  }
});
